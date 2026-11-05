import { registerBlockType } from "@wordpress/blocks";
import carouselMetadata from "./carousel/block.json";
import CarouselEdit from "./carousel/edit";
import CarouselSave from "./carousel/save";
import slideMetadata from "./slide/block.json";
import SlideEdit from "./slide/edit";
import SlideSave from "./slide/save";

const carouselIcon = (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1.5 7h3v10h-3zM6 4h12v16H6zM19.5 7h3v10h-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M9 8h6M9 11h6M9 14h4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

const slideIcon = (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7 8h10M7 11h7M7 14h10M7 17h5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

registerBlockType(carouselMetadata, {
  edit: CarouselEdit,
  save: CarouselSave,
  icon: carouselIcon,
});

registerBlockType(slideMetadata, {
  edit: SlideEdit,
  save: SlideSave,
  icon: slideIcon,
});
