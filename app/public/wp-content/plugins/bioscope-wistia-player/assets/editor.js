(function (wp) {
  'use strict';
  var el = wp.element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var MediaUpload = wp.blockEditor.MediaUpload;
  var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
  var PanelBody = wp.components.PanelBody;
  var TextControl = wp.components.TextControl;
  var TextareaControl = wp.components.TextareaControl;
  var SelectControl = wp.components.SelectControl;
  var RangeControl = wp.components.RangeControl;
  var Button = wp.components.Button;
  var Notice = wp.components.Notice;

  registerBlockType('bioscope/wistia-player', {
    title: 'Bioscope Wistia Player',
    description: 'Responsive video player with custom controls for Wistia-delivered MP4 files.',
    icon: 'video-alt3',
    category: 'media',
    attributes: {
      videoUrl: { type: 'string', default: '' },
      posterUrl: { type: 'string', default: '' },
      qualities: { type: 'string', default: '' },
      aspectRatio: { type: 'string', default: '16:9' },
      borderRadius: { type: 'number', default: 12 },
      preload: { type: 'string', default: 'metadata' }
    },
    edit: function (props) {
      var a = props.attributes;
      var set = props.setAttributes;
      var blockProps = useBlockProps({ className: 'bwp-editor-block' });
      var inspector = el(InspectorControls, {},
        el(PanelBody, { title: 'Video source', initialOpen: true },
          el(TextControl, { label: 'Wistia MP4 URL', help: 'Paste a direct Wistia delivery .mp4 URL, not the Wistia page URL.', value: a.videoUrl, onChange: function (v) { set({ videoUrl: v }); }, type: 'url' }),
          el(MediaUploadCheck, {}, el(MediaUpload, { onSelect: function (m) { set({ videoUrl: m.url }); }, allowedTypes: ['video'], render: function (obj) { return el(Button, { variant: 'secondary', onClick: obj.open }, 'Choose video from Media Library'); } })),
          el(TextControl, { label: 'Poster image URL', value: a.posterUrl, onChange: function (v) { set({ posterUrl: v }); }, type: 'url' }),
          el(MediaUploadCheck, {}, el(MediaUpload, { onSelect: function (m) { set({ posterUrl: m.url }); }, allowedTypes: ['image'], render: function (obj) { return el(Button, { variant: 'secondary', onClick: obj.open, style: { marginTop: '8px' } }, 'Choose poster image'); } })),
          el(SelectControl, { label: 'Aspect ratio', value: a.aspectRatio, options: [ { label: 'Landscape 16:9', value: '16:9' }, { label: 'Standard 4:3', value: '4:3' }, { label: 'Square 1:1', value: '1:1' }, { label: 'Portrait 9:16', value: '9:16' } ], onChange: function (v) { set({ aspectRatio: v }); } }),
          el(RangeControl, { label: 'Border radius (px)', value: a.borderRadius, min: 0, max: 60, onChange: function (v) { set({ borderRadius: v }); } }),
          el(SelectControl, { label: 'Preload', value: a.preload, options: [ { label: 'Metadata (recommended)', value: 'metadata' }, { label: 'None', value: 'none' }, { label: 'Auto', value: 'auto' } ], onChange: function (v) { set({ preload: v }); } })
        ),
        el(PanelBody, { title: 'Quality options', initialOpen: false },
          el(Notice, { status: 'info', isDismissible: false }, 'One quality per line, formatted as Label|Direct MP4 URL. Use direct Wistia delivery URLs for each quality.'),
          el(TextareaControl, { label: 'Quality list', rows: 7, value: a.qualities, onChange: function (v) { set({ qualities: v }); }, placeholder: '360p|https://embed-ssl.wistia.com/deliveries/.../file.mp4\n720p|https://embed-ssl.wistia.com/deliveries/.../file.mp4\n1080p|https://embed-ssl.wistia.com/deliveries/.../file.mp4' })
        )
      );
      var preview = a.videoUrl
        ? el('div', { className: 'film-video-wrap bwp-editor-preview', style: { paddingTop: a.aspectRatio === '9:16' ? '177.7778%' : a.aspectRatio === '1:1' ? '100%' : a.aspectRatio === '4:3' ? '75%' : '56.25%', borderRadius: (a.borderRadius || 0) + 'px' } },
            el('video', { className: 'custom-video', controls: true, playsInline: true, preload: 'metadata', poster: a.posterUrl || undefined }, el('source', { src: a.videoUrl, type: 'video/mp4' }))
          )
        : el('div', { className: 'bwp-editor-placeholder' }, el('span', { className: 'dashicons dashicons-video-alt3' }), el('p', {}, 'Add a Wistia MP4 URL in the block settings to preview your video.'), el(TextControl, { label: 'Wistia MP4 URL', value: a.videoUrl, onChange: function (v) { set({ videoUrl: v }); }, type: 'url' }));
      return el('div', blockProps, inspector, preview);
    },
    save: function () { return null; }
  });
})(window.wp);
