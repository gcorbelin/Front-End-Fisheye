/* eslint-disable import/extensions */
import { getKeyboardFocusableElements, setFocusTrap } from "./focus.js";

/**
 * @description Handle media lightbox creation/deletion/navigation for a specified mediaId
 * @param {String} mediaId Media's ID
 * @param {Object} photographer Photographer's infos
 * @param {Object} medias Photographer's medias
 */
function lightbox(mediaId, photographer, medias) {
  const defaultMedia = medias.find((m) => m.id === parseInt(mediaId, 10));
  const defaultMediaIndex = medias.indexOf(defaultMedia);
  const { name } = photographer;

  const { body } = document;
  const content = document.getElementById("js-modal-page");
  const lastOpener = [];

  let isLightboxOpened = false;

  /**
   * @description Close lightbox, then remove from DOM and lastly remove event listeners
   */
  function closeLightbox() {
    isLightboxOpened = false;

    // Add closing animation then remove lightbox from DOM
    const overlay = document.getElementById("js-lightbox-overlay");
    const lightboxWrapper = document.getElementById("js-lightbox");
    if (overlay) {
      window.setTimeout(() => {
        // Add delay for closing animation duration
        overlay.remove();
      }, 400);
    }
    if (lightboxWrapper) {
      lightboxWrapper.classList.add("closing");
      window.setTimeout(() => {
        // Add delay for closing animation duration
        lightboxWrapper.remove();
      }, 400);
    }

    // Allow body overflow
    body.classList.remove("modal-opened");

    // Set content accessible to screen readers
    content.removeAttribute("aria-hidden");

    // Set focus back to last opener
    lastOpener[lastOpener.length - 1].focus();
    lastOpener.pop();

    // Remove keyboard listener
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener("keydown", keyDownEvent);
  }

  /**
   * @description Handle keyboard input by listenning to keyboard input to close on 'Escape' key and set a focus trap for tabs
   * @param {KeyboardEvent} event keydown event
   * @param {HTMLElement} scope DOM Node inside which we should trap focus
   */
  function keyDownEvent(event, scope) {
    if (isLightboxOpened) {
      // Get key pressed
      let keyCode;
      if (event.key !== undefined) {
        keyCode = event.key;
      } else if (event.keyIdentifier !== undefined) {
        keyCode = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
        keyCode = event.keyCode;
      }

      // If lightbox is opened
      if (scope) {
        // Close lightbox when escape key is pressed
        if (keyCode === "Escape") {
          closeLightbox();
        }
      }

      // Set focus trap
      setFocusTrap(event, scope);
    }
  }

  /**
   * @description Return lightboxBody DOM with given media index
   * @param {String} mediaIndex Media index of the media to show
   */
  function getLightboxBody(mediaIndex) {
    const index = parseInt(mediaIndex, 10);
    const media = medias[index];
    const lightboxPrev = `
      <div class="lightbox__prev">
        <button type="button" id="js-lightbox-nav-prev" class="js-lightbox-nav lightbox__btn" data-goto="${
          index - 1 < 0 ? medias.length - 1 : index - 1
        }">
          <span class="sr-only">Afficher le média précédent</span>
          <i class="fa fa-chevron-left" aria-hidden="true" title="Afficher le média précédent"></i>
        </button>
      </div>
    `;
    const lightboxNext = `
      <div class="lightbox__Next">
        <button type="button" id="js-lightbox-nav-next" class="js-lightbox-nav lightbox__btn" data-goto="${
          index + 1 > medias.length - 1 ? 0 : index + 1
        }">
          <span class="sr-only">Afficher le média suivant</span>
          <i class="fa fa-chevron-right" aria-hidden="true" title="Afficher le média suivant"></i>
        </button>
      </div>
    `;
    let lightboxMedia = `<div class="lightbox__media" >`;
    if (media.image) {
      lightboxMedia += `
        <img src="/assets/photographers/${name.split(" ")[0]}/${
        media.image
      }" alt="">
        <h2 class="lightbox__title">${media.title}</h2>
      `;
    } else {
      lightboxMedia += `
        <video controls>
          <source src="/assets/photographers/${name.split(" ")[0]}/${
        media.video
      }" type="video/mp4">
        </video>
        <h2 class="lightbox__title">${media.title}</h2>
      `;
    }
    lightboxMedia += `</div>`;
    const lightboxBody = `
      <div class="lightbox__body" id="js-lightbox-media">
        ${lightboxPrev + lightboxMedia + lightboxNext}
      </div>
    `;

    return lightboxBody;
  }

  /**
   * @description Rewrite lightbox body content with new media
   * @param {String} index Media index of the new media
   */
  function goToMedia(index) {
    const lightboxBodyWrapper = document.getElementById("js-lightbox-media");
    const newBody = getLightboxBody(index);
    lightboxBodyWrapper.innerHTML = newBody;
    // eslint-disable-next-line no-use-before-define
    bindNavButton();
  }

  /**
   * @description Bind all nav buttons to the goToMedia function with the right media index on click
   */
  function bindNavButton() {
    const buttons = document.querySelectorAll(".js-lightbox-nav");
    buttons.forEach((btn) => {
      const btnId = btn.getAttribute("id");
      const index = btn.getAttribute("data-goto");
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        goToMedia(index);
        const btnToFocus = document.getElementById(btnId);
        btnToFocus.focus();
      });
    });
  }

  /**
   * @description Create overlay and lighbox HTML content and inject them as direct children of <body>,
   * save the HTMLElement that triggered the openning inside a table,
   * add keyboard event listener, add form submit listener,
   * set focus on first focusable element
   * @param {HTMLElement} opener HTML Element that triggered the opening
   */
  function displayLightbox(opener) {
    // Remove body's scrollbar
    body.classList.add("modal-opened");

    // Prevent screen readers from reading everthing else than the lightbox
    content.setAttribute("aria-hidden", true);

    // Save lightboxOpener
    lastOpener.push(opener);

    // Create lightbox
    const lightboxDOM = document.createElement("dialog");
    lightboxDOM.setAttribute("id", "js-lightbox");
    lightboxDOM.setAttribute("role", "dialog");
    lightboxDOM.setAttribute("aria-label", "Gallerie d'image");
    lightboxDOM.setAttribute("aria-modal", true);
    lightboxDOM.classList.add("lightbox__wrapper");

    const lightboxHeader = `
      <header class="lightbox__header">
        <button
          type="button"
          class="lightbox__btn lightbox__btn--sm"
          title="Fermer"
          data-close="lightbox"
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </header>
    `;
    const lightboxBody = getLightboxBody(defaultMediaIndex);

    const lightboxContent = `
      <div class="lightbox__content" role="document">
        ${lightboxHeader + lightboxBody}
      </div>
    `;
    lightboxDOM.innerHTML = lightboxContent;

    // Append lightbox
    body.appendChild(lightboxDOM);

    // Get lightbox wrapper
    const lightboxWrapper = document.querySelector(".lightbox__wrapper");

    // Set focus inside lightbox
    const focusableElements = getKeyboardFocusableElements(lightboxWrapper);
    focusableElements[0].focus();

    // Event listener for closers
    const lightboxCloser = document.querySelectorAll("[data-close='lightbox']");
    lightboxCloser.forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        closeLightbox();
      });
    });

    // Listen to key press
    document.addEventListener("keydown", (event) =>
      keyDownEvent(event, lightboxWrapper)
    );

    // Listen to button nav click
    bindNavButton();

    isLightboxOpened = true;
  }

  return { displayLightbox };
}

export default lightbox;
