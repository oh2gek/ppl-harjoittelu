"""Build a single self-contained PPL-harjoittelu.html file.

Combines:
- index.html
- src/styles.css        -> inlined into <style>
- src/app.js            -> inlined into <script>
- data/*.json           -> embedded as { "010": [questions...], ... }
                          inside <script id="ppl-data" type="application/json">

USAGE:
    python tools/build_single_html.py
"""
from __future__ import annotations

import base64
import json
import re
import sys
from pathlib import Path


def bump_version(js_text: str) -> tuple[str, str]:
    """Bump APP_VERSION in app.js. Rules: patch+1; patch>=100 -> minor+1,patch=0; minor>=10 -> major+1,minor=0,patch=0."""
    m = re.search(r'var APP_VERSION = "(\d+)\.(\d+)\.(\d+)";', js_text)
    if not m:
        return js_text, "unknown"
    major, minor, patch = int(m.group(1)), int(m.group(2)), int(m.group(3))
    patch += 1
    if patch >= 100:
        patch = 0
        minor += 1
    if minor >= 10:
        minor = 0
        major += 1
    new_ver = f"{major}.{minor}.{patch}"
    new_js = re.sub(r'var APP_VERSION = "\d+\.\d+\.\d+";', f'var APP_VERSION = "{new_ver}";', js_text, count=1)
    return new_js, new_ver


def markdown_to_html(md: str) -> str:
    """Minimal markdown-to-HTML for the changelog."""
    lines = md.splitlines()
    out: list[str] = []
    in_list = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("# "):
            if in_list:
                out.append("</ul>")
                in_list = False
            out.append(f'<h2 style="margin-top:0">{stripped[2:]}</h2>')
        elif stripped.startswith("## "):
            if in_list:
                out.append("</ul>")
                in_list = False
            out.append(f'<h3 style="margin-top:18px;margin-bottom:6px;border-bottom:1px solid var(--border);padding-bottom:4px;">{stripped[3:]}</h3>')
        elif stripped.startswith("### "):
            if in_list:
                out.append("</ul>")
                in_list = False
            out.append(f'<h4 style="margin-top:12px;margin-bottom:4px;color:var(--accent)">{stripped[4:]}</h4>')
        elif stripped.startswith("- "):
            if not in_list:
                out.append('<ul style="margin:0 0 8px 18px;padding:0;line-height:1.55;">')
                in_list = True
            item = stripped[2:]
            item = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', item)
            out.append(f'<li style="margin-bottom:4px;">{item}</li>')
        elif stripped == "":
            if in_list:
                out.append("</ul>")
                in_list = False
            out.append("<br>")
        else:
            if in_list:
                out.append("</ul>")
                in_list = False
            item = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', stripped)
            out.append(f'<p style="margin:0 0 8px 0;line-height:1.55;">{item}</p>')
    if in_list:
        out.append("</ul>")
    return "\n".join(out)


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    src_index = root / "src" / "index.html"
    dev_index = root / "index.html" if not src_index.exists() else src_index
    index_html = dev_index.read_text(encoding="utf-8")
    css = (root / "src" / "styles.css").read_text(encoding="utf-8")
    js_raw = (root / "src" / "app.js").read_text(encoding="utf-8")
    js, new_ver = bump_version(js_raw)
    (root / "src" / "app.js").write_text(js, encoding="utf-8")
    print(f"Bumped version -> {new_ver}")

    data_dir = root / "data"
    bundle: dict = {}
    for jf in sorted(data_dir.glob("*.json")):
        try:
            obj = json.loads(jf.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"WARN: cannot read {jf}: {e}", file=sys.stderr)
            continue
        module_id = obj.get("module") or jf.stem
        bundle[module_id] = obj.get("questions", [])
    data_json = json.dumps(bundle, ensure_ascii=False)

    # Read and convert CHANGELOG.md to HTML for embedding
    changelog_md = (root / "CHANGELOG.md").read_text(encoding="utf-8")
    changelog_html = markdown_to_html(changelog_md)
    changelog_js = json.dumps(changelog_html, ensure_ascii=False)

    # Read manifest.json and convert to inline data URI
    manifest_path = root / "manifest.json"
    if manifest_path.exists():
        manifest_b64 = base64.b64encode(manifest_path.read_bytes()).decode("ascii")
        manifest_uri = f"data:application/json;base64,{manifest_b64}"
    else:
        manifest_uri = "manifest.json"

    out = index_html

    # Replace <link rel="stylesheet" href="styles.css" /> with inline <style>
    css_block = f"<style>\n{css}\n</style>"
    out = re.sub(
        r'<link\s+rel="stylesheet"\s+href="(?:src/)?styles\.css"\s*/?>',
        lambda m: css_block,
        out,
    )

    # Replace external app.js with inline script, prepending changelog and PNG map
    js_prefix = f"var CHANGELOG_HTML = {changelog_js};\n"
    js_with_prefix = js_prefix + js
    js_block = f"<script>\n{js_with_prefix}\n</script>"
    # Replace manifest link with inline data URI
    out = out.replace(
        '<link rel="manifest" href="manifest.json" />',
        f'<link rel="manifest" href="{manifest_uri}" />'
    )

    out = re.sub(
        r'<script\s+src="(?:src/)?app\.js"\s*></script>',
        lambda m: js_block,
        out,
    )

    # Embed data into the placeholder <script id="ppl-data">null</script>
    out = re.sub(
        r'(<script id="ppl-data"[^>]*>)\s*null\s*(</script>)',
        lambda m: m.group(1) + data_json + m.group(2),
        out,
        count=1,
    )

    output_path = root / "PPL-harjoittelu.html"
    output_path.write_text(out, encoding="utf-8")
    (root / "index.html").write_text(out, encoding="utf-8")
    total_q = sum(len(v) for v in bundle.values())
    print(f"Wrote {output_path}")
    print(f"Wrote {root / 'index.html'}")
    print(f"  modules: {len(bundle)}, total questions: {total_q}")
    print("Open the file in any browser. No internet required.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
