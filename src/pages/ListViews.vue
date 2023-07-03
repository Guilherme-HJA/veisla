<script>
import getMeals from '../api/filter.js'
import getData from '../api/list.js'
import FoodCard from '../components/FoodCard.vue'

export default {
  props: ['type'],

  data() {
    return {
      listType: this.type,
      listData: null,
      contentLoaded: false,
      itemName: '',
      mealsList: []
    }
  },

  created() {
    this.$watch(
      //Watches the change on the URL and resend the request based
      //on the params (if modified)
      () => this.$route.params,
      () => {
        this.loadTypeList()
      },
      { immediate: true }
    )
  },

  methods: {
    /**
     * Gets all list options based on the ['type'] prop
     */

    async loadTypeList() {
      const data = await getData(this.listType.charAt(0))

      this.listData = data
    },

    async fetchMeals(type, item) {
      const data = await getMeals(type, item);

      if (data === null) {
        this.itemName = "Hm... Nothing here..."
        this.mealsList = []
        this.contentLoaded = true
      }

      else {
        this.mealsList = data
        this.itemName = item.toUpperCase()
        this.contentLoaded = true
      }
    },
  },
  components: {
    FoodCard
  }
}
</script>

<template>
  <div>
    <section :class="{ loading: listData === null, loaded: listData !== null }">
      <fieldset>
        <legend> {{ listType.toUpperCase() }} </legend>
        <div class="list-container">
          <!-- For ingredients -->
          <div class="card" v-if="listType === 'ingredients'" v-for="item in listData">
            <input type="radio" name="ingRadio" :value="item.strIngredient" :id="item.strIngredient" />
            <label :for="item.strIngredient" @click="fetchMeals('i', item.strIngredient)">
              {{ item.strIngredient }}
            </label>
          </div>
          <!-- For Categories -->
          <div class="card" v-else-if="listType === 'categories'" v-for="item in listData">
            <input type="radio" name="catRadio" :value="item.strCategory" :id="item.strCategory" />
            <label :for="item.strCategory" @click="fetchMeals('c', item.strCategory)">
              {{ item.strCategory }} </label>
          </div>
          <!-- For Areas -->
          <div class="card" v-else v-for="item in listData">
            <input type="radio" name="areRadio" :value="item.strArea" :id="item.strArea" />
            <label :for="item.strArea" @click="fetchMeals('a', item.strArea)">
              {{ item.strArea }} </label>
          </div>
        </div>
      </fieldset>
    </section>
    <!-- End of Items List Space-->
    <!-- Meal Cards Space -->
    <section v-if='contentLoaded'>
      <div class="cards-wrapper">
        <div class="cards-wrapper__heading">
          <span class="return" @click="contentLoaded = !contentLoaded">
            <font-awesome-icon icon="fa-solid fa-x" />
          </span>
          <h1 class="item-name">
            {{ itemName }}
          </h1>
        </div>
        <div class="foodcards-container" v-if="mealsList !== []">
          <FoodCard v-for="item in mealsList" :key="item.idMeal" :meal="item" />
        </div>
      </div>
    </section>
    <!-- End Meal Cards Space -->
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

* {
  margin: 0;
  padding: 0;
  font-family: $main-font;
}

fieldset {
  border-color: $orange;

  border-radius: 10px;

  margin: 0 3em;

  color: $black;

  legend {
    font-size: $subsubheading;

    margin-left: 1em;
  }
}


.list-container {

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  justify-items: center;

  row-gap: 1em;

  width: auto;

  max-height: 250px;

  overflow-y: scroll;

  margin: 1em;
  padding: 1em;

  .card {

    width: 200px;

    padding: 1em;

    text-align: center;

    input[type="radio"] {
      visibility: hidden;
      height: 0;
      width: 0;

      &:checked+label {
        border-radius: 3px;
        background-color: $orange;
        color: $white;

        transition: all 0.5s ease;
      }
    }

    label {

      cursor: pointer;

      font-size: 1.3rem;
      text-decoration: none;

      font-weight: 600;

      padding: 5px;

      color: $orange;

      transition: all 0.5s ease;

    }
  }
}

/**/

.cards-wrapper {
  &__heading {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;

    margin-top: 1em;

    .item-name {

      color: $black;
      font-size: $heading;
    }

    .return {
      font-size: $subheading;

      color: $orange;

      padding: 5px;

      cursor: pointer;
      margin-right: 1em;
    }
  }
}

.foodcards-container {

  margin: 2em;
  padding: 2em;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-items: center;
  align-content: center;
  row-gap: 3em;
}

.loading {
  opacity: 0;
  transition: all 1s ease;
}

.loaded {
  opacity: 1;
  transition: all 1s ease;
}

@media screen and (max-width: 480px) {
  .foodcards-container {
    margin: 1em;
    padding: 0;

    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .foodcards-container {
    margin: 1em;
    padding: 0;
  }
}
</style>
