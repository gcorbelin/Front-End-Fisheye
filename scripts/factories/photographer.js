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
    photographerHeader.classList.add("header");
    const photographer = `
    <div class="header__infos">
      <h1 class="header__name photographer__name">${name}</h1>
      <address class="header__address photographer__address">${address}</address>
      <blockquote class="header__quote photographer__quote">${tagline}</blockquote>
    </div>
    <div class="header__contact">
      <button class="header__contact-btn" data-open="modal">
        Contactez-moi
      </button>
    </div>
    <img src="${picture}" class="photographer__img" alt="Avatar de ${name}">
    `;
    photographerHeader.innerHTML = photographer;

    return photographerHeader;
  }

  function getUserDetailsDOM() {
    const photographerDetails = document.createElement("div");
    photographerDetails.classList.add("details");
    const details = `
      <div class="details__likes">
          <span class="details__likes-counter"></span> <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
      <div class="details__price">${daily}</div>
    `;
    photographerDetails.innerHTML = details;

    return photographerDetails;
  }

  return { name, picture, getUserCardDOM, getUserHeaderDOM, getUserDetailsDOM };
}
