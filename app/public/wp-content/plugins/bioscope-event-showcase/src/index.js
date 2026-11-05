import { registerBlockType } from "@wordpress/blocks";
import metadata from "../block.json";
import imageMetadata from "../image-block.json";
import Edit from "./edit";
import save from "./save";
import ShowcaseImageEdit from "./showcase-image-edit";
import showcaseImageSave from "./showcase-image-save";
import "./style.css";

registerBlockType(metadata.name, {
  edit: Edit,
  save,
});

registerBlockType(imageMetadata.name, {
  edit: ShowcaseImageEdit,
  save: showcaseImageSave,
});
