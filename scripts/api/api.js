/**
 * @description Get all datas from API
 * @returns object containing all datas from api
 */
async function getDataFromJSON() {
  return fetch("../../data/photographers.json")
    .then((res) => res.json())
    .catch((err) => console.log("an error occurs", err));
}

/**
 * @description Get all photographers data from API
 * @returns array of photographers objects
 */
async function getPhotographers() {
  const { photographers } = await getDataFromJSON();
  return photographers;
}

/**
 * @description Get a specific photographers infos
 * @param {String} photographerId Photographer's ID
 * @returns object containing all datas about the requested photographer
 */
async function getPhotographerById(photographerId) {
  const { photographers } = await getDataFromJSON();
  const photographer = photographers.find(
    (ph) => ph.id === parseInt(photographerId, 10)
  );
  return photographer;
}

/**
 * @description Get all medias data from API
 * @returns array of medias objects
 */
async function getMedias() {
  const { media } = await getDataFromJSON();
  return media;
}

/**
 * @description Get All medias for a specific photographer
 * @param {String} photographerId Photographer's ID
 * @returns array of medias objects for the requested photographer
 */
async function getMediaByPhotographerId(photographerId) {
  const medias = await getMedias();
  const photographerMedias = medias.filter(
    (media) => media.photographerId === parseInt(photographerId, 10)
  );

  return photographerMedias;
}

export {
  getDataFromJSON,
  getPhotographers,
  getPhotographerById,
  getMedias,
  getMediaByPhotographerId,
};
