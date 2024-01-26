<script setup>
import { onMounted, ref } from "vue";
import searchMeal from "../api/search.js";
import randomMeal from "../api/random.js";
import FoodCard from "../components/FoodCard.vue";

const mealQuery = ref("");
const queryList = ref([]);
const name = ref("");
const randomMeals = ref([]);
const randomLoad = ref(false);
const mainLoad = ref(false);

//Utilizes the searchMeal function from the search.js file
async function search() {
  randomLoad.value = false;
  mainLoad.value = false;
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (mealQuery.value !== "") {
    const query = await searchMeal(mealQuery);

    if (query === null) {
      queryList.value = [];
      name.value = "Hm... Nothing here";
      mealQuery.value = "";
    } else {
      queryList.value = query;
      name.value = mealQuery.value.toUpperCase();
      mealQuery.value = "";
      mainLoad.value = true;
    }
  }
}

onMounted(() => getRandomMeals());

async function getRandomMeals() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const meals = [];
  for (let i = 0; i < 4; i++) {
    const response = await randomMeal();
    meals.push(response);
  }

  randomMeals.value = meals;
  randomLoad.value = !randomLoad.value;
}
</script>

<template>
  <div>
    <header class="header">
      <h2 class="header__title">Your handy recipes library</h2>
    </header>
    <section>
      <form v-on:submit.prevent="search" class="search-field">
        <div class="field">
          <input
            type="text"
            class="search-input"
            placeholder="Search your meal here..."
            v-model="mealQuery"
          />
          <button type="submit">Search</button>
        </div>
        <!-- field -->
      </form>
    </section>
    <section>
      <div
        :class="{ 'main-active': mainLoad, inactive: !mainLoad }"
        v-if="name.length !== 0"
      >
        <h1 class="meal-name" v-if="name.length > 1">{{ name }}</h1>
        <h1 class="meal-name" v-else>
          Meals starting with the letter "{{ name }}"
        </h1>
      </div>
      <div class="container" v-if="queryList.value != []">
        <FoodCard v-for="item in queryList" :key="item.idMeal" :meal="item" />
      </div>
    </section>
    <section>
      <div
        class="random-meals"
        :class="{ 'random-active': randomLoad }"
        v-if="randomLoad"
      >
        <div class="caption">
          <h1>If you are unsure of what to search, we have some suggestions</h1>
        </div>
        <div class="random container">
          <FoodCard
            v-for="item in randomMeals"
            :key="item.idMeal"
            :meal="item"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables";

.header {
  text-align: center;
  color: $black;

  &__title {
    font-size: $heading;
  }
}

.search-field {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  width: 100%;

  margin-top: 2em;

  .field {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  .search-input {
    width: 70%;

    font-size: 1.7rem;

    background-color: $white;

    border: none;
    outline: none;
    border-radius: 20px 0 0 20px;

    padding: 10px 0 10px 20px;
  }

  button {
    border: none;

    font-size: 1.6rem;
    border-radius: 0 20px 20px 0;

    padding: 5px 10px;

    color: $white;
    background-color: $orange;
  }
}

.meal-name {
  font-size: $heading;
  text-align: center;
  margin: 0.5em 0;
}

.random-meals {
  margin: 1em;
  padding: 1em;

  .caption {
    text-align: center;
    color: $black;
    font-size: 2rem;
  }
}

.random-active {
  animation: fadeIn 2s forwards;
}

.main-active {
  animation: fadeIn 1s forwards;
}

.inactive {
  animation: fadeOut 1s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 100;
  }
  100% {
    opacity: 0;
  }
}

.container {
  margin: 2em;
  padding: 2em;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-items: center;
  align-content: center;

  row-gap: 3em;
}

@media screen and (max-width: 480px) {
  .container,
  .random {
    margin: 1em;
    padding: 1em;

    align-self: center;
    justify-items: center;

    row-gap: 3em;

    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .search-field {
    .field {
      flex-direction: column;
      align-items: center;

      gap: 1em;

      .search-input {
        padding: 10px 0 10px 15px;
        border-radius: 15px;

        font-size: 1.4rem;
      }

      button {
        border-radius: 15px;
      }
    }
  }
}

@media (min-width: 480px) and (max-width: 720px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    align-self: center;
  }
}
</style>
