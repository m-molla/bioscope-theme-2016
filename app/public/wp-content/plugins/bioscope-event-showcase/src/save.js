import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { layoutDirection = "column" } = attributes;
  const blockProps = useBlockProps.save({
    className: `bioscope-stage-panel layout-dir-${layoutDirection}`,
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}
