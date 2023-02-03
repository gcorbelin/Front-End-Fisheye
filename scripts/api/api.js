async function getPhotographers() {
  return fetch("../../data/photographers.json")
    .then((res) => res.json())
    .catch((err) => console.log("an error occurs", err));
}
