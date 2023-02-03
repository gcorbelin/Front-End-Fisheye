/* global photographerFactory getPhotographerById displayModal */

const currentUrl = new URL(window.location.href);
const photographerId = currentUrl.searchParams.get("id");

function displayHeader(photographer) {
  const headerSection = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const userHeaderDOM = photographerModel.getUserHeaderDOM();
  headerSection.appendChild(userHeaderDOM);

  const contactButton = document.querySelector(".header__contact-btn");
  contactButton.addEventListener("click", (event) => {
    event.preventDefault();
    displayModal();
  });
}

async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographerById(photographerId);
  displayHeader(photographer);
}

init();
