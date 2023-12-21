import axios from "axios";

const URL = "https://themealdb.com/api/json/v1/1/filter.php?";

/**
 * Filters all the categories inside the API based on the type and item selected by the user
 *
 * @param {String} type specifies which type of filter to be used in the API request (a, c or i)
 * @param {String} item specifies the item to be filtered
 * @returns {Object[]} returns an array of objects containig all the results of the selected item
 */

export function getMeals(type, item) {
  const data = axios
    .get(URL + `${type}=${item}`)
    .then((res) => {
      return res.data.meals;
    })
    .catch((err) => console.error(err));
  return data;
}

export default getMeals;
