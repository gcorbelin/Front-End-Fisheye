function photographerDetailsFactory(data) {
  const { price } = data;

  const daily = `${price}/jour`;

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

  return { getUserDetailsDOM };
}
