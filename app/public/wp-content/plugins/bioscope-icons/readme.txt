BIOSCOPE ICONS
==============
Version: 1.0.0

A lightweight Gutenberg icon block powered by the locally bundled Font Awesome Free 7.3.1 webfonts.

INSTALLATION
1. In WordPress, go to Plugins > Add New Plugin > Upload Plugin.
2. Upload bioscope-icons.zip and click Install Now.
3. Activate Bioscope Icons.
4. In the block inserter, search for “Bioscope Icon”.
5. Select an icon and use the block sidebar to customize size, icon color, background color, padding, shape, alignment, and accessible label.

PERFORMANCE
- No external CDN or runtime dependency on Font Awesome JavaScript.
- Icon catalogue is loaded in the block editor only, when the editor script runs.
- Font files are local. WordPress loads the block stylesheet on pages where the block is used.
- The icon catalogue contains Free icons included in the supplied Font Awesome 7.3.1 metadata.

LICENSE
Font Awesome Free is distributed under its own licenses. See LICENSE.txt for details. This plugin's PHP and JavaScript are provided under GPL-2.0-or-later.

= 1.0.3 =
* Improved retrieval of the active theme.json color palette in the editor.
* Preserves safe CSS custom-property colors such as var(--bioscope-gold) on the frontend.
