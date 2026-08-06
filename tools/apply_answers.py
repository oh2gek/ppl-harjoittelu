"""Apply answers from tools/answers/<module>.py into data/<module>.json.

Käyttö:
    py tools/apply_answers.py 010
    py tools/apply_answers.py 010 020 030
    py tools/apply_answers.py            # kaikki saatavilla olevat moduulit

Jokainen tools/answers/<mod>.py tiedosto määrittelee dictin ANSWERS:
    ANSWERS = {
        "010-0001": ("B", "Selitys..."),
        ...
    }
"""
from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path
from typing import Dict, Tuple

LETTERS = ["A", "B", "C", "D"]


def load_answers(module_id: str, root: Path) -> Dict[str, Tuple[str, str]]:
    p = root / "tools" / "answers" / f"{module_id}.py"
    if not p.exists():
        return {}
    spec = importlib.util.spec_from_file_location(f"answers_{module_id}", str(p))
    if spec is None or spec.loader is None:
        return {}
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)  # type: ignore
    return getattr(mod, "ANSWERS", {})


def apply_module(module_id: str, root: Path) -> None:
    answers = load_answers(module_id, root)
    if not answers:
        print(f"[{module_id}] no answers file – skipping")
        return
    json_path = root / "data" / f"{module_id}.json"
    if not json_path.exists():
        print(f"[{module_id}] data/{module_id}.json missing – skipping")
        return
    obj = json.loads(json_path.read_text(encoding="utf-8"))
    qs = obj.get("questions", [])
    by_id = {q.get("id"): q for q in qs}
    updated = 0
    missing = 0
    for qid, (letter, expl) in answers.items():
        q = by_id.get(qid)
        if not q:
            missing += 1
            print(f"  WARN: {qid} not in JSON")
            continue
        L = (letter or "").upper().strip()
        if L not in LETTERS:
            print(f"  WARN: {qid} invalid letter {letter!r}")
            continue
        idx = LETTERS.index(L)
        q["correctIndex"] = idx
        q["explanation"] = expl.strip()
        q["needsReview"] = False
        q["confidence"] = "high"
        updated += 1
    json_path.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[{module_id}] applied {updated}/{len(qs)} answers (missing: {missing})")


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    args = sys.argv[1:]
    if not args:
        ans_dir = root / "tools" / "answers"
        if ans_dir.exists():
            args = sorted(p.stem for p in ans_dir.glob("*.py") if not p.stem.startswith("_"))
    if not args:
        print("No answer files found in tools/answers/")
        return 1
    for module_id in args:
        apply_module(module_id, root)
    return 0


if __name__ == "__main__":
    sys.exit(main())
