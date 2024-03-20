<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import searchMeal from "../api/search.js";
import randomMeal from "../api/random.js";

const FoodCard = defineAsyncComponent(
  () => import("../components/FoodCard.vue"),
);

const query = ref("");
const meals = ref();
const name = ref("");
const randomMeals = ref([]);
const randomVisible = ref(false);
const mainVisible = ref(false);

//Utilizes the searchMeal function from the search.js file
async function fetchMealsByQuery(meal) {
  if (meal !== undefined || meal !== "") {
    randomVisible.value = false;
    mainVisible.value = false;

    const res = await searchMeal(meal);
    if (res !== null) {
      meals.value = res;
      name.value =
        meal.length === 1
          ? `Starting with '${meal.charAt(0)}'`
          : meal.toString().toUpperCase();
      query.value = "";
    } else {
      name.value = "Nothing here but us...";
    }
    mainVisible.value = true;
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
  randomVisible.value = !randomVisible.value;
}
</script>

<template>
  <div class="home-wrapper">
    <section class="home">
      <div class="home__header">
        <figure class="image">
          <img
            loading="lazy"
            src="../assets/logo.svg"
            width="500"
            alt="Veisla_Logo"
          />
        </figure>
      </div>

      <form
        v-on:submit.prevent="fetchMealsByQuery(query)"
        class="home__search-field"
      >
        <div class="field">
          <input
            type="text"
            class="search-input"
            placeholder="Search your meal here..."
            v-model="query"
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <Transition name="fadeDown">
        <div class="home__search-results" v-if="mainVisible">
          <div class="cards-space">
            <h1>{{ name }}</h1>
            <div class="grid">
              <FoodCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
            </div>
          </div>
        </div>
      </Transition>
    </section>

    <Transition name="fadeDown">
      <section class="random-content" v-if="randomVisible">
        <div class="wrapper">
          <h1>Don't know where to start? No worries, we got ya...</h1>
          <div class="grid random-cards">
            <FoodCard
              v-for="meal in randomMeals"
              :key="meal.idMeal"
              :meal="meal"
            />
          </div>
        </div>
      </section>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-wrapper {
  height: 100%;
  display: grid;
  margin: 2em;
  grid-template-areas: "random main";
  grid-template-columns: auto 1fr;
}

.home {
  grid-area: main;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__header {
    .image {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        align-self: center;
        max-height: auto;
        width: 50%;
      }
    }
  }

  &__search-field {
    padding: 1em;
    width: 100%;

    .field {
      display: flex;
      justify-content: space-between;
      input {
        font-size: 1.6rem;

        outline: 2px solid #002626;

        border: none;
        border-radius: 10px;

        width: 80%;

        padding: 10px 0 10px 20px;

        color: #002626;
        caret-color: #002626;
      }

      button {
        border: none;
        font-size: 1.6rem;
        border-radius: 10px;
        background-color: #002626;
        color: #f7f3e3;
        padding: 0.5em 1em;
      }
    }
  }
  &__search-results {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      text-align: center;
      font-size: 3rem;

      margin-bottom: 1em;
    }
    .cards-space {
      padding: 4em;
    }
  }
}

.random-content {
  grid-area: random;
  padding: 1em;
  background-color: #002626;

  transition: height 1s ease-in;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    row-gap: 1em;

    h1 {
      font-size: 1.3rem;
      text-align: center;
      text-wrap: wrap;

      max-width: 300px;

      color: #f7f3e3;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-items: center;
  align-content: center;
  row-gap: 3em;
}

@media (max-width: 35em) {
  .home-wrapper {
    grid-template-areas:
      "main"
      "random";

    grid-template-columns: 350px;
    justify-content: center;
  }

  .home {
    &__search-field {
      .field {
        flex-direction: column;
        row-gap: 1em;
        input {
          width: 100%;

          &::placeholder {
            font-size: 1.3rem;
          }
        }
      }
    }

    &__search-results {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        text-align: center;
        font-size: 3rem;

        margin-bottom: 1em;
      }
      .cards-space {
        padding: 0;
      }
    }
  }
}

.fadeDown-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.fadeDown-enter-to {
  transition:
    opacity 1.5s ease,
    transform 1s ease;
}

.fadeDown-leave-from,
.fadeDown-leave-to {
  transform: translateY(-50px);
  opacity: 0;
  transition:
    opacity 1s ease,
    transform 0.6s ease;
}
</style>
