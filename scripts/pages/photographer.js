/* global photographerFactory getPhotographerById displayModal mediaFactory getMediaByPhotographerId */

const currentUrl = new URL(window.location.href);
const photographerId = currentUrl.searchParams.get("id");

function displayHeader(photographer) {
  const headerSection = document.querySelector(".photographer-header");
  const photographerModel = photographerFactory(photographer);
  const userHeaderDOM = photographerModel.getUserHeaderDOM();
  headerSection.appendChild(userHeaderDOM);

  const contactButton = document.querySelector(".header__contact-btn");
  contactButton.addEventListener("click", (event) => {
    event.preventDefault();
    displayModal();
  });
}

function displayMedias(medias, photographer) {
  const mediaSection = document.querySelector(".photographer-medias");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media, photographer);
    const mediaDOM = mediaModel.getMediaDOM();
    mediaSection.appendChild(mediaDOM);
  });
}

async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographerById(photographerId);
  const medias = await getMediaByPhotographerId(photographerId);

  displayHeader(photographer);
  displayMedias(medias, photographer);
}

init();
