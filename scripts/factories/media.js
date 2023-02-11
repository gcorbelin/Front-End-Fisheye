/**
 * @description Media factory
 * @param {Object} data Media infos
 * @param {Object} photographer Photographer infos
 * @returns utility functions
 */
function mediaFactory(data, photographer) {
  const { id, title, image, video, likes } = data;
  const { name } = photographer;
  let calculatedLikes = likes;
  const isLiked = localStorage.getItem(id);
  const trueLiked = isLiked && isLiked === "true";
  if (trueLiked) {
    calculatedLikes += 1;
  }

  /**
   * Construct media card
   * @returns Template for media card
   */
  function getMediaDOM() {
    const mediaCard = document.createElement("article");
    mediaCard.classList.add("media");
    mediaCard.setAttribute("data-id", id);
    let media = "";
    if (image) {
      media += `
        <button type="button" class="media__header media__header--image" aria-label="Ouvrir l'image en mode gallerie">
            <img src="/assets/photographers/thumbnails/${
              name.split(" ")[0]
            }/${image}" class="media__img" alt="${title}">
        </button>
      `;
    } else {
      media += `
        <button type="button" class="media__header media__header--video" aria-label="Ouvrir la vidéo en mode gallerie">
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
            <button type="button" class="media__likes" aria-label="${
              trueLiked ? "Cliquer pour retirer le like" : "Cliquer pour liker"
            }">
                <span class="js-likes-counter">${calculatedLikes}</span>
                <i class="${
                  trueLiked ? "fa" : "fa-regular"
                } fa-heart js-like-icon" aria-hidden="true" role="img" aria-label="likes"></i>
            </button>
        </div>
      `;
    mediaCard.innerHTML = media;

    return mediaCard;
  }

  return { getMediaDOM };
}

export default mediaFactory;
