import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  Button,
  PanelBody,
  SelectControl,
  TextControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const { imageId, imageUrl = "", alt = "", role = "preview" } = attributes;
  const blockProps = useBlockProps({
    className: `bioscope-gallery-item bioscope-gallery-item--${role}`,
  });

  const onSelectImage = (image) => {
    setAttributes({
      imageId: image.id,
      imageUrl: image.url || image.sizes?.full?.url || "",
      alt: image.alt || "",
    });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__("Showcase image settings", "bioscope-event-showcase")}
          initialOpen
        >
          <SelectControl
            label={__("Image role", "bioscope-event-showcase")}
            value={role}
            options={[
              {
                label: __("Preview image", "bioscope-event-showcase"),
                value: "preview",
              },
              {
                label: __("Thumbnail image", "bioscope-event-showcase"),
                value: "thumbnail",
              },
            ]}
            onChange={(nextRole) => setAttributes({ role: nextRole })}
          />

          <TextControl
            label={__("Image URL (External/Source)", "bioscope-event-showcase")}
            value={imageUrl}
            onChange={(nextUrl) =>
              setAttributes({
                imageUrl: nextUrl,
                imageId: 0,
              })
            }
            placeholder={__(
              "https://example.com/image.jpg",
              "bioscope-event-showcase",
            )}
            help={__(
              "Enter a direct image URL or select from media library below.",
              "bioscope-event-showcase",
            )}
          />
          <TextControl
            label={__("Alternative text", "bioscope-event-showcase")}
            value={alt}
            onChange={(nextAlt) => setAttributes({ alt: nextAlt })}
            help={__(
              "Describe the image for visitors using screen readers.",
              "bioscope-event-showcase",
            )}
          />
          {imageUrl && (
            <Button
              variant="secondary"
              isDestructive
              onClick={() =>
                setAttributes({ imageId: 0, imageUrl: "", alt: "" })
              }
            >
              {__("Remove image", "bioscope-event-showcase")}
            </Button>
          )}
        </PanelBody>
      </InspectorControls>

      <figure {...blockProps}>
        {imageUrl ? (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={["image"]}
              value={imageId}
              render={({ open }) => (
                <Button
                  className="bioscope-gallery-editor-image"
                  onClick={open}
                  label={__(
                    "Replace showcase image",
                    "bioscope-event-showcase",
                  )}
                >
                  <img src={imageUrl} alt={alt} />
                </Button>
              )}
            />
          </MediaUploadCheck>
        ) : (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={["image"]}
              value={imageId}
              render={({ open }) => (
                <Button
                  variant="secondary"
                  onClick={open}
                  className="bioscope-gallery-image-placeholder"
                >
                  {__("Choose showcase image", "bioscope-event-showcase")}
                </Button>
              )}
            />
          </MediaUploadCheck>
        )}
      </figure>
    </>
  );
}
