import axios from "axios";

const SEARCH = "https://www.themealdb.com/api/json/v1/1/search.php?";

function searchMeal(query) {
  let URL;

  if (query.value.length === 1) {
    URL = SEARCH + `f=${query.value}`;
  } else {
    URL = SEARCH + `s=${query.value}`;
  }

  const meals = axios
    .get(URL)
    .then((data) => {
      return data.data.meals;
    })
    .catch((err) => console.error(err));

  return meals;
}

export default searchMeal;