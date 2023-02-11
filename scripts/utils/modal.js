/* eslint-disable import/extensions */
import { getKeyboardFocusableElements, setFocusTrap } from "./focus.js";

/**
 * @description Handle form modal creation/deletion for a specified photographer
 * @param {String} photographerName Photographer's name
 */
function modalForm(photographerName) {
  const name = photographerName;

  const { body } = document;
  const content = document.getElementById("js-modal-page");
  const lastOpener = [];

  let isModalOpened = false;

  /**
   * @description Close modal, then remove from DOM and lastly remove event listeners
   */
  function closeModal() {
    isModalOpened = false;

    // Add closing animation then remove Modal from DOM
    const overlay = document.getElementById("js-modal-overlay");
    const modalWrapper = document.getElementById("js-modal");
    if (overlay) {
      window.setTimeout(() => {
        // Add delay for closing animation duration
        overlay.remove();
      }, 400);
    }
    if (modalWrapper) {
      modalWrapper.classList.add("closing");
      window.setTimeout(() => {
        // Add delay for closing animation duration
        modalWrapper.remove();
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
    if (isModalOpened) {
      // Get key pressed
      let keyCode;
      if (event.key !== undefined) {
        keyCode = event.key;
      } else if (event.keyIdentifier !== undefined) {
        keyCode = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
        keyCode = event.keyCode;
      }

      // If modal is opened
      if (scope) {
        // Close modal when escape key is pressed
        if (keyCode === "Escape") {
          closeModal();
        }
      }

      // Set focus trap
      setFocusTrap(event, scope);
    }
  }

  /**
   * @description Handle form Submit by printing values in console, then close Modal
   * @param {SubmitEvent} event Submit form event (to get values)
   */
  function handleFormSubmit(event) {
    // Prevent page reload
    event.preventDefault();

    // Get form values
    const firstInput = document.getElementById("form-firstname");
    const lastInput = document.getElementById("form-lastname");
    const emailInput = document.getElementById("form-email");
    const messageInput = document.getElementById("form-message");
    const formValues = {
      firstname: firstInput.value,
      lastname: lastInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };

    // Log values in console
    console.log(formValues);

    // Close Modal
    closeModal();
  }

  /**
   * @description Create overlay and modal HTML content and inject them as direct children of <body>,
   * save the HTMLElement that triggerd the openning inside a table,
   * add keyboard event listener, add form submit listener,
   * set focus on first focusable element
   * @param {HTMLElement} opener HTML Element that triggered the opening
   */
  function displayModal(opener) {
    // Remove body's scrollbar
    body.classList.add("modal-opened");

    // Prevent screen readers from reading everthing else than the modal
    content.setAttribute("aria-hidden", true);

    // Save modalOpener
    lastOpener.push(opener);

    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.setAttribute("id", "js-modal-overlay");
    modalOverlay.setAttribute("title", "Fermer");
    modalOverlay.setAttribute("data-close", "modal");
    modalOverlay.classList.add("overlay");
    modalOverlay.innerHTML = '<div class="sr-only">Fermer</div>';

    // Create modal
    const modal = document.createElement("div");
    modal.setAttribute("id", "js-modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "modal-header");
    modal.setAttribute("aria-modal", true);
    modal.classList.add("modal__wrapper");

    const modalHeader = `
      <header class="modal__header">
        <h2 id="modal-header">Contactez-moi<br>${name}</h2>
        <button
          type="button"
          class="modal__close"
          title="Fermer"
          data-close="modal"
        >
          <span class="sr-only">Fermer</span>
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </header>
    `;
    const modalBody = `
      <form class="form">
        <div class="form__group">
          <label class="form__label" for="form-firstname">Prénom</label>
          <input
            type="text"
            name="form-firstname"
            id="form-firstname"
            class="form__input"
          />
        </div>
        <div class="form__group">
          <label class="form__label" for="form-lastname">Nom</label>
          <input
            type="text"
            name="form-lastname"
            id="form-lastname"
            class="form__input"
          />
        </div>
        <div class="form__group">
          <label class="form__label" for="form-email">Email</label>
          <input
            type="text"
            name="form-email"
            id="form-email"
            class="form__input"
          />
        </div>
        <div class="form__group">
          <label class="form__label" for="form-message">Votre message</label>
          <textarea
            name="form-message"
            id="form-message"
            class="form__input form__input--textarea"
            rows="6"
          ></textarea>
        </div>
        <button type="submit" class="form__btn">Envoyer</button>
      </form>
    `;

    const modalContent = `
      <div class="modal__content" role="document">
        ${modalHeader + modalBody}
      </div>
    `;
    modal.innerHTML = modalContent;

    // Append Modal Overlay
    body.appendChild(modalOverlay);
    // Append Modal
    body.appendChild(modal);

    // Get Modal wrapper
    const modalWrapper = document.querySelector(".modal__wrapper");

    // Form submission
    modal.querySelector("form").addEventListener("submit", (event) => {
      handleFormSubmit(event);
    });

    // Set focus inside modal
    const focusableElements = getKeyboardFocusableElements(modalWrapper);
    focusableElements[0].focus();

    // Event listener for closers
    const modalClosers = document.querySelectorAll("[data-close='modal']");
    modalClosers.forEach((modalCloser) => {
      modalCloser.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal();
      });
    });

    // Listen to key press
    document.addEventListener("keydown", (event) =>
      keyDownEvent(event, modalWrapper)
    );

    isModalOpened = true;
  }

  return { displayModal };
}

export default modalForm;
