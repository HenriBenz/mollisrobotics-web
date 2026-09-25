# Product photography

Served at `/products/<file>`. Mapped to products in `lib/images.ts` (photo + focal point).

| File | Content |
|---|---|
| `mollis-product-01.jpg` | Core on an industrial robot, five finger variants standing below (family shot) |
| `mollis-product-02.jpg` | Soft tool with orange compliant fingers, square |
| `mollis-product-03.jpg` | Soft tool close-up, portrait |
| `mollis-product-04.jpg` | Grip parallel gripper, aluminium jaws, black pads |
| `mollis-product-05.jpg` | Hand with articulated aluminium fingers holding a block |

Adding images: drop PNG renders here and run `python scripts/convert-products.py` (needs Pillow)
to produce web JPGs (max 2000 px, quality 90). Then add or change the entry in `lib/images.ts`.
Keep the style: real materials, workshop light, black body + aluminium mechanics + orange
interaction surfaces. Delete the PNG after converting; only JPGs are committed.
