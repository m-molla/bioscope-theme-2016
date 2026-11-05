(function (wp) {
  const { registerBlockType } = wp.blocks;
  const { InspectorControls, useBlockProps } = wp.blockEditor;
  const { PanelBody, TextControl, RangeControl, Notice } = wp.components;
  const { createElement: el, Fragment } = wp.element;
  const { __ } = wp.i18n;

  function getMapUrl(location, zoom, embedUrl) {
    const supplied = (embedUrl || '').trim();
    if (supplied) {
      // Accept a Google Maps embed URL or a regular maps URL; never allow arbitrary iframe HTML.
      try {
        const parsed = new URL(supplied);
        const allowed = parsed.hostname === 'google.com' || parsed.hostname.endsWith('.google.com') || parsed.hostname === 'maps.google.com' || parsed.hostname.endsWith('.googleusercontent.com');
        if (allowed && (parsed.protocol === 'https:' || parsed.protocol === 'http:')) return supplied;
      } catch (e) {}
      return '';
    }
    const query = encodeURIComponent((location || '').trim());
    return query ? 'https://maps.google.com/maps?q=' + query + '&z=' + Number(zoom || 14) + '&output=embed' : '';
  }

  function MapPreview(props) {
    const { location, embedUrl, width, height, zoom, borderRadius, mapTitle } = props.attributes;
    const url = getMapUrl(location, zoom, embedUrl);
    const style = {
      width: width || '100%',
      maxWidth: '100%',
      height: Math.max(150, Number(height) || 400) + 'px',
      border: 0,
      borderRadius: Math.max(0, Number(borderRadius) || 0) + 'px',
      display: 'block'
    };

    return el('div', { className: 'bioscope-google-map-preview', style: { width: style.width, maxWidth: '100%' } },
      url
        ? el('iframe', {
            src: url,
            title: mapTitle || 'Google Map',
            width: '100%',
            height: style.height,
            style: { height: style.height, border: 0, borderRadius: style.borderRadius, display: 'block', width: '100%' },
            loading: 'lazy',
            referrerPolicy: 'no-referrer-when-downgrade',
            allowFullScreen: true
          })
        : el(Notice, { status: 'warning', isDismissible: false }, __('Enter a location or a valid Google Maps URL in the block settings.', 'bioscope-google-map-block'))
    );
  }

  registerBlockType('bioscope/google-map', {
    edit: function (props) {
      const { attributes, setAttributes } = props;
      const blockProps = useBlockProps({ className: 'bioscope-google-map-block-editor' });
      return el(Fragment, null,
        el(InspectorControls, null,
          el(PanelBody, { title: __('Map settings', 'bioscope-google-map-block'), initialOpen: true },
            el(TextControl, {
              label: __('Location / address', 'bioscope-google-map-block'),
              help: __('Example: National Museum, Dhaka, Bangladesh', 'bioscope-google-map-block'),
              value: attributes.location,
              onChange: function (value) { setAttributes({ location: value, embedUrl: '' }); }
            }),
            el(TextControl, {
              label: __('Google Maps URL (optional)', 'bioscope-google-map-block'),
              help: __('Paste a Google Maps embed URL to use it instead of the location search.', 'bioscope-google-map-block'),
              value: attributes.embedUrl,
              onChange: function (value) { setAttributes({ embedUrl: value }); }
            }),
            el(TextControl, {
              label: __('Map width', 'bioscope-google-map-block'),
              help: __('Use 100%, 800px, or another CSS width. The map never exceeds its container.', 'bioscope-google-map-block'),
              value: attributes.width,
              onChange: function (value) { setAttributes({ width: value || '100%' }); }
            }),
            el(RangeControl, {
              label: __('Map height (px)', 'bioscope-google-map-block'),
              value: attributes.height,
              onChange: function (value) { setAttributes({ height: value || 400 }); },
              min: 150,
              max: 1200,
              step: 10
            }),
            el(RangeControl, {
              label: __('Zoom level', 'bioscope-google-map-block'),
              value: attributes.zoom,
              onChange: function (value) { setAttributes({ zoom: value || 14 }); },
              min: 1,
              max: 21
            }),
            el(RangeControl, {
              label: __('Corner radius (px)', 'bioscope-google-map-block'),
              value: attributes.borderRadius,
              onChange: function (value) { setAttributes({ borderRadius: value || 0 }); },
              min: 0,
              max: 60
            }),
            el(TextControl, {
              label: __('Accessible map title', 'bioscope-google-map-block'),
              value: attributes.mapTitle,
              onChange: function (value) { setAttributes({ mapTitle: value }); }
            })
          )
        ),
        el('div', blockProps,
          el('div', { className: 'bioscope-google-map-block-label' }, __('Google Map preview', 'bioscope-google-map-block')),
          el(MapPreview, props)
        )
      );
    },
    save: function (props) {
      const { location, embedUrl, width, height, zoom, borderRadius, mapTitle } = props.attributes;
      const url = getMapUrl(location, zoom, embedUrl);
      const blockProps = wp.blockEditor.useBlockProps.save({ className: 'bioscope-google-map-block' });
      if (!url) return el('div', blockProps, '');
      return el('div', Object.assign({}, blockProps, { style: { width: width || '100%', maxWidth: '100%' } }),
        el('iframe', {
          src: url,
          title: mapTitle || 'Google Map',
          width: '100%',
          height: Math.max(150, Number(height) || 400),
          style: { width: '100%', height: Math.max(150, Number(height) || 400) + 'px', border: 0, borderRadius: Math.max(0, Number(borderRadius) || 0) + 'px', display: 'block' },
          loading: 'lazy',
          referrerPolicy: 'no-referrer-when-downgrade',
          allowFullScreen: true
        })
      );
    }
  });
})(window.wp);
