# US MEN BRAND — ALL COLOURS / ORIGINAL PHOTO BACKGROUNDS

The previous website was used as the starting point. The tiger video hero, brand logo, header, About, Footer, Coming Soon pages, and existing product-page behaviour remain.

## Changes requested

- `DISCOVER THE COLLECTION` displays all **11 individually named colour products**: 4 US-400, 3 US-250, 4 US-300, in that order. Cards are grouped under the model headings.
- Selecting any individual colour opens `product.html?id=US-400&color=Blue` etc. The corresponding model page displays all colours of its family, with the existing colour-selector, image slider, thumbnails and zoom.
- All product images now load from `assets/eyewear-original/`. They retain the entire original white/grey studio background, product position and original lens colour. Images are resized proportionately and WEBP-compressed for performance; **no background removal, recolouring, cropping or cutout processing** was done.
- Existing cutout assets remain in `assets/eyewear/` but are no longer used in the featured catalogue or product details.
- No prices invented. The product codes, names and specifications remain as previously supplied.

## Open
Extract the ZIP and open `index.html` in VS Code Live Server or run `python3 -m http.server 8000`, then browse to `http://localhost:8000`.

## Source files
`index.html`, `css/style.css`, `js/main.js`, `js/catalog.js`, `js/product.js`, `product.html`, `css/product.css`, `js/product-page.js` are the relevant files. The site includes `index-all-in-one.html` and `ALL_SOURCE_CODE.txt` as complete readable code companions. The other website files were kept as they were.

## Images
Original inputs: 42 numbered PNGs plus 1 named PNG from `photo for web.zip`. See `PHOTO_MAPPING.md` for the image grouping and `assets/eyewear-original-manifest.json` for filename correspondence.

Image-to-colour matching is based on the prior mapping from the last version and should be double-checked against your inventory naming before publishing.
