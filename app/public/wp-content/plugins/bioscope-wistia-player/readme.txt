Bioscope Wistia Video Player
============================

A Gutenberg block that uses the supplied Bioscope custom HTML5 video player design with direct Wistia-delivered MP4 URLs.

Installation
------------
1. In WordPress, go to Plugins > Add New Plugin > Upload Plugin.
2. Upload bioscope-wistia-player.zip and activate it.
3. Add the “Bioscope Wistia Player” block in the block editor.
4. In the block settings, paste a direct Wistia delivery MP4 URL. Optionally add a poster image and quality options.

Quality options
---------------
Enter one quality per line using this format:
Label|Direct MP4 URL

Example:
360p|https://embed-ssl.wistia.com/deliveries/EXAMPLE-360/file.mp4
720p|https://embed-ssl.wistia.com/deliveries/EXAMPLE-720/file.mp4
1080p|https://embed-ssl.wistia.com/deliveries/EXAMPLE-1080/file.mp4

Important
---------
This block uses direct MP4 delivery URLs and a custom HTML5 video player. A regular Wistia share/page URL or hashed media ID alone is not a direct MP4 URL. Wistia adaptive streaming, analytics, captions, and Wistia-hosted player features are not provided by this custom HTML5 player. The editor uses native video controls for preview; the frontend uses the custom controls.
