"""Extract Traficom PPL multiple-choice questions from PDFs into per-module JSON.

USAGE:
    pip install pdfplumber
    python tools/extract_pdfs.py --pdf-dir ".." --out-dir "data"

Output schema (per module file data/0X0.json):
{
  "module": "010",
  "moduleName": "Ilmailun säädökset",
  "source": "PPL010FIN 11102018.pdf",
  "questions": [
    {
      "id": "010-0001",
      "module": "010",
      "moduleName": "Ilmailun säädökset",
      "number": 1,
      "statement": "Mitä seuraavista dokumenteista...",
      "options": ["A. Rekisteröimistodistus", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,           # AI-arvio (0..3)
      "explanation": "(AI-arvio – tarkista ihmisellä)",
      "source": "PPL010FIN 11102018.pdf",
      "page": 2,
      "confidence": "low",
      "needsReview": true
    }, ...
  ]
}

The PDFs do NOT contain an answer key, so all correctIndex values are placeholder
(0) and EVERY question is marked needsReview: true with confidence: "low".

The script preserves any existing question whose `needsReview` is false (i.e.
manually verified) so that human edits are not lost when re-running extraction.
Manually verified questions are matched by `id` first and by question `number`
within the same module as a fallback.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple

MODULES: Dict[str, str] = {
    "010": "Ilmailun säädökset",
    "020": "Lentokoneen yleistuntemus",
    "030": "Suoritusarvot ja lennonsuunnittelu",
    "040": "Ihmisen suorituskyky",
    "050": "Sääoppi",
    "060": "Lentosuunnistus",
    "070": "Lentotoiminta",
    "080": "Lennonteoria",
    "090": "Radiopuhelinliikenne",
}

# Detect "1 ", "23 ", "157 " at the start of a line as question numbering.
QUESTION_NUM_RE = re.compile(r"^\s*(\d{1,3})\s+(\S.*)$")
# [A] / [B] / [C] / [D] markers at start of a line.
OPTION_RE = re.compile(r"^\s*\[([A-Da-d])\]\s*(.*)$")
# Lines that are pure noise / page markers.
APPENDIX_RE = re.compile(r"^\s*Appendix\b", re.IGNORECASE)
APPENDIX_FOOTER_RE = re.compile(r"LAPL/PPL\s+\d{3}-\d{2}", re.IGNORECASE)
HEADER_NOISE = re.compile(
    r"^(LAPL/PPL question bank|FCL\.\d|Rev\.|\d{2}\.\d{2}\.\d{4}|"
    r"AIR LAW|AIRCRAFT GENERAL|FLIGHT PERFORMANCE|HUMAN PERFORMANCE|"
    r"METEOROLOGY|NAVIGATION|OPERATIONAL PROCEDURES|PRINCIPLES OF FLIGHT|"
    r"COMMUNICATIONS|ILMAILULAKI|SUORITUSARVOT|IHMISEN SUORITUSKYKY|"
    r"SÄÄOPPI|SUUNNISTUS|LENTOTOIMINTA|LENNONTEORIA|VIESTINTÄ|"
    r"LENTOKONEEN YLEISTUNTEMUS)\b",
    re.IGNORECASE,
)


def find_module_pdfs(pdf_dir: Path) -> Dict[str, Path]:
    found: Dict[str, Path] = {}
    if not pdf_dir.exists():
        return found
    for p in pdf_dir.iterdir():
        if not p.is_file() or p.suffix.lower() != ".pdf":
            continue
        name = p.name
        m = re.search(r"PPL\s*0?(\d{2,3})\s*FIN", name, re.IGNORECASE)
        if not m:
            m = re.search(r"\b(\d{3})\b", name)
        if not m:
            continue
        num = m.group(1)
        if len(num) == 2:
            num = "0" + num
        if num in MODULES and num not in found:
            found[num] = p
    return found


def read_pdf_pages(path: Path) -> List[Tuple[int, str]]:
    import pdfplumber  # type: ignore
    pages: List[Tuple[int, str]] = []
    with pdfplumber.open(str(path)) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            try:
                text = page.extract_text() or ""
            except Exception:
                text = ""
            pages.append((i, text))
    return pages


def is_appendix_page(text: str) -> bool:
    """True if a page looks like an appendix / table page (no questions)."""
    if not text:
        return True
    head = "\n".join(text.splitlines()[:6])
    if APPENDIX_RE.search(head) or APPENDIX_FOOTER_RE.search(head):
        return True
    # If page has no [A] markers AND no obvious 'N <text>?' pattern, treat as appendix.
    if "[A]" not in text and "[B]" not in text:
        return True
    return False


class Question:
    def __init__(self, number: int, page: int):
        self.number: int = number
        self.page: int = page
        self.statement_lines: List[str] = []
        self.options: List[List[str]] = [[], [], [], []]  # 4 lists of lines
        self.current_option: int = -1  # -1 = collecting statement, 0..3 = option idx

    def add_statement_line(self, line: str) -> None:
        self.statement_lines.append(line.strip())

    def add_option_line(self, idx: int, line: str) -> None:
        self.current_option = idx
        self.options[idx].append(line.strip())

    def append_continuation(self, line: str) -> None:
        if self.current_option == -1:
            self.statement_lines.append(line.strip())
        else:
            self.options[self.current_option].append(line.strip())

    def is_complete(self) -> bool:
        return all(self.options[i] for i in range(4)) and bool(self.statement_lines)

    def to_dict(self, module_id: str, source: str) -> dict:
        def clean(text: str) -> str:
            text = re.sub(r"\s+", " ", text).strip()
            # Repair PDF hyphen-line-break artefacts: "ilma- aluksessa" -> "ilma-aluksessa"
            text = re.sub(r"(\w)-\s+(\w)", r"\1-\2", text)
            return text

        statement = clean(" ".join(s for s in self.statement_lines if s))
        opts: List[str] = []
        labels = ["A", "B", "C", "D"]
        for i in range(4):
            txt = clean(" ".join(s for s in self.options[i] if s))
            opts.append(f"{labels[i]}. {txt}")
        return {
            "id": f"{module_id}-{self.number:04d}",
            "module": module_id,
            "moduleName": MODULES[module_id],
            "number": self.number,
            "statement": statement,
            "options": opts,
            "correctIndex": 0,  # placeholder – needs human review
            "explanation": "(AI-arvio – tarkista oikea vastaus ja täytä selitys.)",
            "source": source,
            "page": self.page,
            "confidence": "low",
            "needsReview": True,
        }


def parse_pdf(pages: List[Tuple[int, str]]) -> List[Question]:
    questions: List[Question] = []
    current: Optional[Question] = None
    last_num = 0

    def commit(q: Optional[Question]) -> None:
        if q is None:
            return
        if not q.is_complete():
            return
        questions.append(q)

    for page_no, text in pages:
        if is_appendix_page(text):
            # End any in-progress question (its options must have been on this page).
            commit(current)
            current = None
            continue
        for raw in text.splitlines():
            line = raw.rstrip()
            if not line.strip():
                continue
            if HEADER_NOISE.match(line):
                continue
            if APPENDIX_RE.match(line) or APPENDIX_FOOTER_RE.search(line):
                continue
            mopt = OPTION_RE.match(line)
            if mopt:
                letter = mopt.group(1).upper()
                idx = ord(letter) - ord("A")
                if current is not None and 0 <= idx < 4:
                    current.add_option_line(idx, mopt.group(2))
                continue
            mq = QUESTION_NUM_RE.match(line)
            if mq:
                number = int(mq.group(1))
                rest = mq.group(2)
                # Plausibility: question numbers strictly increasing by 1
                # (allow small jumps because of skipped appendix etc.).
                if number > last_num and number - last_num <= 200:
                    commit(current)
                    current = Question(number=number, page=page_no)
                    current.add_statement_line(rest)
                    last_num = number
                    continue
                # else: not a real question number, treat as continuation
            if current is not None:
                current.append_continuation(line)
        # do not commit between pages; questions can wrap pages

    commit(current)
    return questions


def load_existing_index(out_path: Path) -> Tuple[Dict[str, dict], Dict[int, dict]]:
    by_id: Dict[str, dict] = {}
    by_num: Dict[int, dict] = {}
    if not out_path.exists():
        return by_id, by_num
    try:
        data = json.loads(out_path.read_text(encoding="utf-8"))
    except Exception:
        return by_id, by_num
    for q in data.get("questions", []) or []:
        qid = q.get("id")
        if qid:
            by_id[qid] = q
        if isinstance(q.get("number"), int):
            by_num[q["number"]] = q
    return by_id, by_num


def merge_with_existing(new_q: dict, existing_by_id: Dict[str, dict], existing_by_num: Dict[int, dict]) -> dict:
    """If a verified version exists (needsReview=False), prefer that. Otherwise refresh stem/options."""
    prev = existing_by_id.get(new_q["id"]) or existing_by_num.get(new_q.get("number"))
    if not prev:
        return new_q
    if prev.get("needsReview") is False:
        # Keep the verified version completely.
        return prev
    # Otherwise refresh statement/options/page from PDF, but keep any human edits to correctIndex/explanation if present.
    merged = dict(new_q)
    if "correctIndex" in prev and isinstance(prev.get("correctIndex"), int):
        merged["correctIndex"] = prev["correctIndex"]
    if prev.get("explanation") and prev["explanation"] != "(AI-arvio – tarkista oikea vastaus ja täytä selitys.)":
        merged["explanation"] = prev["explanation"]
    if prev.get("confidence"):
        merged["confidence"] = prev["confidence"]
    return merged


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract PPL multi-choice questions from PDFs.")
    parser.add_argument("--pdf-dir", default="..", help="Folder containing the source PDF files.")
    parser.add_argument("--out-dir", default="data", help="Output folder for per-module JSON.")
    parser.add_argument("--modules", default="", help="Comma-separated module ids to process (default: all).")
    args = parser.parse_args()

    here = Path(__file__).resolve().parent.parent
    pdf_dir = (here / args.pdf_dir).resolve() if not Path(args.pdf_dir).is_absolute() else Path(args.pdf_dir)
    out_dir = (here / args.out_dir).resolve() if not Path(args.out_dir).is_absolute() else Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    only = set(s.strip() for s in args.modules.split(",") if s.strip())
    found = find_module_pdfs(pdf_dir)
    if not found:
        print(f"No PDFs matching PPL<NNN>FIN*.pdf found in {pdf_dir}", file=sys.stderr)
        return 1

    print(f"PDF folder: {pdf_dir}")
    print(f"Output:     {out_dir}")
    print(f"Modules:    {sorted(found.keys())}\n")

    summary: List[Tuple[str, int]] = []
    for module_id, pdf_path in sorted(found.items()):
        if only and module_id not in only:
            continue
        print(f"[{module_id}] {pdf_path.name}")
        try:
            pages = read_pdf_pages(pdf_path)
        except ImportError:
            print("ERROR: pdfplumber not installed. Run: pip install pdfplumber", file=sys.stderr)
            return 2
        questions = parse_pdf(pages)
        print(f"  parsed {len(questions)} questions")

        out_path = out_dir / f"{module_id}.json"
        existing_by_id, existing_by_num = load_existing_index(out_path)
        merged: List[dict] = []
        for q in questions:
            d = q.to_dict(module_id, pdf_path.name)
            merged.append(merge_with_existing(d, existing_by_id, existing_by_num))

        result = {
            "module": module_id,
            "moduleName": MODULES[module_id],
            "source": pdf_path.name,
            "questions": merged,
        }
        out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"  wrote {out_path.relative_to(here)} ({len(merged)} questions)")
        summary.append((module_id, len(merged)))

    print("\nSummary:")
    total = 0
    for mid, n in summary:
        total += n
        print(f"  {mid} {MODULES[mid]:40s} {n:4d}")
    print(f"  TOTAL                                          {total:4d}")
    print("\nHUOM: Kaikki uudet kysymykset on merkitty needsReview: true ja correctIndex: 0 (placeholder).")
    print("Tarkista oikea vastaus ja kirjoita selitys käsin data/0X0.json -tiedostoissa.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
