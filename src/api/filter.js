import axios from "axios";

const URL = "https://themealdb.com/api/json/v1/1/filter.php?";

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
