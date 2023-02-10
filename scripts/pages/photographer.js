/* eslint-disable import/extensions */
import { getPhotographerById, getMediaByPhotographerId } from "../api/api.js";
import mediaFactory from "../factories/media.js";
import photographerFactory from "../factories/photographer.js";
import modalForm from "../utils/modal.js";
import lightbox from "../utils/lightbox.js";

const currentUrl = new URL(window.location.href);
const photographerId = currentUrl.searchParams.get("id");

function displayHeader(photographer) {
  const headerSection = document.querySelector(".photographer-header");
  const photographerModel = photographerFactory(photographer);
  const userHeaderDOM = photographerModel.getUserHeaderDOM();
  headerSection.appendChild(userHeaderDOM);
}

function displayMedias(medias, photographer) {
  const mediaSection = document.querySelector(".photographer-medias");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media, photographer);
    const mediaDOM = mediaModel.getMediaDOM();
    mediaSection.appendChild(mediaDOM);
  });
}

function displayDetails(medias, photographer) {
  const detailSection = document.querySelector(".photographer-details");
  const photographerModel = photographerFactory(photographer);
  const detailsDOM = photographerModel.getUserDetailsDOM();
  detailSection.appendChild(detailsDOM);

  let likesCounter = 0;
  medias.forEach((media) => {
    likesCounter += media.likes;
  });
  const likesDOM = document.querySelector(".details__likes-counter");
  likesDOM.innerHTML = likesCounter;
}

async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographerById(photographerId);
  const medias = await getMediaByPhotographerId(photographerId);
  const modalModel = modalForm(photographer.name);

  displayHeader(photographer);
  displayMedias(medias, photographer);
  displayDetails(medias, photographer);

  const lightboxTogglers = document.querySelectorAll(".media__header");
  lightboxTogglers.forEach((lightboxToggler) => {
    lightboxToggler.addEventListener("click", (event) => {
      event.preventDefault();
      const mediaId = lightboxToggler.getAttribute("data-id");
      const lightboxModel = lightbox(mediaId, photographer, medias);
      lightboxModel.displayLightbox(lightboxToggler);
    });
  });

  const contactButton = document.querySelector(".header__contact-btn");
  contactButton.addEventListener("click", (event) => {
    event.preventDefault();
    modalModel.displayModal(contactButton);
  });
}

init();
