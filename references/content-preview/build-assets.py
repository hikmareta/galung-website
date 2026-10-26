"""Encode responsive WebP derivatives; preserve source PNGs and composition."""
from pathlib import Path
import hashlib
import json
from PIL import Image, __version__ as pillow_version

root = Path(__file__).resolve().parent
out = root / 'assets' / 'optimized'
out.mkdir(exist_ok=True)
manifest = {'encoder': 'Pillow ' + pillow_version, 'format': 'WebP', 'quality': 82, 'images': []}
for name, widths in {'hero': [640, 960, 1280, 1860], 'laptop': [480, 768, 1024, 1536], 'community': [640, 960, 1280, 1983]}.items():
    source = root / 'assets' / f'{name}-generated-v2.png'
    with Image.open(source) as original:
        image = original.convert('RGB')
        variants = []
        for width in widths:
            width = min(width, image.width)
            height = round(image.height * width / image.width)
            target = out / f'{name}-v3-{width}.webp'
            image.resize((width, height), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=82, method=6)
            variants.append({'path': target.relative_to(root).as_posix(), 'width': width, 'height': height, 'bytes': target.stat().st_size, 'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})
        manifest['images'].append({'name': name, 'source': source.relative_to(root).as_posix(), 'sourceBytes': source.stat().st_size, 'variants': variants})
manifest['largestImageSetBytes'] = sum(i['variants'][-1]['bytes'] for i in manifest['images'])
manifest['fonts'] = [{'path': f.relative_to(root).as_posix(), 'bytes': f.stat().st_size, 'sha256': hashlib.sha256(f.read_bytes()).hexdigest()} for f in sorted((root / 'assets' / 'fonts').glob('*.woff2'))]
manifest['fontBytes'] = sum(f['bytes'] for f in manifest['fonts'])
manifest['largestImageAndFontSetBytes'] = manifest['largestImageSetBytes'] + manifest['fontBytes']
manifest['archivedSourceSetBytes'] = sum(i['sourceBytes'] for i in manifest['images']) + sum(f.stat().st_size for f in (root / 'assets' / 'fonts').glob('*.ttf'))
(out / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'largestImageSetBytes': manifest['largestImageSetBytes'], 'allVariantBytes': sum(v['bytes'] for i in manifest['images'] for v in i['variants'])}))

