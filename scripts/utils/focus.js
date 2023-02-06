/**
 * Gets keyboard-focusable elements within a specified element
 * @param {HTMLElement} [scope=document] DOM scope
 * @returns {Array}
 */
function getKeyboardFocusableElements(scope = document) {
  return [
    ...scope.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    ),
  ].filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

/**
 * Set a focus trap inside scope
 * @param {KeyboardEvent} event Keydown event
 * @param {HTMLElement} [scope=document] DOM scope
 */
function setFocusTrap(event, scope = document) {
  // Get all/first/last focusable elements inside modal
  const focusableElements = getKeyboardFocusableElements(scope);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  // Get key pressed
  let keyCode;
  if (event.key !== undefined) {
    keyCode = event.key;
  } else if (event.keyIdentifier !== undefined) {
    keyCode = event.keyIdentifier;
  } else if (event.keyCode !== undefined) {
    keyCode = event.keyCode;
  }

  // Focus trap
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
