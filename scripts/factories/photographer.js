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
        <img src="${picture}" class="photographer__img" alt="Avatar de ${name}">
        <h2 class="photographer__name">${name}</h2>
      </a>
      <address class="photographer__address">${address}</address>
      <blockquote class="photographer__quote">${tagline}</blockquote>
      <div class="photographer__price">${daily}</div>
    `;
    photographerCard.innerHTML = photographer;

    return photographerCard;
  }

  function getUserHeaderDOM() {
    const photographerHeader = document.createElement("div");
    photographerHeader.classList.add("photograph-header__wrapper");
    const photographer = `
    <div class="header__infos">
      <h1 class="header__name photographer__name">${name}</h1>
      <address class="header__address photographer__address">${address}</address>
      <blockquote class="header__quote photographer__quote">${tagline}</blockquote>
    </div>
    <div class="header__contact">
      <button class="header__contact-btn">
        Contactez-moi
      </button>
    </div>
    <img src="${picture}" class="photographer__img" alt="Avatar de ${name}">
    `;
    photographerHeader.innerHTML = photographer;

    return photographerHeader;
  }

  return { name, picture, getUserCardDOM, getUserHeaderDOM };
}
