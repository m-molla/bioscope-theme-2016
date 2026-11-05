Bioscope Albums 2.0.5
=====================

WHAT'S NEW
- Dynamic Gutenberg block: Bioscope Albums.
- Responsive desktop/tablet/mobile column and gap controls.
- Per-post desktop featured-image height in the post editor sidebar.
- Consistent responsive image height on mobile; desktop honors the per-post height.
- Ordered masonry placement: posts are processed in menu_order ASC, date DESC order and flow left-to-right by row, continuing down each column.
- Per-post featured-image height from the Bioscope Album Image Height panel is applied on the frontend.
- Preserves the Posts > Reorder Posts drag-and-drop ordering tool.
- Keeps the [bioscope_masonry_posts] shortcode for existing pages.
- Card styling follows the supplied Bioscope Albums reference CSS.

INSTALL
1. Back up your site and deactivate the old Bioscope Post Order & Masonry plugin before replacing it.
2. Upload this ZIP via Plugins > Add New > Upload Plugin, then activate.
3. In Posts > Reorder Posts, arrange and save post order.
4. Edit any Post and use the Bioscope Album Image Height panel to set its desktop image height (80–2000 px). Leave blank to retain that image's natural height.
5. In Gutenberg, add the Bioscope Albums block and configure columns, gaps and card options in the block sidebar.

ORDER NOTE
The query processes posts by menu_order ASC and date DESC. Masonry layout keeps that order visually: each row fills from left to right, then items continue down their assigned columns.

NOTES
- Images fill the card width and use object-fit: cover when a per-post height is set.
- Desktop posts without a custom height keep their featured image's natural aspect ratio.
- Mobile uses a consistent responsive cover height for every album, regardless of desktop settings.
- Existing shortcode remains supported.
- Test with your active theme and any caching/minification plugin before production use.


Version 2.0.5: Mobile covers use one consistent responsive height, independent of desktop per-post heights. Removed an unused render shim and corrected the block editor asset version.
