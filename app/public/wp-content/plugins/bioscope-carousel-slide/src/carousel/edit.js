import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import {
  Button,
  Notice,
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { plus } from "@wordpress/icons";

const ALLOWED_BLOCKS = ["bioscope/slide"];

const TEMPLATE = [["bioscope/slide"]];

function getPreviewSlideWidth(slides, gap) {
  const count = Math.max(1, Number(slides) || 1);
  const totalGap = Math.max(0, Number(gap) || 0) * (count - 1);
  return `calc((100% - ${totalGap}px) / ${count})`;
}

function NumberControl({ label, value, onChange, min = 0, max = 20 }) {
  return (
    <RangeControl
      label={label}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={1}
    />
  );
}

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    slidesPerViewDesktop,
    slidesPerViewTablet,
    slidesPerViewMobile,
    spaceDesktop,
    spaceTablet,
    spaceMobile,
    speed,
    initialSlide,
    loop,
    centeredSlides,
    autoHeight,
    direction,
    navigation,
    pagination,
    scrollbar,
    autoplay,
    autoplayDelay,
    pauseOnMouseEnter,
    disableOnInteraction,
    keyboard,
    mousewheel,
    grabCursor,
    lightbox,
    lightboxCaption,
  } = attributes;
  const { insertBlock } = useDispatch("core/block-editor");
  const slideCount = useSelect(
    (select) => select("core/block-editor").getBlockCount(clientId),
    [clientId],
  );

  const addSlide = () => {
    insertBlock(createBlock("bioscope/slide"), slideCount, clientId);
  };

  const blockProps = useBlockProps({
    className: "bioscope-carousel-editor-preview",
    style: {
      "--bioscope-preview-slide-desktop": getPreviewSlideWidth(
        slidesPerViewDesktop,
        spaceDesktop,
      ),
      "--bioscope-preview-slide-tablet": getPreviewSlideWidth(
        slidesPerViewTablet,
        spaceTablet,
      ),
      "--bioscope-preview-slide-mobile": getPreviewSlideWidth(
        slidesPerViewMobile,
        spaceMobile,
      ),
      "--bioscope-preview-gap-desktop": `${spaceDesktop}px`,
      "--bioscope-preview-gap-tablet": `${spaceTablet}px`,
      "--bioscope-preview-gap-mobile": `${spaceMobile}px`,
    },
  });

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__("Slides & Responsive", "bioscope-carousel-slide")}
          initialOpen
        >
          <Notice status="info" isDismissible={false}>
            {__(
              "Each slide can contain any Gutenberg block.",
              "bioscope-carousel-slide",
            )}
          </Notice>

          <NumberControl
            label={__("Slides per view — Desktop", "bioscope-carousel-slide")}
            value={slidesPerViewDesktop}
            onChange={(value) =>
              setAttributes({ slidesPerViewDesktop: value || 1 })
            }
            min={1}
            max={12}
          />
          <NumberControl
            label={__("Slides per view — Tablet", "bioscope-carousel-slide")}
            value={slidesPerViewTablet}
            onChange={(value) =>
              setAttributes({ slidesPerViewTablet: value || 1 })
            }
            min={1}
            max={12}
          />
          <NumberControl
            label={__("Slides per view — Mobile", "bioscope-carousel-slide")}
            value={slidesPerViewMobile}
            onChange={(value) =>
              setAttributes({ slidesPerViewMobile: value || 1 })
            }
            min={1}
            max={6}
          />

          <NumberControl
            label={__("Gap — Desktop (px)", "bioscope-carousel-slide")}
            value={spaceDesktop}
            onChange={(value) => setAttributes({ spaceDesktop: value || 0 })}
            min={0}
            max={100}
          />
          <NumberControl
            label={__("Gap — Tablet (px)", "bioscope-carousel-slide")}
            value={spaceTablet}
            onChange={(value) => setAttributes({ spaceTablet: value || 0 })}
            min={0}
            max={100}
          />
          <NumberControl
            label={__("Gap — Mobile (px)", "bioscope-carousel-slide")}
            value={spaceMobile}
            onChange={(value) => setAttributes({ spaceMobile: value || 0 })}
            min={0}
            max={100}
          />
        </PanelBody>

        <PanelBody
          title={__("Swiper Behaviour", "bioscope-carousel-slide")}
          initialOpen={false}
        >
          <NumberControl
            label={__("Transition speed (ms)", "bioscope-carousel-slide")}
            value={speed}
            onChange={(value) => setAttributes({ speed: value ?? 500 })}
            min={0}
            max={10000}
          />
          <NumberControl
            label={__("Initial slide", "bioscope-carousel-slide")}
            value={initialSlide}
            onChange={(value) => setAttributes({ initialSlide: value || 0 })}
            min={0}
            max={100}
          />
          <SelectControl
            label={__("Direction", "bioscope-carousel-slide")}
            value={direction}
            options={[
              {
                label: __("Horizontal", "bioscope-carousel-slide"),
                value: "horizontal",
              },
              {
                label: __("Vertical", "bioscope-carousel-slide"),
                value: "vertical",
              },
            ]}
            onChange={(value) => setAttributes({ direction: value })}
          />
          <ToggleControl
            label={__("Loop", "bioscope-carousel-slide")}
            checked={loop}
            onChange={(value) => setAttributes({ loop: value })}
          />
          <ToggleControl
            label={__("Centered slides", "bioscope-carousel-slide")}
            checked={centeredSlides}
            onChange={(value) => setAttributes({ centeredSlides: value })}
          />
          <ToggleControl
            label={__("Auto height", "bioscope-carousel-slide")}
            checked={autoHeight}
            onChange={(value) => setAttributes({ autoHeight: value })}
          />
          <ToggleControl
            label={__("Grab cursor", "bioscope-carousel-slide")}
            checked={grabCursor}
            onChange={(value) => setAttributes({ grabCursor: value })}
          />
          <ToggleControl
            label={__("Keyboard control", "bioscope-carousel-slide")}
            checked={keyboard}
            onChange={(value) => setAttributes({ keyboard: value })}
          />
          <ToggleControl
            label={__("Mouse wheel", "bioscope-carousel-slide")}
            checked={mousewheel}
            onChange={(value) => setAttributes({ mousewheel: value })}
          />
        </PanelBody>

        <PanelBody
          title={__("Navigation", "bioscope-carousel-slide")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Arrows", "bioscope-carousel-slide")}
            checked={navigation}
            onChange={(value) => setAttributes({ navigation: value })}
          />
          <ToggleControl
            label={__("Pagination dots", "bioscope-carousel-slide")}
            checked={pagination}
            onChange={(value) => setAttributes({ pagination: value })}
          />
          <ToggleControl
            label={__("Scrollbar", "bioscope-carousel-slide")}
            checked={scrollbar}
            onChange={(value) => setAttributes({ scrollbar: value })}
          />
        </PanelBody>

        <PanelBody
          title={__("Autoplay", "bioscope-carousel-slide")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Enable autoplay", "bioscope-carousel-slide")}
            checked={autoplay}
            onChange={(value) => setAttributes({ autoplay: value })}
          />
        </PanelBody>

        <PanelBody
          title={__("Image Lightbox", "bioscope-carousel-slide")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Enable image lightbox", "bioscope-carousel-slide")}
            checked={lightbox}
            onChange={(value) => setAttributes({ lightbox: value })}
          />
          {lightbox && (
            <ToggleControl
              label={__("Show image captions", "bioscope-carousel-slide")}
              checked={lightboxCaption}
              onChange={(value) => setAttributes({ lightboxCaption: value })}
            />
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className={`bioscope-carousel bioscope-carousel--${direction}`}>
          <div className="bioscope-carousel__viewport">
            <div className="bioscope-carousel__track">
              <InnerBlocks
                allowedBlocks={ALLOWED_BLOCKS}
                template={TEMPLATE}
                orientation={
                  direction === "horizontal" ? "horizontal" : "vertical"
                }
                renderAppender={() => null}
              />
            </div>
          </div>

          <div className="bioscope-carousel__editor-actions">
            <Button
              variant="secondary"
              icon={plus}
              className="bioscope-carousel__add-slide"
              onClick={addSlide}
            >
              {__("Add slide", "bioscope-carousel-slide")}
            </Button>
          </div>

          {navigation && (
            <>
              <button
                className="bioscope-carousel__prev"
                type="button"
                aria-label={__("Previous slide", "bioscope-carousel-slide")}
                disabled
              >
                ←
              </button>
              <button
                className="bioscope-carousel__next"
                type="button"
                aria-label={__("Next slide", "bioscope-carousel-slide")}
                disabled
              >
                →
              </button>
            </>
          )}
          {pagination && (
            <div className="bioscope-carousel__pagination" aria-hidden="true" />
          )}
          {scrollbar && (
            <div className="bioscope-carousel__scrollbar" aria-hidden="true" />
          )}
        </div>
      </div>
    </>
  );
}
