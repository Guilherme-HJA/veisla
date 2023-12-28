<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onBeforeMount, ref } from 'vue';
import getMealById from '../api/lookup';

const props = defineProps({
  mealID: String
});

const meal = ref({})
const mealInstructions = ref([''])
const requirements = ref([])
const contentLoaded = ref(false)

onBeforeMount(async () => {
  meal.value = await getMealById(props.mealID)

  //For some reason all the ingredients and measurenents
  //have their own key:value pair
  //This loop aims to get all non-empty elements and sort the on a new
  //Array of Objects {ingredient : measurenent}, for better understanding.

  for (let i = 1; i <= 20; i++) {
    //20 is the fixed value on the API

    let ingredient = meal.value['strIngredient' + i]
    let measurement = meal.value['strMeasure' + i]

    if (ingredient === '' && (measurement === '' || measurement === ' ')) continue

    else {
      requirements.value.push({
        ingredient: ingredient,
        measurement: measurement
      })
    }

    //All instructions appear unformatted and altogether when redered alone
    //This separates the text using the value present on all of then, that
    //after are looped for a better view in the page
    mealInstructions.value = meal.value.strInstructions.split('\r\n')

  }

  //Sets the visibility of the wrapper element
  contentLoaded.value = true
})

</script>

<template>
  <div>
    <div class="wrapper" :class="{ loading: !contentLoaded, loaded: contentLoaded }">
      <header>
        <h1 class="mealName">
          <span class="icon">
            <a @click="$router.back()" class="icon-link back">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </a>
          </span>
          {{ meal.strMeal }}
          <span class="icon">
            <a :href="meal.strYoutube" target="_blank" class="icon-link youtube">
              <FontAwesomeIcon icon="fa-brands fa-youtube" />
            </a>
          </span>
        </h1>
      </header>

      <div class="container">
        <div class="container__heading">
          <div class="meal-image">
            <figure class="image">
              <img :src="meal.strMealThumb" :alt="meal.strMeal" />
            </figure>
          </div>
          <div class="meal-details">
            <div class="meal-details__attributes">
              <h2> Category </h2>
              <p> {{ meal.strCategory }} </p>
              <h2> Area </h2>
              <p> {{ meal.strArea }} </p>
            </div>
            <hr />
            <div class="meal-details__ingredients">
              <details>
                <summary>Ingredients</summary>
                <ul>
                  <li v-for="item in requirements">
                    {{ item.ingredient }}: <span>{{ item.measurement }}</span>
                  </li>
                </ul>
              </details>
            </div>
          </div> <!-- meal-details -->
        </div> <!-- container__heading -->
        <div class="container__content">
          <div class="meal-instructions">
            <h3>INSTRUCTIONS</h3>
            <p v-for="text in mealInstructions">
              {{ text }} <br />
            </p>
          </div>
        </div>
      </div> <!-- container -->
    </div> <!-- wrapper -->
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

h1,
h2,
h3,
p,
a,
span,
summary {
  color: $black;
}

.icon-link {
  color: $orange;
  cursor: pointer;

  &.back {
    margin-right: 1em;
  }

  &.youtube {
    margin-left: 1em;
  }
}

li {
  list-style: none;
}

.mealName {
  text-align: center;
  font-size: $heading;
  margin-top: 1em;

  text-transform: uppercase;
}

.container {
  &__heading {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));

    column-gap: 3em;

    margin: 2em;
  }

  &__content {
    margin: 2em;
  }
}

.image {
  overflow: hidden;

  img {
    border-radius: 10px;

    max-width: 100%;
    height: auto;
  }
}

.meal-details {

  hr {
    margin: 2em;
    color: $orange;
  }

  &__attributes {
    h2 {
      font-size: $subheading;
    }

    p {
      font-size: 1.8rem;
    }
  }

  &__ingredients {
    max-height: 300px;
    overflow-y: scroll;

    details {
      summary {
        cursor: pointer;
        font-size: $subsubheading;

        position: relative;
        z-index: 10;
      }

      @keyframes show {
        from {
          margin-bottom: -80%;
          opacity: 0;
          transform: translateY(-100%);
        }
      }

      &>*:not(summary) {
        animation: show 0.5s ease-in-out;
        z-index: 1;
        transition: all 0.3s ease-in-out;
        overflow: hidden;
      }
    }

    ul {
      margin-top: .75em;

      border-left: 4px solid $orange;

      padding-left: 1rem;

      li {
        font-size: 1.5rem;

        span {
          font-style: italic;
        }
      }
    }
  }
}

.meal-instructions {
  h3 {
    font-size: $subsubheading;
  }

  p {
    font-size: $text;

    padding-left: 1rem;

    text-align: justify;

    border-left: 3px solid $orange;

    &::first-letter {
      font-size: $text + 0.50;
    }
  }
}

@media screen and (max-width: 480px) {
  .back {
    display: none;
  }

  .youtube {
    margin: 0;
  }

  .container {
    &__heading {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

      column-gap: 0;
      margin: 1em;
    }
  }

  .meal-details {
    text-align: center;

    ul {
      text-align: justify;
    }
  }

  .meal-instructions {
    p {
      font-size: $text-mobile;
      border: none;
      padding: 0;
    }
  }

  .container {
    margin: 0;
  }

  .mealName {
    font-size: $subheading;
  }
}

@media screen and (min-width: 480px) and (max-width: 768px) {
  .container {
    &__heading {
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
  }

  .back {
    display: none;
  }

  .youtube {
    margin: 0;
  }

  .mealName {
    font-size: $subheading;
  }
}

@media screen and (min-width: 768px) and (max-width: 1127px) {
  .image {
    display: flex;
    align-content: center;
    justify-content: center;
  }
}

.loading {
  opacity: 0;
  transition: all 1s ease;
}

.loaded {
  opacity: 1;
  transition: all 1s ease;
}
</style>
