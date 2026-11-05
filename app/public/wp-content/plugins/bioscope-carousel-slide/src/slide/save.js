import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		backgroundColor,
		backgroundImage,
		backgroundOverlay,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'bioscope-slide',
		style: {
			backgroundColor: backgroundColor || undefined,
			backgroundImage: backgroundImage ? `url(${ backgroundImage })` : undefined,
			backgroundSize: backgroundImage ? 'cover' : undefined,
			backgroundPosition: backgroundImage ? 'center' : undefined,
		},
	});

	return (
		<div { ...blockProps }>
			{ backgroundImage && backgroundOverlay > 0 && (
				<div
					className="bioscope-slide__overlay"
					style={{ opacity: backgroundOverlay / 100 }}
					aria-hidden="true"
				/>
			) }
			<div className="bioscope-slide__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
