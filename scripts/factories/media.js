function mediaFactory(data, photographer) {
  const { id, title, image, video, likes } = data;
  const { name } = photographer;

  function getMediaDOM() {
    const mediaCard = document.createElement("article");
    mediaCard.classList.add("media");
    let media = "";
    if (image) {
      media += `
        <button type="button" class="media__header media__header--image" data-id="${id}" title="Ouvrir l'image en mode gallerie">
            <img src="/assets/photographers/${
              name.split(" ")[0]
            }/${image}" class="media__img" alt="${title}">
        </button>
      `;
    } else {
      media += `
        <button type="button" class="media__header media__header--video" data-id="${id}" title="Ouvrir l'image en mode gallerie">
          <video class="media__img">
            <source src="/assets/photographers/${
              name.split(" ")[0]
            }/${video}" type="video/mp4">
          </video>
        </button>
      `;
    }
    media += `
        <div class="media__body">
            <h2 class="media__name">${title}</h2>
            <div class="media__likes">
                ${likes} <span class="sr-only">likes</span><i class="fa fa-heart" aria-hidden="true"></i>
            </div>
        </div>
      `;
    mediaCard.innerHTML = media;

    return mediaCard;
  }

  return { getMediaDOM };
}

export default mediaFactory;
