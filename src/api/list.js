import axios from "axios";

const URL = "https://www.themealdb.com/api/json/v1/1/list.php?";

//Fetch all lists from the API
function getLists(type) {
  const data = axios.get(URL + `${type}=list`).then((res) => {
    return res.data.meals;
  });
  return data;
}

export default getLists;
