# Bioscope Carousel Slide

Professional Gutenberg carousel plugin with:

- Nested Gutenberg slides.
- Any Gutenberg block inside a slide.
- Responsive slides-per-view and spacing.
- Swiper navigation, pagination, scrollbar and autoplay.
- Keyboard, mousewheel and grab cursor support.
- Image lightbox across all carousel images.
- Previous/next lightbox navigation.
- Captions from image figure captions.
- Slide background color/image.
- Gutenberg editor preview.
- Modular source structure.

## Requirements

- WordPress 6.5+
- PHP 7.4+
- Node.js 18+ recommended
- npm

## Development

```bash
npm install
npm run start
```

For production:

```bash
npm run build
```

After building, the `build/` directory is generated. Package the plugin directory without `node_modules/` and upload it to WordPress.

`node_modules/` is only needed for development and building; it is not needed to run the plugin. Do not include it in plugin ZIPs or site migrations. Keep the generated `build/` files, which the live plugin uses.

## Block structure

```text
Bioscope Carousel
  ├── Bioscope Slide
  │     └── Any Gutenberg blocks
  ├── Bioscope Slide
  │     └── Any Gutenberg blocks
  └── Bioscope Slide
        └── Any Gutenberg blocks
```

## Notes

The editor preview intentionally remains editable Gutenberg content. The frontend uses Swiper and the same saved slide markup. The lightbox collects images from all slides and lets the visitor navigate them sequentially.
