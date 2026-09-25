# Brand assets

Files in `public/` are served from the site root, so `public/brand/mollis-mark-black.png` is
available at `/brand/mollis-mark-black.png`.

## Source files (supplied 2026-09-25)

| File | Content |
|---|---|
| `mollisrobotics_bt.png` | black lockup on transparent, 1536x1024 |
| `mollisrobotics_wt.png` | white lockup on transparent, 1536x1024 |
| `mollisrobotics_bw.png` | black lockup on white background |
| `mollisrobotics_wb.png` | white lockup on black background |

## Derived files (cropped from the transparent sources)

| File | Used in |
|---|---|
| `mollis-mark-{black,white}.png` | nav (22px high), favicon |
| `mollis-wordmark-{black,white}.png` | nav next to the mark |
| `mollis-lockup-{black,white}.png` | footer, Open Graph image |
| `app/icon.png`, `app/apple-icon.png` | favicon and iOS icon (mark on paper) |
| `app/opengraph-image.png` | social sharing card (lockup on paper) |

Regenerate the derived files by re-running the crop script if the source PNGs change
(see HANDOVER.md, section 4). An SVG version of the mark and wordmark would be preferable for
crisp rendering at every size; replace the PNGs in `components/site/Logo.tsx` when available.
