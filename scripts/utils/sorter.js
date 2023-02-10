async function sorter(data, orderBy) {
  if (orderBy === "popularity") {
    const result = {
      key: orderBy,
      data: Array.from(data).sort((a, b) => b.likes - a.likes),
    };

    return result;
  }
  if (orderBy === "date") {
    const result = {
      key: orderBy,
      data: Array.from(data).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    };

    return result;
  }
  if (orderBy === "title") {
    const result = {
      key: orderBy,
      data: Array.from(data).sort((a, b) => {
        const titleA = a.title.toUpperCase(); // ignore upper and lowercase
        const titleB = b.title.toUpperCase(); // ignore upper and lowercase
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }

        // names must be equal
        return 0;
      }),
    };

    return result;
  }
  throw new Error("unknow orderBy type");
}

export default sorter;
