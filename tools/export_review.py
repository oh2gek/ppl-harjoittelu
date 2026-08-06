"""Export every question to a single Markdown file for human review.

Tuotoksen kohde: review/answers.md

Tiedosto sisältää KAIKKI moduulien kysymykset, niiden vaihtoehdot, nykyisen
"Oikea:" -merkinnän ja "Selitys:" -kentän. Käy tiedosto läpi tekstieditorissa
ja muokkaa pelkästään "Oikea:"-rivin kirjainta (A/B/C/D) ja "Selitys:"-kentän
sisältöä.

Sen jälkeen aja:
    py tools/import_review.py
joka päivittää data/0X0.json -tiedostot ja merkitsee tarkistetut kysymykset
(needsReview: false, confidence: high). Aja lopuksi:
    py tools/build_single_html.py
päivittääksesi yhden tiedoston version PPL-harjoittelu.html.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

LETTERS = ["A", "B", "C", "D"]
PLACEHOLDER_PREFIXES = ("(AI-arvio", "(täytä", "(taytä", "(taeyta")


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    data_dir = root / "data"
    review_dir = root / "review"
    review_dir.mkdir(exist_ok=True)
    out = review_dir / "answers.md"

    parts: list[str] = []
    parts.append("# PPL-harjoittelu – kaikki kysymykset ja vastaukset\n\n")
    parts.append(
        "Tämä tiedosto sisältää **jokaisen** PDF-pankista parsitun kysymyksen.\n"
        "Käy lista läpi ja päivitä jokaiseen kysymykseen:\n\n"
        "1. **Oikea:** -rivin kirjain (A, B, C tai D)\n"
        "2. **Selitys:** -kenttä (lyhyt perustelu — saa olla useammalla rivillä)\n\n"
        "Tallenna tiedosto ja aja sitten projektin juuressa:\n\n"
        "```powershell\n"
        "py tools/import_review.py\n"
        "py tools/build_single_html.py\n"
        "```\n\n"
        "Importer:\n"
        "- merkitsee jokaisen kysymyksen, jolla on validi **Oikea:** *ja* ei-placeholder-Selitys, tilaan `needsReview: false`, `confidence: \"high\"`.\n"
        "- jättää koskematta kysymykset, joihin et koskenut.\n\n"
        "Älä muokkaa **Väittämä:**- tai vaihtoehto-rivejä – ne tulevat suoraan PDF:stä.\n\n"
        "---\n\n"
    )

    total = 0
    for jf in sorted(data_dir.glob("*.json")):
        obj = json.loads(jf.read_text(encoding="utf-8"))
        parts.append(f"## Moduuli {obj['module']} – {obj['moduleName']}\n\n")
        parts.append(f"_Lähde: {obj.get('source','?')}_\n\n")
        for q in obj.get("questions", []):
            qid = q.get("id", "?")
            n = q.get("number", "?")
            page = q.get("page", "?")
            parts.append(f"### {qid} · #{n} · sivu {page}\n\n")
            parts.append(f"**Väittämä:** {q.get('statement','').strip()}\n\n")
            for opt in q.get("options", []):
                parts.append(f"- {opt}\n")
            parts.append("\n")
            ci = q.get("correctIndex")
            letter = LETTERS[ci] if isinstance(ci, int) and 0 <= ci < 4 else " "
            parts.append(f"**Oikea:** {letter}\n\n")
            expl = (q.get("explanation") or "").strip()
            if not expl or expl.startswith(PLACEHOLDER_PREFIXES):
                expl = "(täytä selitys)"
            parts.append(f"**Selitys:** {expl}\n\n")
            parts.append("---\n\n")
            total += 1
        parts.append("\n")

    out.write_text("".join(parts), encoding="utf-8")
    print(f"Wrote {out} ({total} questions, {out.stat().st_size:,} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
