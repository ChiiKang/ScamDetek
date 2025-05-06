import json

def load_jsonl(path):
    with open(path, "r", encoding="utf-8") as f:
        return [json.loads(line.strip()) for line in f]

def format_context(matches):
    blocks = []
    for m in matches:
        title = m["metadata"].get("title", "Untitled")
        content = m["metadata"].get("content", "")
        blocks.append(f"{title}:{content}")
    return "\n\n".join(blocks)