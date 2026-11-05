import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function save({ attributes }) {
  const { imageUrl = "", alt = "", role = "preview" } = attributes;

  if (!imageUrl) {
    return null;
  }

  const blockProps = useBlockProps.save({
    className: `bioscope-gallery-item bioscope-gallery-item--${role}`,
    "data-gallery-role": role,
  });

  return (
    <figure {...blockProps}>
      <button
        className="bioscope-gallery-image-button"
        type="button"
        aria-label={__("Open image in lightbox", "bioscope-event-showcase")}
      >
        <img
          className="bioscope-gallery-image"
          src={imageUrl}
          alt={alt}
          data-full-url={imageUrl}
        />
      </button>
      {role === "preview" && (
        <div className="bioscope-gallery-nav">
          <button
            className="bioscope-gallery-nav-button bioscope-gallery-prev"
            type="button"
            aria-label={__("Previous image", "bioscope-event-showcase")}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className="bioscope-gallery-nav-button bioscope-gallery-next"
            type="button"
            aria-label={__("Next image", "bioscope-event-showcase")}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </figure>
  );
}
