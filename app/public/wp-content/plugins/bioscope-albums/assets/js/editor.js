( function ( blocks, element, blockEditor, components, i18n, serverSideRender ) {
	'use strict';

	var el = element.createElement;
	var Fragment = element.Fragment;
	var registerBlockType = blocks.registerBlockType;
	var InspectorControls = blockEditor.InspectorControls;
	var useBlockProps = blockEditor.useBlockProps;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
	var SelectControl = components.SelectControl;
	var ToggleControl = components.ToggleControl;
	var RangeControl = components.RangeControl;
	var Notice = components.Notice;
	var __ = i18n.__;
	var ServerSideRender = serverSideRender;

	registerBlockType( 'bioscope/albums', {
		edit: function ( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var blockProps = useBlockProps( { className: 'bioscope-albums-block-editor' } );

			function textField( label, key, help ) {
				return el( TextControl, {
					label: label,
					value: attributes[ key ] || '',
					help: help || '',
					onChange: function ( value ) {
						var update = {};
						update[ key ] = value;
						setAttributes( update );
					}
				} );
			}

			function toggle( label, key ) {
				return el( ToggleControl, {
					label: label,
					checked: !! attributes[ key ],
					onChange: function ( value ) {
						var update = {};
						update[ key ] = value;
						setAttributes( update );
					}
				} );
			}

			return el( Fragment, {},
				el( InspectorControls, {},
					el( PanelBody, { title: __( 'Album Source', 'bioscope-albums' ), initialOpen: true },
						textField( __( 'Post type slug', 'bioscope-albums' ), 'postType', __( 'Default: album', 'bioscope-albums' ) ),
						textField( __( 'Taxonomy slug', 'bioscope-albums' ), 'taxonomy', __( 'Registered taxonomy slug; used as a fallback.', 'bioscope-albums' ) ),
						el( SelectControl, {
							label: __( 'Sort by', 'bioscope-albums' ),
							value: attributes.orderby,
							options: [
								{ label: __( 'Menu order', 'bioscope-albums' ), value: 'menu_order' },
								{ label: __( 'Date published', 'bioscope-albums' ), value: 'date' },
								{ label: __( 'Title', 'bioscope-albums' ), value: 'title' },
								{ label: __( 'Last modified', 'bioscope-albums' ), value: 'modified' },
								{ label: __( 'Random', 'bioscope-albums' ), value: 'rand' },
								{ label: __( 'Post ID', 'bioscope-albums' ), value: 'ID' }
							],
							onChange: function ( value ) { setAttributes( { orderby: value } ); }
						} ),
						el( SelectControl, {
							label: __( 'Sort direction', 'bioscope-albums' ),
							value: attributes.order,
							options: [
								{ label: __( 'Ascending', 'bioscope-albums' ), value: 'ASC' },
								{ label: __( 'Descending', 'bioscope-albums' ), value: 'DESC' }
							],
							onChange: function ( value ) { setAttributes( { order: value } ); }
						} ),
						el( RangeControl, {
							label: __( 'Number of albums', 'bioscope-albums' ),
							help: __( 'Set to the maximum to show all albums.', 'bioscope-albums' ),
							value: attributes.postsPerPage < 0 ? 100 : attributes.postsPerPage,
							min: 1, max: 100,
							onChange: function ( value ) { setAttributes( { postsPerPage: value >= 100 ? -1 : value } ); }
						} )
					),
					el( PanelBody, { title: __( 'ACF Field Names', 'bioscope-albums' ), initialOpen: false },
						textField( __( 'Occasion field name', 'bioscope-albums' ), 'occasionField' ),
						textField( __( 'Date field name', 'bioscope-albums' ), 'dateField' ),
						textField( __( 'Album link field name', 'bioscope-albums' ), 'linkField' ),
						textField( __( 'Photo count field name', 'bioscope-albums' ), 'countField' )
					),
					el( PanelBody, { title: __( 'Layout', 'bioscope-albums' ), initialOpen: true },
						el( RangeControl, {
							label: __( 'Desktop columns', 'bioscope-albums' ),
							value: attributes.columns,
							min: 1, max: 4,
							onChange: function ( value ) { setAttributes( { columns: value } ); }
						} ),
						el( RangeControl, {
							label: __( 'Card gap (px)', 'bioscope-albums' ),
							value: attributes.gap,
							min: 0, max: 80,
							onChange: function ( value ) { setAttributes( { gap: value } ); }
						} ),
						el( RangeControl, {
							label: __( 'Card corner radius (px)', 'bioscope-albums' ),
							value: attributes.cardRadius,
							min: 0, max: 40,
							onChange: function ( value ) { setAttributes( { cardRadius: value } ); }
						} ),
						el( RangeControl, {
							label: __( 'Image corner radius (px)', 'bioscope-albums' ),
							value: attributes.imageRadius,
							min: 0, max: 40,
							onChange: function ( value ) { setAttributes( { imageRadius: value } ); }
						} )
					),
					el( PanelBody, { title: __( 'Card Content', 'bioscope-albums' ), initialOpen: false },
						toggle( __( 'Show occasion', 'bioscope-albums' ), 'showOccasion' ),
						toggle( __( 'Show event date', 'bioscope-albums' ), 'showDate' ),
						toggle( __( 'Show photo count badge', 'bioscope-albums' ), 'showCount' ),
						toggle( __( 'Show “Open Album” label', 'bioscope-albums' ), 'showOpenLink' ),
						textField( __( 'Empty-state message', 'bioscope-albums' ), 'emptyMessage' )
					)
				),
				el( 'div', blockProps,
					el( Notice, { status: 'info', isDismissible: false },
						__( 'Bioscope Albums is a dynamic block. Use the sidebar to configure the query, fields, layout, and card content.', 'bioscope-albums' )
					),
					el( ServerSideRender, {
						block: 'bioscope/albums',
						attributes: attributes,
						httpMethod: 'POST'
					} )
				)
			);
		},
		save: function () {
			return null;
		}
	} );
} )(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.components,
	window.wp.i18n,
	window.wp.serverSideRender
);
