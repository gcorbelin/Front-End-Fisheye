/* eslint-disable import/extensions */
import { getPhotographerById, getMediaByPhotographerId } from "../api/api.js";
import mediaFactory from "../factories/media.js";
import photographerFactory from "../factories/photographer.js";
import modalForm from "../utils/modal.js";
import lightbox from "../utils/lightbox.js";
import sorter from "../utils/sorter.js";

const currentUrl = new URL(window.location.href);
const photographerId = currentUrl.searchParams.get("id");

/**
 * @description get DOM structure for photographer's "header" section and append it to the page
 * @param {Object} photographer Photographer's infos
 */
function displayHeader(photographer) {
  const headerSection = document.querySelector(".photographer-header");
  const photographerModel = photographerFactory(photographer);
  const userHeaderDOM = photographerModel.getUserHeaderDOM();
  headerSection.appendChild(userHeaderDOM);
}

/**
 * @description Get DOM structure for each of the photographer's medias and append them in the "medias" section
 * @param {Array} medias Array of photographer's medias
 * @param {Object} photographer Photographer's infos
 */
function displayMedias(medias, photographer) {
  const mediaSection = document.querySelector(".photographer-medias");
  mediaSection.innerHTML = "";

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media, photographer);
    const mediaDOM = mediaModel.getMediaDOM();
    mediaSection.appendChild(mediaDOM);
  });
}

/**
 * @description Get DOM structure for Photographer's infos at the bottom of the page
 * @param {Array} medias Array of photographer's medias
 * @param {Object} photographer Photographer's infos
 */
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

/**
 * @description Add event listener to Lightbox's togglers
 * @param {Array} medias Array of photographer's medias (ordered)
 * @param {Object} photographer Photographer's infos
 */
function bindLightbox(medias, photographer) {
  const lightboxTogglers = document.querySelectorAll(".media__header");
  lightboxTogglers.forEach((lightboxToggler) => {
    lightboxToggler.addEventListener("click", (event) => {
      event.preventDefault();
      const mediaId = lightboxToggler.getAttribute("data-id");
      const lightboxModel = lightbox(mediaId, photographer, medias);
      lightboxModel.displayLightbox(lightboxToggler);
    });
  });
}

/**
 * @description Add event listener to contact modal togglers
 * @param {String} name Photographer's name
 */
function bindContactModal(name) {
  const modalModel = modalForm(name);
  const contactButton = document.querySelector(".header__contact-btn");
  contactButton.addEventListener("click", (event) => {
    event.preventDefault();
    modalModel.displayModal(contactButton);
  });
}

/**
 * @description Add event listener to select element for sorting medias
 * @param {Array} medias Array of photographer's medias
 * @param {Object} photographer Photographer's infos
 */
function bindSorter(medias, photographer) {
  const sorterSelect = document.getElementById("media-sort");
  sorterSelect.addEventListener("change", async () => {
    const newMedias = await sorter(medias, sorterSelect.value);
    displayMedias(newMedias.data, photographer);
    bindLightbox(newMedias.data, photographer);
  });
}

async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographerById(photographerId);
  const medias = await getMediaByPhotographerId(photographerId);
  const orderedMedias = await sorter(medias, "popularity");

  displayHeader(photographer);
  displayMedias(orderedMedias.data, photographer);
  displayDetails(medias, photographer);

  // Add listeners
  bindLightbox(orderedMedias.data, photographer);
  bindContactModal();
  bindSorter(medias, photographer);
}

init();
