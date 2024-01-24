import axios from "axios";

const RANDOM = "https://www.themealdb.com/api/json/v1/1/random.php";

function randomMeal() {
  const meal = axios
    .get(RANDOM)
    .then((data) => {
      return data.data.meals[0];
    
    })
    .catch((error) => console.log(error));

  return meal;
}

export default randomMeal;
