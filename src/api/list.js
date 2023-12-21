import axios from "axios";

const URL = "https://www.themealdb.com/api/json/v1/1/list.php?";

/**
 *
 * @param {String} type specifies the type of the list to be retrieved
 * 'a' -> areas
 * 'c' -> categories
 * 'i' -> ingredients
 *
 * @returns {Object[]} returns an array of objects containing all the results of said type
 */
function getData(type) {
  const data = axios.get(URL + `${type}=list`).then((res) => {
    return res.data.meals;
  });
  return data;
}

export default getData;
