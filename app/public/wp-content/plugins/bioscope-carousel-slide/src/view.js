import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  A11y,
  Autoplay,
  FreeMode,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

const instances = new WeakMap();

function parseSettings(element) {
  try {
    return JSON.parse(element.getAttribute("data-bioscope-settings") || "{}");
  } catch (error) {
    return {};
  }
}

function getImages(root) {
  return Array.from(root.querySelectorAll(".bioscope-slide img"))
    .filter((img) => img && img.src)
    .map((img) => {
      if (!img.hasAttribute("loading")) {
        img.loading = "lazy";
      }
      if (!img.hasAttribute("decoding")) {
        img.decoding = "async";
      }
      return img;
    });
}

function createArrowIcon(direction) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("bioscope-lightbox__arrow-icon");
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
}

function createLightbox(root, settings, swiper) {
  if (!settings.lightbox) {
    return;
  }

  const images = getImages(root);
  if (!images.length) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "bioscope-lightbox";
  overlay.setAttribute("aria-hidden", "true");

  overlay.innerHTML = `
		<div class="bioscope-lightbox__backdrop" data-bioscope-close></div>
		<div class="bioscope-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Image lightbox">
			<button class="bioscope-lightbox__close" type="button" aria-label="Close lightbox">×</button>
			<button class="bioscope-lightbox__prev" type="button" aria-label="Previous image">‹</button>
			<div class="bioscope-lightbox__media">
				<div class="bioscope-lightbox__swiper swiper">
					<div class="swiper-wrapper"></div>
				</div>
				<div class="bioscope-lightbox__caption"></div>
			</div>
			<button class="bioscope-lightbox__next" type="button" aria-label="Next image">›</button>
			<div class="bioscope-lightbox__counter"></div>
		</div>
	`;

  const swiperElement = overlay.querySelector(".bioscope-lightbox__swiper");
  const swiperWrapper = swiperElement.querySelector(".swiper-wrapper");
  images.forEach((source, index) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const image = document.createElement("img");
    image.className = "bioscope-lightbox__image";
    image.src = source.currentSrc || source.src;
    image.alt = source.alt || "";
    image.loading = "lazy";
    image.draggable = false;

    slide.append(image);
    swiperWrapper.append(slide);
  });

  overlay
    .querySelector(".bioscope-lightbox__prev")
    .replaceChildren(createArrowIcon("previous"));
  overlay
    .querySelector(".bioscope-lightbox__next")
    .replaceChildren(createArrowIcon("next"));

  document.body.appendChild(overlay);

  const captionElement = overlay.querySelector(".bioscope-lightbox__caption");
  const counterElement = overlay.querySelector(".bioscope-lightbox__counter");
  const previousButton = overlay.querySelector(".bioscope-lightbox__prev");
  const nextButton = overlay.querySelector(".bioscope-lightbox__next");
  previousButton.hidden = images.length < 2;
  nextButton.hidden = images.length < 2;

  let current = 0;
  let previousFocus = null;
  let lightboxSwiper = null;

  function loadNearbyImages(index) {
    images.forEach((source, imageIndex) => {
      const forwardDistance =
        (imageIndex - index + images.length) % images.length;
      const backwardDistance =
        (index - imageIndex + images.length) % images.length;
      const distance = Math.min(forwardDistance, backwardDistance);
      swiperWrapper.children[imageIndex].querySelector("img").loading =
        distance <= 1 ? "eager" : "lazy";
    });
  }

  function update(index) {
    current = (index + images.length) % images.length;
    const source = images[current];

    const caption =
      source
        .closest("figure")
        ?.querySelector("figcaption")
        ?.textContent?.trim() || "";

    captionElement.textContent = settings.lightboxCaption ? caption : "";
    captionElement.hidden = !settings.lightboxCaption || !caption;
    counterElement.textContent = `${current + 1} / ${images.length}`;
  }

  function open(index) {
    previousFocus = document.activeElement;
    loadNearbyImages(index);
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("bioscope-lightbox-open");

    if (!lightboxSwiper) {
      lightboxSwiper = new Swiper(swiperElement, {
        initialSlide: index,
        loop: images.length > 1,
        slidesPerView: 1,
        speed: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : 350,
        preventClicks: true,
        preventClicksPropagation: true,
        on: {
          slideChange(swiperInstance) {
            loadNearbyImages(swiperInstance.realIndex);
            update(swiperInstance.realIndex);
          },
        },
      });
    } else {
      lightboxSwiper.slideToLoop(index, 0, false);
    }

    update(index);
    overlay.querySelector(".bioscope-lightbox__close")?.focus();
  }

  function close() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("bioscope-lightbox-open");
    previousFocus?.focus?.();

    if (swiper.autoplay?.running) {
      if (swiper.animating && swiper.wrapperEl.style.transitionDuration === "0ms") {
        swiper.autoplay.stop();
        swiper.setTransition(0);
        swiper.animating = false;
        swiper.slideTo(swiper.activeIndex, 0, false);
        swiper.autoplay.start();
      } else if (swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }
  }

  images.forEach((image, index) => {
    image.style.cursor = "zoom-in";
    image.addEventListener("click", (event) => {
      if (!swiper.allowClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      open(index);
    }, true);
  });

  overlay
    .querySelector(".bioscope-lightbox__close")
    .addEventListener("click", close);
  overlay
    .querySelector("[data-bioscope-close]")
    .addEventListener("click", close);
  overlay
    .querySelector(".bioscope-lightbox__dialog")
    .addEventListener("click", (event) => {
      if (
        event.target === event.currentTarget ||
        event.target === overlay.querySelector(".bioscope-lightbox__media")
      ) {
        close();
      }
    });
  overlay
    .querySelector(".bioscope-lightbox__prev")
    .addEventListener("click", () => lightboxSwiper?.slidePrev());
  overlay
    .querySelector(".bioscope-lightbox__next")
    .addEventListener("click", () => lightboxSwiper?.slideNext());

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      close();
    }

    if (event.key === "ArrowLeft") {
      lightboxSwiper?.slidePrev();
    }

    if (event.key === "ArrowRight") {
      lightboxSwiper?.slideNext();
    }
  });
}

