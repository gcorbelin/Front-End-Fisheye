/* eslint-disable import/extensions */
import { getPhotographers } from "../api/api.js";
import photographerFactory from "../factories/photographer.js";

/**
 * Display all Photographers cards
 * @param {Array} photographers Array of photographers objects
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Init
 */
async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
