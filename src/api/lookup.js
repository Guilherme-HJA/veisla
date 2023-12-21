import axios from "axios";

const URL = "https://themealdb.com/api/json/v1/1/lookup.php?i=";

/**
 * Gets all data from the API of specified ID
 *
 * @param {Number} mealId the ID of the Meal to get data from
 * @returns {Object[]} an array of Objects containing all data of said Meal (ID)
 */
function getMealById(mealId) {
  const data = axios
    .get(URL + mealId)
    .then((res) => {
      return res.data.meals[0];
      //For whatever reason the returned data is always an array
      //The [0] is to avoid any unnecessary looping
    })
    .catch((err) => console.log(err));

  return data;
}

export default getMealById;
