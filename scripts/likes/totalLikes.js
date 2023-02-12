function totalLikesObserver() {
  const countDOM = document.querySelector(".details__likes-counter");
  let count = parseInt(countDOM.innerHTML, 10);

  function update(action) {
    if (action === "INC") {
      count += 1;
    } else if (action === "DESC") {
      count -= 1;
    } else {
      throw new Error("Unknown action");
    }

    countDOM.innerHTML = count;
  }

  return { update };
}

export default totalLikesObserver;
