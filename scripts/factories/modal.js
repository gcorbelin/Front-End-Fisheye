/* global getKeyboardFocusableElements */

function modalFactory(photographer) {
  const { name } = photographer;

  const { body } = document;
  const content = document.getElementById("js-modal-page");
  const modalWrapper = document.getElementById("js-modal");
  const overlay = document.getElementById("js-modal-overlay");
  const lastOpener = [];

  /**
   * Hide modal
   */
  function closeModal() {
    // Hide modal
    modalWrapper.setAttribute("aria-hidden", true);
    modalWrapper.style.display = "none";
    // Hide overlay
    overlay.style.display = "none";
    // Revert body's state
    body.classList.remove("modal-opened");
    // Set content accessible to screen readers
    content.removeAttribute("aria-hidden");
    // Set focus back to last opener
    lastOpener[lastOpener.length - 1].focus();
    lastOpener.pop();
    modalWrapper.querySelector(".modal__body").remove();
  }

  /**
   * Handle form submit
   * @param event Form values
   */
  function handleFormSubmit(event) {
    event.preventDefault();
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
    console.log(formValues);
    closeModal();
  }

  /**
   * Handle keyboard input
   */
  function handleKeyDown() {
    // Listen to key press
    document.addEventListener("keydown", (event) => {
      let keyCode;
      if (event.key !== undefined) {
        keyCode = event.key;
      } else if (event.keyIdentifier !== undefined) {
        keyCode = event.keyIdentifier;
      } else if (event.keyCode !== undefined) {
        keyCode = event.keyCode;
      }

      const focusableElements = getKeyboardFocusableElements(modalWrapper);
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      // If modal is opened
      if (modalWrapper.getAttribute("aria-hidden") === "false") {
        // Close modal when escape key is pressed
        if (keyCode === "Escape") {
          closeModal();
        }

        if (keyCode === "Tab") {
          if (event.shiftKey) {
            // Shift + TAB
            if (document.activeElement === firstFocusableElement) {
              // Go back to last focusable element
              lastFocusableElement.focus();
              event.preventDefault();
            }
          } else if (document.activeElement === lastFocusableElement) {
            // Go back to first focusable element
            firstFocusableElement.focus();
            event.preventDefault();
          }
        }
      }
    });
  }

  /**
   * Show modal
   * @param {HTMLElement} opener HTML Element that tgriggered the opening
   */
  function displayModal(opener) {
    // Remove body's scrollbar
    body.classList.add("modal-opened");
    // Prevent screen readers from reading everthing else than the modal
    content.setAttribute("aria-hidden", true);
    // Show overlay
    overlay.style.display = "block";
    // Show modal
    modalWrapper.style.display = "block";
    modalWrapper.setAttribute("aria-hidden", false);
    // Save modalOpener
    lastOpener.push(opener);

    const modal = document.createElement("div");
    modal.classList.add("modal__body");
    modal.setAttribute("role", "document");

    const modalHeader = `
      <header class="modal__header">
        <h2 id="modal-header">Contactez-moi<br>${name}</h2>
        <button
          type="button"
          class="modal__close"
          title="Fermer"
          data-close="modal"
        >
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

    const modalContent = modalHeader + modalBody;
    modal.innerHTML = modalContent;

    modalWrapper.appendChild(modal);

    // Form submission
    modal.querySelector("form").addEventListener("submit", (event) => {
      handleFormSubmit(event);
    });

    // Set focus inside modal
    const focusableElements = getKeyboardFocusableElements(modalWrapper);
    focusableElements[0].focus();

    // Event listener for closers
    const modalCloser = document.querySelectorAll("[data-close='modal']");
    modalCloser.forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal();
      });
    });

    handleKeyDown();
  }

  return { displayModal, closeModal };
}
