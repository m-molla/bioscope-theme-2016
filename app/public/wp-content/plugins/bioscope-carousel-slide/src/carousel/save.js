import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: 'bioscope-carousel',
	});

	return (
		<div { ...blockProps }>
			<div className="bioscope-carousel__viewport">
				<div className="bioscope-carousel__track">
					<InnerBlocks.Content />
				</div>
			</div>

			<button className="bioscope-carousel__prev" type="button" aria-label="Previous slide">
				<span aria-hidden="true">←</span>
			</button>
			<button className="bioscope-carousel__next" type="button" aria-label="Next slide">
				<span aria-hidden="true">→</span>
			</button>

			<div className="bioscope-carousel__pagination" aria-label="Carousel pagination"></div>
			<div className="bioscope-carousel__scrollbar" aria-hidden="true"></div>
		</div>
	);
}
