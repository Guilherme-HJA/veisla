import axios from "axios";

const URL = "https://www.themealdb.com/api/json/v1/1/list.php?";
//c=list for categories
//a=list for areas
//i=list for ingredients

function getData(type) {
  const data = axios.get(URL + `${type}=list`).then((res) => {
    return res.data.meals;
  });
  return data;
}

export default getData;
