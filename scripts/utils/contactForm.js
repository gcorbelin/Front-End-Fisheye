const { body } = document;
const content = document.getElementById("js-modal-page");
const overlay = document.getElementById("js-modal-overlay");
const modal = document.getElementById("js-modal");
const modalCloser = document.querySelectorAll("[data-close='modal']");

const lastOpener = [];

/**
 * Gets keyboard-focusable elements within a specified element
 * @param {HTMLElement} [element=document] element
 * @returns {Array}
 */
function getKeyboardFocusableElements(element = document) {
  return [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    ),
  ].filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
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
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", false);
  // Set focus inside modal
  const focusableElements = getKeyboardFocusableElements(modal);
  focusableElements[0].focus();
  // Save modalOpener
  lastOpener.push(opener);
}

/**
 * Hide modal
 */
function closeModal() {
  // Hide modal
  modal.classList.remove("closing");
  modal.setAttribute("aria-hidden", true);
  modal.style.display = "none";
  // Hide overlay
  overlay.style.display = "none";
  // Revert body's state
  body.classList.remove("modal-opened");
  // Set content accessible to screen readers
  content.removeAttribute("aria-hidden");
  // Set focus back to last opener
  lastOpener[lastOpener.length - 1].focus();
  lastOpener.pop();
}

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

  const focusableElements = getKeyboardFocusableElements(modal);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  // If modal is opened
  if (modal.getAttribute("aria-hidden") === "false") {
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

// Event listener for closers
modalCloser.forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
  });
});

function validate(event) {
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
}
