"""Convert product PNG renders in public/products to web-sized JPGs (max 2000px, q90)."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "products"

for png in sorted(SRC.glob("*.png")):
    img = Image.open(png).convert("RGB")
    img.thumbnail((2000, 2000), Image.LANCZOS)
    out = png.with_suffix(".jpg")
    img.save(out, "JPEG", quality=90, optimize=True, progressive=True)
    print(out.name, img.size, f"{out.stat().st_size // 1024} KB")
