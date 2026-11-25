import json, re, pathlib

# Scan the actual media files in public/images/original
orig_dir = pathlib.Path('public/images/original')
if not orig_dir.exists():
    raise SystemExit('public/images/original not found')

pattern = re.compile(r'^(?P<post>\d+)_(?P<user>\d+)(?:_(?P<seq>\d+))?\.(?P<ext>jpg|mp4)$')
media = []
for f in sorted(orig_dir.iterdir()):
    m = pattern.match(f.name)
    if m:
        d = m.groupdict()
        media.append({
            "filename": f.name,
            "post_id": d['post'],
            "user_id": d['user'],
            "seq": d['seq'] or "0",
            "ext": d['ext']
        })

out = pathlib.Path('src/lib/media.json')
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(media, indent=2))
print(f'Wrote {out} ({len(media)} items)')
