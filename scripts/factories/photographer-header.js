function photographerHeaderFactory(data) {
  const { name, portrait, city, country, tagline } = data;

  const picture = `assets/photographers/${portrait}`;
  const address = `${city}, ${country}`;

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

  return { getUserHeaderDOM };
}
