import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  Button,
  ColorPalette,
  PanelBody,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, setAttributes }) {
  const { backgroundColor, backgroundImage, backgroundOverlay } = attributes;

  const blockProps = useBlockProps({
    className: "bioscope-slide",
    style: {
      backgroundColor: backgroundColor || undefined,
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      backgroundSize: backgroundImage ? "cover" : undefined,
      backgroundPosition: backgroundImage ? "center" : undefined,
    },
  });

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__("Slide Background", "bioscope-carousel-slide")}
          initialOpen
        >
          <p>
            {__("Optional slide background color.", "bioscope-carousel-slide")}
          </p>
          <ColorPalette
            value={backgroundColor}
            onChange={(value) =>
              setAttributes({ backgroundColor: value || "" })
            }
          />

          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) =>
                setAttributes({ backgroundImage: media?.url || "" })
              }
              allowedTypes={["image"]}
              render={({ open }) => (
                <div style={{ marginTop: "12px" }}>
                  <Button variant="secondary" onClick={open}>
                    {backgroundImage
                      ? __("Change background image", "bioscope-carousel-slide")
                      : __(
                          "Choose background image",
                          "bioscope-carousel-slide",
                        )}
                  </Button>
                  {backgroundImage && (
                    <Button
                      variant="link"
                      isDestructive
                      onClick={() => setAttributes({ backgroundImage: "" })}
                      style={{
                        display: "block",
                        marginTop: "8px",
                        backgroundColor: "red",
                      }}
                    >
                      {__("Remove background image", "bioscope-carousel-slide")}
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>

          {backgroundImage && (
            <RangeControl
              label={__(
                "Background overlay opacity",
                "bioscope-carousel-slide",
              )}
              value={backgroundOverlay}
              onChange={(value) =>
                setAttributes({ backgroundOverlay: value || 0 })
              }
              min={0}
              max={100}
              step={5}
            />
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {backgroundImage && backgroundOverlay > 0 && (
          <div
            className="bioscope-slide__overlay"
            style={{ opacity: backgroundOverlay / 100 }}
            aria-hidden="true"
          />
        )}

        <div className="bioscope-slide__content">
          <InnerBlocks renderAppender={InnerBlocks.ButtonBlockAppender} />
        </div>
      </div>
    </>
  );
}
