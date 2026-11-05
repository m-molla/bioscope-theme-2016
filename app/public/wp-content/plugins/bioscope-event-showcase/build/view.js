/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

const createButton = (className, label, content) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", label);
  button.textContent = content;
  return button;
};
const initializeGallery = gallery => {
  if (gallery.dataset.galleryInitialized === "true") {
    return;
  }
  const items = Array.from(gallery.querySelectorAll(".bioscope-gallery-item")).filter(item => item.querySelector(".bioscope-gallery-image")?.src);
  if (items.length === 0) {
    return;
  }
  gallery.dataset.galleryInitialized = "true";
  const previewIndex = Math.max(0, items.findIndex(item => item.dataset.galleryRole === "preview"));
  const previewItem = items[previewIndex];
  const previewImage = previewItem.querySelector(".bioscope-gallery-image");
  const previewButton = previewItem.querySelector(".bioscope-gallery-image-button");
  const sources = items.map(item => {
    const image = item.querySelector(".bioscope-gallery-image");
    return {
      url: image.dataset.fullUrl || image.currentSrc || image.src,
      alt: image.alt
    };
  });
  let currentIndex = previewIndex;
  let lightboxIndex = previewIndex;
  let lightbox = null;
  let lightboxTrigger = previewButton;
  items.forEach((item, index) => {
    item.classList.toggle("is-gallery-preview", item === previewItem);
    item.querySelector(".bioscope-gallery-image-button")?.setAttribute("aria-current", index === currentIndex ? "true" : "false");
  });
  const updatePreview = index => {
    currentIndex = (index + sources.length) % sources.length;
    const source = sources[currentIndex];
    previewImage.src = source.url;
    previewImage.alt = source.alt;
    previewImage.dataset.fullUrl = source.url;
    previewButton.setAttribute("aria-label", source.alt ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open image: %s", "bioscope-event-showcase").replace("%s", source.alt) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open image in lightbox", "bioscope-event-showcase"));
    items.forEach((item, itemIndex) => {
      item.querySelector(".bioscope-gallery-image-button")?.setAttribute("aria-current", itemIndex === currentIndex ? "true" : "false");
    });
  };
  const lightboxImage = document.createElement("img");
  lightboxImage.className = "bioscope-gallery-lightbox-image";
  const updateLightboxImage = () => {
    const source = sources[lightboxIndex];
    lightboxImage.src = source.url;
    lightboxImage.alt = source.alt;
  };
  const closeLightbox = () => {
    if (!lightbox) {
      return;
    }
    document.removeEventListener("keydown", onLightboxKeydown);
    lightbox.remove();
    lightbox = null;
    lightboxTrigger.focus();
  };
  const onLightboxKeydown = event => {
    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft" && sources.length > 1) {
      updateLightbox(lightboxIndex - 1);
    } else if (event.key === "ArrowRight" && sources.length > 1) {
      updateLightbox(lightboxIndex + 1);
    } else if (event.key === "Tab" && lightbox) {
      const focusable = Array.from(lightbox.querySelectorAll("button:not([hidden])"));
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
  const updateLightbox = index => {
    lightboxIndex = (index + sources.length) % sources.length;
    updateLightboxImage();
  };
  const openLightbox = (index, trigger) => {
    if (lightbox) {
      return;
    }
    lightboxIndex = index;
    lightboxTrigger = trigger;
    lightbox = document.createElement("div");
    lightbox.className = "bioscope-gallery-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Image preview", "bioscope-event-showcase"));
    const closeButton = createButton("bioscope-gallery-lightbox-close", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Close image preview", "bioscope-event-showcase"), "×");
    closeButton.addEventListener("click", closeLightbox);
    const navigation = document.createElement("div");
    navigation.className = "bioscope-gallery-lightbox-nav";
    const previousButton = createButton("bioscope-gallery-nav-button bioscope-gallery-prev", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Previous image", "bioscope-event-showcase"), "←");
    const nextButton = createButton("bioscope-gallery-nav-button bioscope-gallery-next", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Next image", "bioscope-event-showcase"), "→");
    previousButton.hidden = sources.length < 2;
    nextButton.hidden = sources.length < 2;
    previousButton.addEventListener("click", () => updateLightbox(lightboxIndex - 1));
    nextButton.addEventListener("click", () => updateLightbox(lightboxIndex + 1));
    navigation.append(previousButton, nextButton);
    lightbox.append(closeButton, lightboxImage, navigation);
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
    document.body.append(lightbox);
    updateLightboxImage();
    closeButton.focus();
    document.addEventListener("keydown", onLightboxKeydown);
  };
  items.forEach((item, index) => {
    const imageButton = item.querySelector(".bioscope-gallery-image-button");
    imageButton?.addEventListener("click", () => {
      if (item === previewItem) {
        openLightbox(currentIndex, imageButton);
      } else {
        openLightbox(index, imageButton);
      }
    });
  });
  const previousButton = previewItem.querySelector(".bioscope-gallery-prev");
  const nextButton = previewItem.querySelector(".bioscope-gallery-next");
  if (previousButton && nextButton) {
    previousButton.hidden = sources.length < 2;
    nextButton.hidden = sources.length < 2;
    previousButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      updatePreview(currentIndex - 1);
    });
    nextButton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      updatePreview(currentIndex + 1);
    });
  }
};
const initializeGalleries = () => {
  document.querySelectorAll(".bioscope-stage-panel").forEach(initializeGallery);
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGalleries, {
    once: true
  });
} else {
  initializeGalleries();
}
})();

/******/ })()
;
//# sourceMappingURL=view.js.map