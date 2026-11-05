# Bioscope Event Showcase

The plugin provides two Gutenberg blocks:

- **Bioscope Event Showcase** is a flexible container. Add any Gutenberg blocks
  inside it; use Group, Columns, or other layout blocks to decide where the
  gallery images and other content should appear.
- **Showcase Image** is an individually movable image. Choose a media-library
  image and set its role to **Preview image** or **Thumbnail image**.

The first image marked as a preview becomes the large preview. If none is
marked, the first image is used. Thumbnail clicks open the lightbox at that
image without changing the preview. Only the preview's arrows change the
preview, cycling through every image. Clicking the preview opens the lightbox
at the currently displayed image. Close it with the close button, by clicking
the dark backdrop, or by pressing Escape. The lightbox also supports arrow-key
navigation without changing the preview.

## Build

From this plugin directory, run:

```sh
npm run build
```

The build writes the editor bundle, front-end interaction script, and styles
to `build/`. WordPress registers both block types from their block metadata.
