( function ( blocks, element, blockEditor, components, i18n ) {
	const el = element.createElement;
	const Fragment = element.Fragment;
	const __ = i18n.__;
	const InnerBlocks = blockEditor.InnerBlocks;
	const useBlockProps = blockEditor.useBlockProps;
	const URLInput = blockEditor.URLInput;
	const InspectorControls = blockEditor.InspectorControls;
	const BlockControls = blockEditor.BlockControls;
	const PanelBody = components.PanelBody;
	const ToggleControl = components.ToggleControl;
	const ToolbarGroup = components.ToolbarGroup;
	const ToolbarButton = components.ToolbarButton;

	blocks.registerBlockType( 'bioscope/linked-group', {
		apiVersion: 3,
		title: __( 'Bioscope Linked Group', 'bioscope-linked-group' ),
		description: __( 'A group-style container linking its content to a page or section.', 'bioscope-linked-group' ),
		icon: 'admin-links',
		category: 'design',
		attributes: {
			url: { type: 'string', default: '' },
			opensInNewTab: { type: 'boolean', default: false },
			relNoFollow: { type: 'boolean', default: false },
			className: { type: 'string' }
		},
		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
			html: false,
			spacing: { margin: true, padding: true, blockGap: true },
			color: { background: true, text: true, gradients: true },
			typography: { fontSize: true, lineHeight: true },
			border: { color: true, radius: true, style: true, width: true },
			dimensions: { minHeight: true }
		},
		edit: function ( props ) {
			const a = props.attributes;
			const blockProps = useBlockProps( { className: 'bioscope-linked-group-editor' } );
			return el( Fragment, {},
				el( InspectorControls, {},
					el( PanelBody, { title: __( 'Link settings', 'bioscope-linked-group' ), initialOpen: true },
						el( URLInput, {
							label: __( 'Link to a page or URL', 'bioscope-linked-group' ),
							help: __( 'Search for a page or enter a URL, relative URL, or section anchor.', 'bioscope-linked-group' ),
							value: a.url || '',
							__experimentalShowInitialSuggestions: true,
							onChange: function ( value ) { props.setAttributes( { url: value } ); }
						} ),
						el( ToggleControl, {
							label: __( 'Open in new tab', 'bioscope-linked-group' ),
							checked: !!a.opensInNewTab,
							onChange: function ( value ) { props.setAttributes( { opensInNewTab: value } ); }
						} ),
						el( ToggleControl, {
							label: __( 'Add nofollow', 'bioscope-linked-group' ),
							checked: !!a.relNoFollow,
							onChange: function ( value ) { props.setAttributes( { relNoFollow: value } ); }
						} )
					)
				),
				el( BlockControls, {},
					el( ToolbarGroup, {},
						el( ToolbarButton, {
							icon: 'admin-links',
							label: a.url ? __( 'Clear group link', 'bioscope-linked-group' ) : __( 'Set temporary link', 'bioscope-linked-group' ),
							isPressed: !!a.url,
							onClick: function () { props.setAttributes( { url: a.url ? '' : '#' } ); }
						} )
					)
				),
				el( 'div', blockProps,
					el( InnerBlocks, { renderAppender: InnerBlocks.ButtonBlockAppender, templateLock: false } )
				)
			);
		},
		save: function ( props ) {
			const a = props.attributes;
			const blockProps = useBlockProps.save( {
				className: 'bioscope-linked-group',
				'data-bioscope-link': a.url ? 'true' : undefined
			} );
			const rel = [];
			if ( a.opensInNewTab ) rel.push( 'noopener' );
			if ( a.relNoFollow ) rel.push( 'nofollow' );

			return el( 'div', blockProps,
				a.url ? el( 'a', {
					className: 'bioscope-linked-group__overlay',
					href: a.url,
					target: a.opensInNewTab ? '_blank' : undefined,
					rel: rel.length ? rel.join( ' ' ) : undefined,
					'aria-label': __( 'Open linked group', 'bioscope-linked-group' )
				} ) : null,
				el( 'div', { className: 'bioscope-linked-group__content' },
					el( InnerBlocks.Content )
				)
			);
		},
		deprecated: [
			{
				save: function ( props ) {
					const a = props.attributes;
					const linkAttributes = a.url ? {
						role: 'link',
						tabIndex: 0,
						'data-bioscope-link': a.url,
						'data-bioscope-link-target': a.opensInNewTab ? '_blank' : undefined,
						'data-bioscope-link-rel': a.relNoFollow ? 'nofollow' : undefined
					} : {};
					const blockProps = useBlockProps.save( Object.assign(
						{ className: 'bioscope-linked-group' },
						linkAttributes
					) );
					return el( 'div', blockProps, el( InnerBlocks.Content ) );
				},
				migrate: function ( attributes, innerBlocks ) {
					return [ attributes, innerBlocks ];
				}
			},
			{
				save: function ( props ) {
					const a = props.attributes;
					const blockProps = useBlockProps.save( { className: 'bioscope-linked-group' } );
					const content = el( InnerBlocks.Content );

					if ( ! a.url ) {
						return el( 'div', blockProps, content );
					}

					const rel = [];
					if ( a.opensInNewTab ) rel.push( 'noopener' );
					if ( a.relNoFollow ) rel.push( 'nofollow' );

					return el( 'a', Object.assign( {}, blockProps, {
						href: a.url,
						target: a.opensInNewTab ? '_blank' : undefined,
						rel: rel.length ? rel.join( ' ' ) : undefined
					} ), content );
				},
				migrate: function ( attributes, innerBlocks ) {
					return [ attributes, innerBlocks ];
				}
			}
		]
	} );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n );
