<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onBeforeMount, onMounted, ref } from "vue";
import getMealById from "../api/lookup";

const props = defineProps({
  mealID: String,
});

const meal = ref({});
const mealInstructions = ref([""]);
const requirements = ref([]);
const contentLoaded = ref(false);

const onView = ref(false);

onBeforeMount(async () => {
  meal.value = await getMealById(props.mealID);

  //For some reason all the ingredients and measurenents
  //have their own key:value pair
  //This loop aims to get all non-empty elements and sort the on a new
  //Array of Objects {ingredient : measurenent}, for better understanding.

  for (let i = 1; i <= 20; i++) {
    //20 is the fixed value on the API

    let ingredient = meal.value["strIngredient" + i];
    let measurement = meal.value["strMeasure" + i];

    if (ingredient === "" && (measurement === "" || measurement === " "))
      continue;
    else {
      requirements.value.push({
        ingredient: ingredient,
        measurement: measurement,
      });
    }

    //All instructions appear unformatted and altogether when redered alone
    //This separates the text using the value present on all of then, that
    //after are looped for a better view in the page
    mealInstructions.value = meal.value.strInstructions.split("\r\n");
  }

  //Sets the visibility of the wrapper element
  contentLoaded.value = true;
});

onMounted(() => {
  const observer = new IntersectionObserver((e) => {
    e.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });
  const hidden = document.querySelectorAll(".hidden");
  hidden.forEach((el) => observer.observe(el));
});
</script>

<template>
  <div>
    <div
      class="wrapper"
      :class="{ loading: !contentLoaded, loaded: contentLoaded }"
    >
      <header>
        <h1 class="mealName">
          <span class="icon">
            <a @click="$router.back()" class="icon-link back">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
            </a>
          </span>
          {{ meal.strMeal }}
          <span class="icon">
            <a
              :href="meal.strYoutube"
              target="_blank"
              class="icon-link youtube"
            >
              <FontAwesomeIcon icon="fa-brands fa-youtube" />
            </a>
          </span>
        </h1>
      </header>

      <div class="container">
        <div class="heading">
          <div class="meal-image">
            <figure class="image">
              <img
                loading="lazy"
                width="600"
                height="600"
                :src="meal.strMealThumb"
                alt="meal.strMeal"
              />
            </figure>
          </div>
          <div class="meal-info">
            <div class="category">
              <h2>Category</h2>
              <p>{{ meal.strCategory }}</p>
            </div>
            <div class="area">
              <h2>Area</h2>
              <p>{{ meal.strArea }}</p>
            </div>
            <!-- <div class="nav-buttons"> -->
            <!--   <button> -->
            <!--     <FontAwesomeIcon icon="fa-solid fa-arrow-left" />Previous -->
            <!--   </button> -->
            <!--   <button> -->
            <!--     Next<FontAwesomeIcon icon="fa-solid fa-arrow-right" /> -->
            <!--   </button> -->
            <!-- </div> -->
          </div>

          <!-- meal-info -->
        </div>
        <div class="content">
          <div class="ingredients" :class="{ hidden: !onView }">
            <h2>Ingredients</h2>
            <ul>
              <li v-for="item in requirements">
                <p v-if="item.ingredient !== null">
                  {{ item.ingredient }}: <span> {{ item.measurement }} </span>
                </p>
              </li>
            </ul>
          </div>
          <!-- ingredients -->
          <div class="instructions" :class="{ hidden: !onView }">
            <h3>Instructions</h3>
            <p v-for="text in mealInstructions">{{ text }} <br /></p>
          </div>
        </div>
        <!-- content -->
      </div>
      <!-- container -->
    </div>
    <!-- wrapper -->
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
    margin-right: 0.5em;
  }

  &.youtube {
    margin-left: 0.5em;
  }
}

li {
  list-style: none;
}

.mealName {
  text-align: center;
  font-size: 4rem;
  margin-top: 1em;

  text-transform: uppercase;
}

.loading {
  opacity: 0;
  transition: all 1s ease;
}

