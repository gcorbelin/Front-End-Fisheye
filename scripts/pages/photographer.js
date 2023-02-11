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
    const isLiked = localStorage.getItem(media.id);
    if (isLiked && isLiked === "true") {
      likesCounter += 1;
    }
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
      const mediaId = lightboxToggler
        .closest("article")
        .getAttribute("data-id");
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
 * @description Add event listener to each media's like button
 * @param {Array} medias Array of photographer's medias
 */
function bindLikeButtons() {
  const likeButtons = document.querySelectorAll(".media__likes");
  likeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mediaId = btn.closest("article").getAttribute("data-id");
      let wasLiked = localStorage.getItem(mediaId);
      // Display new likes
      const btnLikesDOM = btn.querySelector(".js-likes-counter");
      const likesDOM = document.querySelector(".details__likes-counter");
      const iconDOM = btn.querySelector(".js-like-icon");
      let btnLikes = parseInt(btnLikesDOM.innerHTML, 10);
      let totalLikes = parseInt(likesDOM.innerHTML, 10);
      switch (wasLiked) {
        case "true":
          btnLikes -= 1;
          totalLikes -= 1;
          iconDOM.classList.replace("fa", "fa-regular");
          break;
        case null:
        case "false":
          btnLikes += 1;
          totalLikes += 1;
          iconDOM.classList.replace("fa-regular", "fa");
          break;
        default:
          break;
      }
      btnLikesDOM.innerHTML = btnLikes;
      likesDOM.innerHTML = totalLikes;
      // Change local storage value
      wasLiked = wasLiked === "true";
      localStorage.setItem(mediaId, !wasLiked);
    });
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
    bindLikeButtons();
  });
}

/**
 * Init
 */
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
  bindLikeButtons();
  bindContactModal();
  bindSorter(medias, photographer);
}

init();
