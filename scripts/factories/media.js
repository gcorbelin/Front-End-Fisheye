function mediaFactory(data, photographer) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const { name } = photographer;

  function getMediaDOM() {
    const mediaCard = document.createElement("article");
    mediaCard.classList.add("media");
    let media = "";
    if (image) {
      media += `
        <div class="media__header media__header--image">
            <img src="/assets/photographers/${
              name.split(" ")[0]
            }/${image}" class="media__img" alt="${title}">
        </div>
    `;
    } else {
      media += `
        <div class="media__header media__header--video">
            <img src="/assets/photographers/${
              name.split(" ")[0]
            }/${video}" class="media__img" alt="${title}">
        </div>
    `;
    }
    media += `
        <div class="media__body">
            <h2 class="media__name">${title}</h2>
            <div class="media__likes">
                ${likes} <i class="fa fa-heart" aria-hidden="true"></i>
            </div>
        </div>
    `;
    mediaCard.innerHTML = media;

    return mediaCard;
  }

  return { id, photographerId, title, image, likes, date, price, getMediaDOM };
}

export default mediaFactory;
