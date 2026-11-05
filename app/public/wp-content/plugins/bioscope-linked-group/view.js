( function () {
	const groupSelector = '[data-bioscope-link]';
	const interactiveSelector = 'a, button, input, select, textarea, summary, [role="button"], [role="link"], [contenteditable="true"]';

	function navigate( group, event ) {
		const link = group.querySelector( ':scope > .bioscope-linked-group__overlay' );
		if ( ! link ) {
			return;
		}

		let destination;
		try {
			destination = new URL( link.href, window.location.href );
		} catch ( error ) {
			return;
		}

		if ( ! [ 'http:', 'https:', 'mailto:', 'tel:' ].includes( destination.protocol ) ) {
			return;
		}

		const openInNewTab = link.target === '_blank' || event.metaKey || event.ctrlKey;
		if ( openInNewTab ) {
			window.open( destination.href, '_blank', 'noopener,noreferrer' );
			return;
		}

		window.location.assign( destination.href );
	}

	document.addEventListener( 'click', function ( event ) {
		if ( event.defaultPrevented || event.button !== 0 ) {
			return;
		}

		const target = event.target instanceof Element ? event.target : null;
		const group = target ? target.closest( groupSelector ) : null;
		if ( ! group || ! group.contains( target ) || target.closest( interactiveSelector ) ) {
			return;
		}

		const selection = window.getSelection();
		if ( selection && ! selection.isCollapsed ) {
			return;
		}

		navigate( group, event );
	} );
} )();
