import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import ListViews from "../pages/ListViews.vue";
import MealPage from "../pages/MealPage.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/:type",
    name: "Lists",
    component: ListViews,
    props: true,
    beforeEnter: (to, from, next) => {
      function isValid(param) {
        const types = ["ingredients", "categories", "areas"];

        if (types.includes(param)) return true;
        else false;
      }

      if (!isValid(to.params.type)) next({ name: "not-found" });
      else next();
    },
  },
  {
    path: "/meals/:mealID",
    name: "Meal",
    component: MealPage,
    props: true,
    beforeEnter: (to, from, next) => {
      function isValidID(param) {
        //URL Validation
        const id = parseInt(param);

        if (isNaN(id)) return false;
        else return true;
      }
      if (!isValidID(to.params.mealID)) next({ name: "not-found" });
      else next();
    },
  },
  { path: "/404", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
