"""Read review/answers.md and apply edits back into data/*.json.

Käyttö:
    py tools/import_review.py

Logiikka:
- Lukee review/answers.md ja etsii jokaisen "### <id>" -lohkon.
- Lukee jokaisesta lohkosta:
    "**Oikea:** X"   (X = A, B, C tai D)
    "**Selitys:** ..." (vapaa teksti, voi olla useammalla rivillä, päättyy "---" tai seuraavaan otsikkoon)
- Päivittää vastaavan kysymyksen data/<moduuli>.json -tiedostoon:
    correctIndex = 0..3
    explanation  = annettu selitys (jos ei placeholder)
    needsReview  = false  (jos sekä kirjain että ei-placeholder-selitys annettu)
    confidence   = "high" (samoin)
- Ei koske kysymyksiin, joita ei mainita tiedostossa eikä niihin, joiden
  Oikea/Selitys on jätetty tyhjäksi tai placeholderiksi.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Dict, Optional, Tuple

LETTERS = ["A", "B", "C", "D"]
PLACEHOLDER_PREFIXES = ("(AI-arvio", "(täytä", "(taytä", "(taeyta", "(fill", "(TODO")
QID_RE = re.compile(r"^(\d{3})-(\d{4})\b")
OIKEA_RE = re.compile(r"^\*\*Oikea:\*\*[ \t]*([A-Da-d])?[ \t]*$", re.MULTILINE)
SELITYS_RE = re.compile(
    r"\*\*Selitys:\*\*[ \t]*(.*?)(?=\n\s*---\s*\n|\n\s*###\s|\Z)",
    re.DOTALL,
)


def is_placeholder(expl: str) -> bool:
    e = (expl or "").strip()
    if not e:
        return True
    return e.startswith(PLACEHOLDER_PREFIXES)


def parse_review(text: str) -> Dict[str, Tuple[Optional[str], str]]:
    """Parse markdown review file. Returns id -> (letter or None, explanation)."""
    out: Dict[str, Tuple[Optional[str], str]] = {}
    blocks = re.split(r"(?m)^### ", text)
    for blk in blocks[1:]:
        m = QID_RE.match(blk.lstrip())
        if not m:
            continue
        qid = f"{m.group(1)}-{m.group(2)}"
        m_o = OIKEA_RE.search(blk)
        letter: Optional[str] = m_o.group(1).upper() if (m_o and m_o.group(1)) else None
        m_s = SELITYS_RE.search(blk)
        expl = m_s.group(1).strip() if m_s else ""
        out[qid] = (letter, expl)
    return out


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    review_path = root / "review" / "answers.md"
    if not review_path.exists():
        print(f"ERROR: {review_path} not found. Run: py tools/export_review.py first.", file=sys.stderr)
        return 1

    text = review_path.read_text(encoding="utf-8")
    parsed = parse_review(text)
    print(f"Parsed {len(parsed)} question entries from {review_path.name}.")

    data_dir = root / "data"
    files_changed = 0
    answers_changed = 0
    explanations_changed = 0
    newly_reviewed = 0
    skipped_invalid_letter = 0

    for jf in sorted(data_dir.glob("*.json")):
        obj = json.loads(jf.read_text(encoding="utf-8"))
        changed = False
        for q in obj.get("questions", []):
            entry = parsed.get(q.get("id"))
            if not entry:
                continue
            letter, expl = entry
            new_idx: Optional[int] = None
            if letter is not None:
                if letter not in LETTERS:
                    skipped_invalid_letter += 1
                else:
                    new_idx = LETTERS.index(letter)

            if new_idx is not None and q.get("correctIndex") != new_idx:
                q["correctIndex"] = new_idx
                changed = True
                answers_changed += 1

            real_expl = expl and not is_placeholder(expl)
            if real_expl and q.get("explanation") != expl:
                q["explanation"] = expl
                changed = True
                explanations_changed += 1

            if new_idx is not None and real_expl:
                if q.get("needsReview") is not False or q.get("confidence") != "high":
                    q["needsReview"] = False
                    q["confidence"] = "high"
                    changed = True
                    newly_reviewed += 1

        if changed:
            jf.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")
            files_changed += 1
            print(f"  updated {jf.name}")

    print()
    print(f"Files updated:           {files_changed}")
    print(f"correctIndex changes:    {answers_changed}")
    print(f"explanation changes:     {explanations_changed}")
    print(f"newly reviewed:          {newly_reviewed}")
    if skipped_invalid_letter:
        print(f"skipped invalid letters: {skipped_invalid_letter}")
    print()
    print("Aja lopuksi:")
    print("  py tools/build_single_html.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
