<script>
export default {
  props: ["meal"],
};
</script>

<template>
  <router-link :to="'/meals/' + meal.idMeal">
    <div class="card">
      <div class="card__content">
        <div class="image">
          <figure>
            <img
              loading="lazy"
              width="400"
              height="400"
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
            />
          </figure>
        </div>
        <div class="details">
          <h1>{{ meal.strMeal }}</h1>
          <!--This is for the lists navigation, in the API those requests don't return the meal Category nor the Area-->
          <h2 v-if="meal.strCategory != null">
            {{ meal.strCategory }} | {{ meal.strArea }}
          </h2>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "../styles/variables";

$shadow-mobile: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);

* {
  font-family: $main-font;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.card {
  position: relative;

  width: 400px;
  height: auto;

  transition: all 0.7s ease;

  box-sizing: border-box;

  overflow: hidden;

  &:hover {
    transform: scale(1.07);
  }

  &:hover &__content {
    .image figure img {
      filter: brightness(60%);
      -webkit-filter: brightness(60%);
    }

    .details {
      opacity: 1;
    }
  }

  &__content {
    border-radius: 20px;

    .image {
      figure {
        img {
          border-radius: 20px;
          -webkit-transition: all 1s ease;
          -moz-transition: all 1s ease;
          -o-transition: all 1s ease;
          -ms-transition: all 1s ease;
          transition: all 1s ease;

          width: 100%;
          height: auto;

          min-width: 100%;
          min-height: auto;
        }
      }
    }

    .details {
      transition: all 1s ease;
      -webkit-transition: all 1s ease;
      color: $white;

      box-sizing: border-box;
      position: absolute;

      bottom: 12px;
      margin-left: 1em;

      opacity: 0;

      h1 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 250px;

        font-size: 1.7rem;
      }

      h2 {
        font-size: 1.3rem;
        font-weight: 400;
      }
    }
  }
}

@media screen and (max-width: $large) {
  .card {
    width: 400px;

    &__content {
      .image figure img {
        filter: brightness(70%);
        -webkit-filter: brightness(70%);
      }

      .details {
        opacity: 1;
      }
    }
  }
}

@media screen and (max-width: $big) {
  .card {
    width: 400px;
  }
}

@media screen and (max-width: 1000px) and (min-width: $medium) {
  .card {
    width: 400px;
  }
}

@media screen and (max-width: 480px) {
  .card {
    width: 300px;

    &__content {
      .details {
        h3 {
          font-size: $text-mobile;
        }
        h4 {
          font-size: $text-mobile;
        }
      }
    }
  }
}
</style>