.loaded {
  opacity: 1;
  transition: all 1s ease;
}

.container {
  .heading {
    display: flex;
    flex-direction: row;
    align-content: center;
    margin: 2em;
    gap: 2em;

    .meal-image {
      box-shadow: -3px 8px 21px 0px rgba(25, 25, 25, 0.71);
      -webkit-box-shadow: -3px 8px 21px 0px rgba(25, 25, 25, 0.71);
      -moz-box-shadow: -3px 8px 21px 0px rgba(25, 25, 25, 0.71);

      border-radius: 15px;

      overflow: hidden;
      .image {
        border-radius: inherit;
        img {
          transform: scale(1.1);
          width: 100%;
          height: auto;

          max-width: 100%;
          max-height: 600px;
        }
      }
    }

    .meal-info {
      padding-left: 1em;

      h2 {
        text-transform: uppercase;
        font-size: 3.5rem;
      }

      p {
        text-transform: uppercase;
        font-size: 2.5rem;
        font-style: italic;
      }
    }

    .nav-buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;

      button {
        border: none;
        color: $orange;
        background: none;
        font-size: 2rem;
      }
    }

    animation: pop-left 1s ease;

    @keyframes pop-left {
      from {
        transform: translateX(-200px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    margin: 2em;

    .ingredients {
      background-color: $darkorange;
      border-radius: 5px;
      padding: 0 0.5em 1em 0.5em;

      h2 {
        color: $white2;
        text-align: center;
        text-transform: uppercase;
        font-size: 4em;
      }
      ul {
        border-left: 4px solid $white;

        margin-top: 0.75em;
        padding-left: 1em;

        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;

        li {
          p {
            color: $white;
            font-size: 1.5em;

            span {
              color: $white2;
              font-style: italic;
              opacity: 50%;
            }
          }
        }
      }
    }

    .instructions {
      margin-top: 2em;
      h3 {
        margin: 1em;
        font-size: 4em;
        text-transform: uppercase;
        text-align: center;
      }

      p {
        font-size: $text + 0.5;
        text-align: justify;
        padding-left: 1rem;
        border-left: 4px solid $orange;

        &::first-letter {
          font-size: $text + 0.85;
        }
      }
    }
  }
}

.show {
  animation: pop-right 1s ease;
  @keyframes pop-right {
    from {
      transform: translateX(200px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

@media screen and (min-width: $large) {
  .youtube {
    display: none;
  }

  .content {
    .ingredients {
      ul {
        li {
          font-size: 1.7em;
        }
      }
    }
  }
}

@media screen and (min-width: $medium) and (max-width: $big) {
  .back,
  .youtube {
    display: none;
  }

  .mealName {
    font-size: 4rem;
  }
}

@media screen and (min-width: $xsmall) and (max-width: $small) {
  .back,
  .youtube {
    display: none;
  }

  .mealName {
    font-size: 4rem;
  }

  .container {
    .heading {
      flex-direction: column;
      text-align: center;
    }
  }
}

@media screen and (max-width: $xsmall) {
  .back,
  .youtube {
    display: none;
  }

  .mealName {
    font-size: 2.5rem;
  }

  .container {
    .heading {
      flex-direction: column;
      text-align: center;

      .meal-info {
        padding: 0;
        h2 {
          font-size: 3em;
        }
        p {
          font-size: 2em;
        }
      }
    }

    .content {
      align-items: center;
      .ingredients {
        h2 {
          text-align: center;
          font-size: 3em;
        }

        ul {
          -webkit-column-count: 1;
          -moz-column-count: 1;
          column-count: 1;

          li {
            p {
              font-size: 1.5em;
              margin: 0.5em 0;
            }
          }
        }
      }

      .instructions {
        h3 {
          margin: 0 0 1em 0;
          text-align: center;
          font-size: 2.5rem;
        }

        p {
          padding: 0;
          font-size: $text-mobile;
          margin-bottom: 0.75em;

          border: none;

          &::first-letter {
            font-size: $text + 0.25;
          }
        }
      }
    }
  }
}
</style>
