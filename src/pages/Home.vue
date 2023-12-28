<script setup>
import { ref } from 'vue';
import searchMeal from '../api/search.js';
import FoodCard from '../components/FoodCard.vue';

const mealQuery = ref('');
const queryList = ref([]);
const name = ref('');


//Utilizes the searchMeal function from the search.js file
async function search() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const query = await searchMeal(mealQuery)

  console.log(query)

  if (query === null) {
    queryList.value = []
    name.value = 'Hm... Nothing here'
    mealQuery.value = ''
  }

  else {
    queryList.value = query
    name.value = mealQuery.value.toUpperCase()
    mealQuery.value = ''
  }
}

</script>

<template>
  <div>
    <header class="header">
      <h2 class="header__subtitle">Your handy recipes library</h2>
    </header>
    <section>
      <form v-on:submit.prevent="search" class='search-field'>
        <div class="field">
          <input type="text" class="search-input" placeholder="Search your meal here..." v-model="mealQuery">
          <button type="submit">Search</button>
        </div> <!-- field -->
      </form>
    </section>
    <section>
      <div v-if="name.length !== 0">
        <h1 class="meal-name" v-if="name.length > 1">{{ name }}</h1>
        <h1 class="meal-name" v-else>
          Meals starting with the letter "{{ name }}"
        </h1>
      </div>
      <div class="container" v-if="queryList.value != []">
        <FoodCard v-for='item in queryList' :key="item.idMeal" :meal='item' />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';


.header {
  text-align: center;
  color: $black;

  &__title {
    font-size: $title;
    font-weight: 300;
  }

  &__subtitle {
    font-size: $subsubheading;
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
  margin: 0.50em 0;
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

@media screen and (max-width: $xsmall) {
  .container {
    margin: 1em;
    padding: 1em;

    align-self: center;

    row-gap: 3em;

    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
</style>
