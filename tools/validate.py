"""Validate question banks and produce reports/validation_report.html.

USAGE:
    python tools/validate.py
"""
from __future__ import annotations

import html
import json
import sys
from collections import defaultdict
from pathlib import Path
from typing import Dict, List

MIN_QUESTIONS_PER_MODULE = 20
SHORT_STATEMENT_THRESHOLD = 25  # characters


def load_modules(data_dir: Path):
    modules = {}
    for jf in sorted(data_dir.glob("*.json")):
        try:
            obj = json.loads(jf.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"WARN: cannot read {jf}: {e}", file=sys.stderr)
            continue
        modules[obj.get("module") or jf.stem] = obj
    return modules


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    data_dir = root / "data"
    reports_dir = root / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    modules = load_modules(data_dir)

    issues: Dict[str, Dict[str, List[dict]]] = defaultdict(lambda: defaultdict(list))
    duplicates: Dict[str, List[List[dict]]] = defaultdict(list)
    short_modules: List[str] = []
    summary: List[Dict[str, object]] = []

    for module_id, mod in modules.items():
        questions = mod.get("questions", []) or []
        seen_text = defaultdict(list)
        for q in questions:
            stmt = (q.get("statement") or "").strip()
            ci = q.get("correctIndex")
            opts = q.get("options") or []
            if not isinstance(ci, int) or not (0 <= ci < len(opts)):
                issues[module_id]["missing_answer"].append(q)
            if len(opts) != 4:
                issues[module_id]["bad_options"].append(q)
            expl = (q.get("explanation") or "").strip()
            if not expl or expl.startswith("(AI-arvio"):
                issues[module_id]["missing_explanation"].append(q)
            if (q.get("confidence") or "").lower() == "low":
                issues[module_id]["low_confidence"].append(q)
            if q.get("needsReview"):
                issues[module_id]["needs_review"].append(q)
            if len(stmt) < SHORT_STATEMENT_THRESHOLD:
                issues[module_id]["short"].append(q)
            seen_text[stmt.lower()].append(q)

        for stmt, group in seen_text.items():
            if stmt and len(group) > 1:
                duplicates[module_id].append(group)

        if len(questions) < MIN_QUESTIONS_PER_MODULE:
            short_modules.append(module_id)

        summary.append({
            "id": module_id,
            "name": mod.get("moduleName") or module_id,
            "count": len(questions),
            "missing_answer": len(issues[module_id]["missing_answer"]),
            "missing_explanation": len(issues[module_id]["missing_explanation"]),
            "low_confidence": len(issues[module_id]["low_confidence"]),
            "needs_review": len(issues[module_id]["needs_review"]),
            "short": len(issues[module_id]["short"]),
            "duplicates": len(duplicates[module_id]),
        })

    # Render HTML report
    def esc(s):
        return html.escape(str(s) if s is not None else "")

    parts: List[str] = []
    parts.append("<!DOCTYPE html><html lang='fi'><head><meta charset='UTF-8'>")
    parts.append("<title>PPL-harjoittelu – Validointiraportti</title>")
    parts.append("<style>"
                 "body{font-family:Segoe UI,Arial,sans-serif;background:#f5f7fb;color:#0e1730;margin:0;padding:20px;}"
                 "h1{margin-top:0}"
                 "table{border-collapse:collapse;background:#fff;width:100%;box-shadow:0 1px 4px rgba(0,0,0,.06);}"
                 "th,td{border:1px solid #d6dbe7;padding:8px 10px;text-align:left;font-size:14px;}"
                 "th{background:#eef2fa;}"
                 ".bad{background:#ffe5e5;}"
                 ".warn{background:#fff5d6;}"
                 ".ok{background:#e3fbe6;}"
                 "section{background:#fff;border:1px solid #d6dbe7;border-radius:10px;padding:14px 16px;margin:14px 0;}"
                 "code{background:#eef2fa;padding:2px 4px;border-radius:4px;}"
                 "details{margin:6px 0;}"
                 "</style></head><body>")
    parts.append("<h1>PPL-harjoittelu – validointiraportti</h1>")
    parts.append("<p>Yhteenveto kysymysdatan laadusta. Käytä raporttia tarkistaaksesi ja korjataksesi <code>data/0X0.json</code>-tiedostot.</p>")

    # Summary table
    parts.append("<section><h2>Yhteenveto moduuleittain</h2>")
    parts.append("<table><tr>"
                 "<th>Moduuli</th><th>Kysymyksiä</th><th>Puuttuva vastaus</th><th>Puuttuva selitys</th>"
                 "<th>Low confidence</th><th>needsReview</th><th>Lyhyet</th><th>Duplikaatit</th></tr>")
    for s in summary:
        row_cls = "ok"
        if s["count"] < MIN_QUESTIONS_PER_MODULE or s["missing_answer"] or s["missing_explanation"]:
            row_cls = "bad"
        elif s["needs_review"] or s["low_confidence"] or s["duplicates"]:
            row_cls = "warn"
        parts.append(f"<tr class='{row_cls}'>"
                     f"<td>{esc(s['id'])} – {esc(s['name'])}</td>"
                     f"<td>{s['count']}{' ⚠️' if s['count'] < MIN_QUESTIONS_PER_MODULE else ''}</td>"
                     f"<td>{s['missing_answer']}</td>"
                     f"<td>{s['missing_explanation']}</td>"
                     f"<td>{s['low_confidence']}</td>"
                     f"<td>{s['needs_review']}</td>"
                     f"<td>{s['short']}</td>"
                     f"<td>{s['duplicates']}</td></tr>")
    parts.append("</table></section>")

    if short_modules:
        parts.append("<section><h2>Moduulit, joissa alle 20 kysymystä</h2><ul>")
        for mid in short_modules:
            parts.append(f"<li>{esc(mid)} – {esc(modules[mid].get('moduleName',''))} ({len(modules[mid].get('questions',[]))})</li>")
        parts.append("</ul></section>")

    # Per-category details
    categories = [
        ("missing_answer", "Kysymykset, joilta puuttuu kelvollinen oikea vastaus (correctIndex)"),
        ("bad_options", "Kysymykset, joiden vaihtoehtojen määrä ei ole 4"),
        ("missing_explanation", "Kysymykset, joilta puuttuu selitys (tai on placeholder)"),
        ("low_confidence", "Kysymykset, joiden confidence on 'low'"),
        ("needs_review", "Kysymykset, joissa needsReview = true"),
        ("short", "Epäilyttävän lyhyet kysymykset"),
    ]
    for key, title in categories:
        items = []
        for module_id, mod in modules.items():
            for q in issues[module_id][key]:
                items.append((module_id, q))
        if not items:
            continue
        parts.append(f"<section><h2>{esc(title)} ({len(items)})</h2>")
        parts.append("<details><summary>Näytä lista</summary><ul>")
        for module_id, q in items:
            parts.append(f"<li><code>{esc(q.get('id'))}</code> [{esc(module_id)}] {esc(q.get('statement',''))}</li>")
        parts.append("</ul></details></section>")

    # Duplicates
    dup_total = sum(len(v) for v in duplicates.values())
    if dup_total:
        parts.append(f"<section><h2>Mahdolliset duplikaatit ({dup_total})</h2>")
        for module_id, groups in duplicates.items():
            for group in groups:
                ids = ", ".join(esc(g.get("id")) for g in group)
                parts.append(f"<p><b>[{esc(module_id)}]</b> {esc(group[0].get('statement',''))}<br><small>id: {ids}</small></p>")
        parts.append("</section>")

    parts.append("</body></html>")

    out_path = reports_dir / "validation_report.html"
    out_path.write_text("".join(parts), encoding="utf-8")
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
