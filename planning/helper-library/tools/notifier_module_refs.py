#!/usr/bin/env python3
"""Read-only AI assistant helper: enumerate canonical Planning Helper TextModule IDs.

Output is paste-only references. Local GM state remains owned by Planning
Helper; this tool neither writes a module nor attaches one in Tampermonkey.
"""
import argparse
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent / "modules"
ID = re.compile(r"[a-z0-9][a-z0-9._-]{0,79}\Z")
OPEN = "[PLANNING_HELPER_LIBRARY_ITEM]"
CLOSE = "[/PLANNING_HELPER_LIBRARY_ITEM]"


def catalog(root=ROOT):
    """Read only direct, regular and matching *.module.md files."""
    result = {}
    for path in sorted(root.glob("*.module.md")):
        if path.is_symlink() or not path.is_file() or path.stat().st_size > 120000:
            continue
        name = path.name.removesuffix(".module.md")
        if not ID.fullmatch(name):
            continue
        data = path.read_text("utf-8")
        lines = data.splitlines()
        if lines.count(OPEN) != 1 or lines.count(CLOSE) != 1:
            continue
        start, end = lines.index(OPEN), lines.index(CLOSE)
        if start >= end:
            continue
        try:
            record = json.loads("\n".join(lines[start+1:end]))
        except json.JSONDecodeError:
            continue
        if (record.get("schemaVersion") != 1 or record.get("kind") != "module"
                or record.get("id") != name or not isinstance(record.get("title"), str)
                or not isinstance(record.get("text"), str)):
            continue
        result[name] = record["title"]
    return result


def refs(ids, known):
    if not ids or len(ids) > 20:
        raise ValueError("Supply 1 to 20 IDs.")
    if any(not ID.fullmatch(module_id) or module_id not in known for module_id in ids):
        raise ValueError("Unknown or invalid module ID. AI cannot assert it is available in Helper GM.")
    return " ".join(f"[[module:{module_id}]]" for module_id in dict.fromkeys(ids))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--list", action="store_true", help="List current repository source module IDs")
    group.add_argument("--ids", nargs="+", metavar="MODULE_ID",
                       help="Generate references to paste into Notifier settings")
    args = parser.parse_args()
    items = catalog()
    if args.list:
        for module_id, title in items.items():
            print(f"{module_id}\t{title}")
        return
    try:
        print(refs(args.ids, items))
    except ValueError as error:
        parser.error(str(error))


if __name__ == "__main__":
    main()
