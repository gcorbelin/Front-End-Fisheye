function displayModal() {
  const { body } = document;
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  body.classList.add("modal-opened");
  modal.classList.replace("hide", "show");
}

function closeModal() {
  const { body } = document;
  const modal = document.getElementById("contact_modal");
  const modalContent = document.querySelector(".modal__wrapper");
  modalContent.classList.add("closing");
  window.setTimeout(() => {
    modal.classList.replace("show", "hide");
  }, 400);
  window.setTimeout(() => {
    modal.style.display = "none";
    modalContent.classList.remove("closing");
    body.classList.remove("modal-opened");
  }, 800);
}
