/**
 * @description Order medias
 * @param {Array} data Array of Medias objects
 * @param {String} orderBy Value of the "Order by" select
 */
function sorter(data, orderBy) {
  switch (orderBy) {
    case "popularity":
      data.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "title":
      data.sort((a, b) => {
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
      });
      break;
    default:
      throw new Error("unknow orderBy type");
  }
}

export default sorter;
