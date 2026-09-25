"""Crop the MOLLIS logo PNGs into mark, wordmark and lockup assets."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]  # repo root; run: python scripts/crop-logo.py (needs Pillow)
BRAND = ROOT / "public" / "brand"


def alpha_bbox(img, threshold=20):
    a = img.getchannel("A").point(lambda v: 255 if v > threshold else 0)
    return a.getbbox()


def row_profile(img, threshold=20):
    """Return list of booleans per row: True if any opaque pixel."""
    a = img.getchannel("A")
    w, h = a.size
    px = a.load()
    rows = []
    for y in range(h):
        rows.append(any(px[x, y] > threshold for x in range(0, w, 2)))
    return rows


def segments(flags):
    """Contiguous True runs as (start, end) exclusive."""
    out, start = [], None
    for i, f in enumerate(flags):
        if f and start is None:
            start = i
        if not f and start is not None:
            out.append((start, i))
            start = None
    if start is not None:
        out.append((start, len(flags)))
    return out


def crop_with_margin(img, box, margin):
    l, t, r, b = box
    return img.crop((max(0, l - margin), max(0, t - margin), min(img.width, r + margin), min(img.height, b + margin)))


def process(src_name, suffix):
    img = Image.open(BRAND / src_name).convert("RGBA")
    bbox = alpha_bbox(img)
    lockup = img.crop(bbox)
    rows = segments(row_profile(lockup))
    # merge tiny gaps (<8px) so letters with dots stay together
    merged = []
    for s, e in rows:
        if merged and s - merged[-1][1] < 8:
            merged[-1] = (merged[-1][0], e)
        else:
            merged.append((s, e))
    print(src_name, "bbox", bbox, "row segments", merged)
    assert len(merged) >= 3, "expected mark, MOLLIS, robotics"
    mark_rows, word_rows, sub_rows = merged[0], merged[1], merged[-1]

    def band(r):
        part = lockup.crop((0, r[0], lockup.width, r[1]))
        return part.crop(alpha_bbox(part))

    mark = band(mark_rows)
    word = band(word_rows)
    sub = band(sub_rows)  # the "robotics" line
    lockup_out = crop_with_margin(img, bbox, 0)

    mark.save(BRAND / f"mollis-mark-{suffix}.png", optimize=True)
    word.save(BRAND / f"mollis-wordmark-{suffix}.png", optimize=True)
    sub.save(BRAND / f"mollis-robotics-{suffix}.png", optimize=True)
    lockup_out.save(BRAND / f"mollis-lockup-{suffix}.png", optimize=True)
    print("  mark", mark.size, "wordmark", word.size, "robotics", sub.size, "lockup", lockup_out.size)
    return mark, lockup_out


mark_black, lockup_black = process("mollisrobotics_bt.png", "black")
process("mollisrobotics_wt.png", "white")

# Favicon / app icon: black mark on warm paper, square with padding
for size, name in ((512, "icon.png"), (180, "apple-icon.png")):
    canvas = Image.new("RGBA", (size, size), (244, 242, 237, 255))
    pad = int(size * 0.16)
    m = mark_black.copy()
    m.thumbnail((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    canvas.convert("RGB").save(ROOT / "app" / name, optimize=True)
    print("wrote", name)

# Open Graph image 1200x630: lockup centred on paper
og = Image.new("RGBA", (1200, 630), (244, 242, 237, 255))
lk = lockup_black.copy()
lk.thumbnail((640, 400), Image.LANCZOS)
og.alpha_composite(lk, ((1200 - lk.width) // 2, (630 - lk.height) // 2 - 10))
og.convert("RGB").save(ROOT / "app" / "opengraph-image.png", optimize=True)
print("wrote opengraph-image.png")
