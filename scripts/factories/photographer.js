function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
  const address = `${city}, ${country}`;
  const daily = `${price}/jour`;

  function getUserCardDOM() {
    const photographerCard = document.createElement("article");
    photographerCard.classList.add("photographer");
    const photographer = `
      <a href="/photographer.html?id=${id}" title="Voir la fiche" class="photographer__link">
        <img src="${picture}" class="photographer__img" alt="">
        <h2 class="photographer__name">${name}</h2>
      </a>
      <address class="photographer__address">${address}</address>
      <blockquote class="photographer__quote">${tagline}</blockquote>
      <div class="photographer__price">${daily}</div>
    `;
    photographerCard.innerHTML = photographer;

    return photographerCard;
  }

  return { name, picture, getUserCardDOM };
}
