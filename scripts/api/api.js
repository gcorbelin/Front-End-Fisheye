async function getDataFromJSON() {
  return fetch("../../data/photographers.json")
    .then((res) => res.json())
    .catch((err) => console.log("an error occurs", err));
}

async function getPhotographers() {
  const { photographers } = await getDataFromJSON();
  return photographers;
}

async function getPhotographerById(photographerId) {
  const { photographers } = await getDataFromJSON();
  const photographer = photographers.find(
    (ph) => ph.id === parseInt(photographerId, 10)
  );
  return photographer;
}

async function getMedias() {
  const { media } = await getDataFromJSON();
  return media;
}

async function getMediaByPhotographerId(photographerId) {
  const medias = await getMedias();
  const photographerMedias = medias.filter(
    (media) => media.photographerId === parseInt(photographerId, 10)
  );

  return photographerMedias;
}
