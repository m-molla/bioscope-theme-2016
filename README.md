# Bioscope Theme

Source repository for the Bioscope WordPress theme and its first-party plugins.

## Included

- `app/public/wp-content/themes/bioscope26/` — the active Bioscope theme.
- `app/public/wp-content/plugins/bioscope-*/` — Bioscope-developed plugins.

WordPress core, third-party plugins, local server configuration, uploads, databases, and secrets are intentionally excluded.

## Installation

1. Install WordPress on the target server.
2. Clone this repository into a local working directory.
3. Copy the included theme into `wp-content/themes/` and activate **Bioscope26** in WordPress.
4. Copy the required `bioscope-*` plugins into `wp-content/plugins/` and activate them in WordPress.
5. Install third-party plugins separately as required by the site.
6. Configure production-specific settings and credentials in the server's `wp-config.php`; never commit them.
