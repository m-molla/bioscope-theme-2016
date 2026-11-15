import Swiper from "swiper";
import "swiper/css";
import { __ } from "@wordpress/i18n";

const createButton = (className, label, content) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", label);
  button.textContent = content;
  return button;
};

const createArrowIcon = (direction) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("bioscope-gallery-arrow-icon");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    direction === "previous"
      ? "M21 12H3m0 0 8-8m-8 8 8 8"
      : "M3 12h18m0 0-8-8m8 8-8 8",
  );
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "1.7");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.append(path);

  return svg;
};

const createArrowButton = (className, label, direction) => {
  const button = createButton(className, label, "");
  button.append(createArrowIcon(direction));
  return button;
};

const initializeGallery = (gallery) => {
  if (gallery.dataset.galleryInitialized === "true") {
    return;
  }

  const items = Array.from(
    gallery.querySelectorAll(".bioscope-gallery-item"),
  ).filter((item) => item.querySelector(".bioscope-gallery-image")?.src);

  if (items.length === 0) {
    return;
  }

  const previewIndex = Math.max(
    0,
    items.findIndex((item) => item.dataset.galleryRole === "preview"),
  );
  const previewItem = items[previewIndex];
  const previewButton = previewItem.querySelector(
    ".bioscope-gallery-image-button",
  );
  const previewImage = previewItem.querySelector(".bioscope-gallery-image");
  const previewFrame = previewButton.getBoundingClientRect();
  const imageWidth = previewImage.naturalWidth || previewImage.width;
  const imageHeight = previewImage.naturalHeight || previewImage.height;
  const itemAspectRatio = getComputedStyle(previewItem).aspectRatio;
  if (itemAspectRatio !== "auto") {
    previewButton.style.aspectRatio = itemAspectRatio;
  } else if (previewFrame.width > 0 && previewFrame.height > 0) {
    previewButton.style.aspectRatio = `${previewFrame.width} / ${previewFrame.height}`;
  } else if (imageWidth > 0 && imageHeight > 0) {
    previewButton.style.aspectRatio = `${imageWidth} / ${imageHeight}`;
  }
  const sources = items.map((item) => {
    const image = item.querySelector(".bioscope-gallery-image");
    return {
      url: image.dataset.fullUrl || image.currentSrc || image.src,
      alt: image.alt,
    };
  });
  let currentIndex = previewIndex;
  let previewSwiper = null;
  let lightbox = null;
  let lightboxSwiper = null;
  let lightboxTrigger = previewButton;

  items.forEach((item) => {
    item.classList.toggle("is-gallery-preview", item === previewItem);
  });

  const updatePreviewState = (index) => {
    currentIndex = index;
    const source = sources[currentIndex];
    previewButton.setAttribute(
      "aria-label",
      source.alt
        ? __("Open image: %s", "bioscope-event-showcase").replace(
            "%s",
            source.alt,
          )
        : __("Open image in lightbox", "bioscope-event-showcase"),
    );

    items.forEach((item, itemIndex) => {
      item
        .querySelector(".bioscope-gallery-image-button")
        ?.setAttribute(
          "aria-current",
          itemIndex === currentIndex ? "true" : "false",
        );
    });
  };

  const previewWrapper = document.createElement("span");
  previewWrapper.className = "swiper-wrapper";

  sources.forEach((source) => {
    const slide = document.createElement("span");
    slide.className = "swiper-slide";

    const image = document.createElement("img");
    image.className = "bioscope-gallery-image";
    image.src = source.url;
    image.alt = source.alt;
    image.draggable = false;

    slide.append(image);
    previewWrapper.append(slide);
  });

  previewButton.replaceChildren(previewWrapper);
  previewButton.classList.add("swiper", "bioscope-gallery-preview-swiper");

  previewSwiper = new Swiper(previewButton, {
    initialSlide: previewIndex,
    loop: sources.length > 1,
    slidesPerView: 1,
    speed: 420,
    preventClicks: true,
    preventClicksPropagation: true,
    on: {
      slideChange(swiper) {
        updatePreviewState(swiper.realIndex);
      },
    },
  });
  const initialPreviewImage = previewButton.querySelector(
    ".swiper-slide-active .bioscope-gallery-image",
  );
  const setPreviewAspectRatioFromImage = () => {
    if (
      previewButton.style.aspectRatio ||
      !initialPreviewImage.naturalWidth ||
      !initialPreviewImage.naturalHeight
    ) {
      return;
    }

    const { naturalWidth, naturalHeight } = initialPreviewImage;
    previewButton.style.aspectRatio = `${naturalWidth} / ${naturalHeight}`;
    previewSwiper.update();
  };
  if (initialPreviewImage.complete) {
    setPreviewAspectRatioFromImage();
  } else {
    initialPreviewImage.addEventListener(
      "load",
      setPreviewAspectRatioFromImage,
      { once: true },
    );
  }
  updatePreviewState(previewIndex);

  const closeLightbox = () => {
    if (!lightbox) {
      return;
    }

    document.removeEventListener("keydown", onLightboxKeydown);
    lightboxSwiper?.destroy(true, true);
    lightboxSwiper = null;
    lightbox.remove();
    lightbox = null;
    lightboxTrigger.focus();
  };

  const onLightboxKeydown = (event) => {
    if (!lightbox) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft" && sources.length > 1) {
      lightboxSwiper.slidePrev();
    } else if (event.key === "ArrowRight" && sources.length > 1) {
      lightboxSwiper.slideNext();
    } else if (event.key === "Tab") {
      const focusable = Array.from(
        lightbox.querySelectorAll("button:not([hidden])"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const openLightbox = (index, trigger) => {
    if (lightbox) {
      return;
    }

    lightboxTrigger = trigger;
    lightbox = document.createElement("div");
    lightbox.className = "bioscope-gallery-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute(
      "aria-label",
      __("Image preview", "bioscope-event-showcase"),
    );

    const closeButton = createButton(
      "bioscope-gallery-lightbox-close",
      __("Close image preview", "bioscope-event-showcase"),
      "×",
    );
    closeButton.addEventListener("click", closeLightbox);

    const swiperElement = document.createElement("div");
    swiperElement.className = "bioscope-gallery-lightbox-swiper swiper";
    const swiperWrapper = document.createElement("div");
    swiperWrapper.className = "swiper-wrapper";

    sources.forEach((source) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const image = document.createElement("img");
      image.className = "bioscope-gallery-lightbox-image";
      image.src = source.url;
      image.alt = source.alt;
      image.draggable = false;

      slide.append(image);
      swiperWrapper.append(slide);
    });

    swiperElement.append(swiperWrapper);

    const navigation = document.createElement("div");
    navigation.className = "bioscope-gallery-lightbox-nav";
    const previousButton = createArrowButton(
      "bioscope-gallery-nav-button bioscope-gallery-prev",
      __("Previous image", "bioscope-event-showcase"),
      "previous",
    );
    const nextButton = createArrowButton(
      "bioscope-gallery-nav-button bioscope-gallery-next",
      __("Next image", "bioscope-event-showcase"),
      "next",
    );
    previousButton.hidden = sources.length < 2;
    nextButton.hidden = sources.length < 2;
    previousButton.addEventListener("click", () => lightboxSwiper.slidePrev());
    nextButton.addEventListener("click", () => lightboxSwiper.slideNext());
    navigation.append(previousButton, nextButton);

    lightbox.append(closeButton, swiperElement, navigation);
    lightbox.addEventListener("click", (event) => {
      if (
        event.target === lightbox ||
        event.target === swiperElement ||
        event.target === swiperWrapper ||
        event.target.classList?.contains("swiper-slide")
      ) {
        closeLightbox();
      }
    });
    document.body.append(lightbox);

    lightboxSwiper = new Swiper(swiperElement, {
      initialSlide: index,
      loop: sources.length > 1,
      slidesPerView: 1,
      speed: 350,
      preventClicks: true,
      preventClicksPropagation: true,
    });

    closeButton.focus();
    document.addEventListener("keydown", onLightboxKeydown);
  };

  items.forEach((item, index) => {
    const imageButton = item.querySelector(".bioscope-gallery-image-button");
    imageButton?.addEventListener("click", (event) => {
      if (item === previewItem && !previewSwiper.allowClick) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      openLightbox(
        item === previewItem ? currentIndex : index,
        imageButton,
      );
    });
  });

  const previousButton = previewItem.querySelector(".bioscope-gallery-prev");
  const nextButton = previewItem.querySelector(".bioscope-gallery-next");
  if (previousButton && nextButton) {
    previousButton.replaceChildren(createArrowIcon("previous"));
    nextButton.replaceChildren(createArrowIcon("next"));
    previousButton.hidden = sources.length < 2;
    nextButton.hidden = sources.length < 2;
    previousButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      previewSwiper.slidePrev();
    });
    nextButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      previewSwiper.slideNext();
    });
  }

  gallery.dataset.galleryInitialized = "true";
};

const initializeGalleries = () => {
  document.querySelectorAll(".bioscope-stage-panel").forEach(initializeGallery);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGalleries, {
    once: true,
  });
} else {
  initializeGalleries();
}
