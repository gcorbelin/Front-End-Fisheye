async function getPhotographers() {
  return fetch("../../data/photographers.json")
    .then((res) => res.json())
    .catch((err) => console.log("an error occurs", err));
}

async function getPhotographerById(photographerId) {
  const { photographers } = await getPhotographers();
  const photographer = photographers.find(
    (ph) => ph.id === parseInt(photographerId, 10)
  );
  return photographer;
}
