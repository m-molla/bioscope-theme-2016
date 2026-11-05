import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes }) {
  const { layoutDirection = "row" } = attributes;
  const blockProps = useBlockProps({
    className: `bioscope-stage-panel layout-dir-${layoutDirection}`,
  });

  return (
    <div {...blockProps}>
      <InnerBlocks />
      <p className="bioscope-stage-panel-help">
        {__(
          "Add image blocks for your gallery, and use Group or Columns blocks to arrange them.",
          "bioscope-event-showcase",
        )}
      </p>
    </div>
  );
}
