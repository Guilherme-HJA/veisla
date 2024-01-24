import axios from "axios";

const URL = "https://themealdb.com/api/json/v1/1/filter.php?";

//Filters all the categories inside the API based on the type and item selected by the user
export function filter(type, item) {
  const data = axios
    .get(URL + `${type}=${item}`)
    .then((res) => {
      return res.data.meals;
    })
    .catch((err) => console.error(err));
  return data;
}

export default filter;
