<script setup>
import { onBeforeMount, ref } from "vue";
import getMealById from "../api/lookup";

const props = defineProps({
  mealID: String,
});

const meal = ref({});
const mealInstructions = ref([""]);
const requirements = ref([]);
const contentLoaded = ref(false);

onBeforeMount(async () => {
  meal.value = await getMealById(props.mealID);

  //For some reason all the ingredients and measurenents
  //have their own key:value pair
  //This loop aims to get all non-empty elements and sort the on a new
  //Array of Objects {ingredient : measurenent}, for better understanding.

  let newReqs = [];
  for (let i = 1; i <= 20; i++) {
    //20 is the fixed value on the API

    let ingredient = meal.value["strIngredient" + i];
    let measurement = meal.value["strMeasure" + i];

    if (ingredient === "" && (measurement === "" || measurement === " "))
      continue;
    else {
      newReqs.push({
        ingredient: ingredient,
        measurement: measurement,
      });
    }

    //All instructions appear unformatted and altogether when redered alone
    //This separates the text using the value present on all of then, that
    //after are looped for a better view in the page
    mealInstructions.value = meal.value.strInstructions.split("\r\n");
  }

  requirements.value = newReqs.filter((item) => item.ingredient !== null);

  //Sets the visibility of the wrapper element
  contentLoaded.value = true;
});
</script>

<template>
  <div>
    <Transition name="fade">
      <div class="wrapper" v-show="contentLoaded">
        <div class="heading">
          <h1>{{ meal.strMeal }}</h1>
        </div>
        <section class="content">
          <div class="content__left">
            <figure class="image">
              <img
                loading="lazy"
                :src="meal.strMealThumb"
                :alt="meal.strMeal"
                width="500"
                height="500"
              />
            </figure>
            <div class="content__left__details">
              <h2>Category</h2>
              <p>{{ meal.strCategory }}</p>
              <hr />
              <h2>Area</h2>
              <p>{{ meal.strArea }}</p>
            </div>
            <hr />
            <div class="content__left__ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li v-for="item in requirements">
                  <p>
                    <span> {{ item.ingredient }} </span>
                    <span v-if="item.measurement !== null">
                      : {{ item.measurement }}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="content__right">
            <iframe
              loading="lazy"
              :src="meal.strYoutube"
              frameborder="0"
              width="900"
              height="500"
            ></iframe>

            <div class="content__right__instructions">
              <h2>Instructions</h2>
              <p v-for="text in mealInstructions">
                {{ text }}
              </p>
            </div>
          </div>
        </section>
        <section class="recommendations"></section>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables";

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

h2 {
  font-size: 2.5rem;
}

.wrapper {
  display: grid;
  grid-template-areas:
    "heading"
    "content"
    "recommendations";
  grid-template-rows: auto;
  padding: 2em;
  row-gap: 3em;
}

.heading {
  color: $black;
  grid-area: heading;
  font-size: 3rem;
  text-align: center;

  display: flex;
  flex-direction: column;
}

.content {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 3em;
  justify-items: center;
  &__left {
    padding: 2em;
    background-color: #002626;
    color: $white;
    figure {
      img {
        height: auto;
        max-width: 100%;
      }
    }
    hr {
      margin: 1em 0;
    }

    &__details {
      margin-top: 1em;
      p {
        font-size: 1.5rem;
      }
    }
    &__ingredients {
      ul {
        list-style: none;
        li {
          p {
            font-size: 1.5rem;

            span {
              &:not(:first-child) {
                font-style: italic;
              }
            }
          }
        }
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 100%;

    row-gap: 2em;

    iframe {
      width: 100%;
      max-width: 100%;
    }

    &__instructions {
      color: $black;
      p {
        text-align: justify;
        font-size: 1.5rem;
        text-wrap: wrap;

        &::first-letter {
          font-size: 2rem;
        }

        &:not(:first-child) {
          margin-top: 1em;
        }
      }
    }
  }
}

@media (max-width: 66em) {
  .wrapper {
    grid-template-columns: auto;
  }

  .content {
    row-gap: 3em;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 35em) {
  .wrapper {
    justify-items: center;
    justify-content: center;
  }
  .heading {
    font-size: 1.5rem;
  }
  .content {
    justify-items: center;
    justify-content: center;
    grid-template-columns: 350px;

    &__right {
      &__instructions {
        h2 {
          text-align: center;
        }
        p {
          font-size: 1.3rem;
        }
      }
    }
  }
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.fade-enter-to {
  transition:
    opacity 1s ease,
    transform 0.6s ease;
}

.fade-leave-from,
.fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
  transition:
    opacity 1s ease,
    transform 0.6s ease;
}
</style>