function initCarousel(root) {
  if (instances.has(root)) {
    return;
  }

  const settings = parseSettings(root);
  const speed = Number(settings.speed ?? 500);
  const transitionSpeed =
    root.closest(".captured-moment-section") && settings.autoplay
      ? Math.min(speed, 8500)
      : speed;
  const track = root.querySelector(".bioscope-carousel__track");

  if (!track) {
    return;
  }

  const slides = Array.from(track.children);

  if (!slides.length) {
    return;
  }

  getImages(root);
  track.classList.add("swiper-wrapper");
  slides.forEach((slide) => slide.classList.add("swiper-slide"));

  root.classList.add("bioscope-carousel--initialized");

  const modules = [
    Navigation,
    Pagination,
    Scrollbar,
    Autoplay,
    FreeMode,
    Keyboard,
    Mousewheel,
    A11y,
  ];

  const swiper = new Swiper(
    root.querySelector(".bioscope-carousel__viewport"),
    {
      modules,
      slidesPerView: Number(settings.slidesPerViewMobile) || 1,
      spaceBetween: Number(settings.spaceMobile) || 0,
      speed: transitionSpeed,
      initialSlide: Number(settings.initialSlide) || 0,
      loop: Boolean(settings.loop || settings.autoplay),
      freeMode: settings.autoplay ? { enabled: true, momentum: false } : false,
      centeredSlides: Boolean(settings.centeredSlides),
      autoHeight: Boolean(settings.autoHeight),
      direction: settings.direction === "vertical" ? "vertical" : "horizontal",
      grabCursor: Boolean(settings.grabCursor),
      keyboard: {
        enabled: Boolean(settings.keyboard),
      },
      mousewheel: Boolean(settings.mousewheel),
      navigation: settings.navigation
        ? {
            nextEl: root.querySelector(".bioscope-carousel__next"),
            prevEl: root.querySelector(".bioscope-carousel__prev"),
          }
        : false,
      pagination: settings.pagination
        ? {
            el: root.querySelector(".bioscope-carousel__pagination"),
            clickable: true,
          }
        : false,
      scrollbar: settings.scrollbar
        ? {
            el: root.querySelector(".bioscope-carousel__scrollbar"),
            draggable: true,
          }
        : false,
      autoplay: settings.autoplay
        ? {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }
        : false,
      breakpoints: {
        768: {
          slidesPerView: Number(settings.slidesPerViewTablet) || 2,
          spaceBetween: Number(settings.spaceTablet) || 0,
        },
        1024: {
          slidesPerView: Number(settings.slidesPerViewDesktop) || 3,
          spaceBetween: Number(settings.spaceDesktop) || 0,
        },
      },
    },
  );

  const pagination = root.querySelector(".bioscope-carousel__pagination");
  if (settings.pagination && pagination) {
    let paginationSpeedTimeout;

    pagination.addEventListener(
      "click",
      (event) => {
        if (!event.target.closest(".swiper-pagination-bullet")) {
          return;
        }

        window.clearTimeout(paginationSpeedTimeout);
        swiper.params.speed = Math.min(transitionSpeed, 600);
        paginationSpeedTimeout = window.setTimeout(() => {
          swiper.params.speed = transitionSpeed;
        }, 650);
      },
      true,
    );
  }

  if (settings.autoplay) {
    let dragged = false;

    swiper.on("sliderFirstMove", () => {
      dragged = true;
    });

    swiper.on("touchEnd", () => {
      if (!dragged) {
        return;
      }

      dragged = false;
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      }
      swiper.autoplay.start();
    });
  }

  instances.set(root, swiper);
  createLightbox(root, settings, swiper);
}

function init() {
  document
    .querySelectorAll(".bioscope-carousel[data-bioscope-settings]")
    .forEach(initCarousel);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
