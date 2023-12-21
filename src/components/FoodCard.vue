<script>
export default {
  props: ['meal'],
}
</script>

<template>
  <router-link :to="'/meals/' + meal.idMeal">
    <div class=card>
      <div class="card__content">
        <div class="image">
          <figure>
            <img :src="meal.strMealThumb" :alt="meal.strMeal">
          </figure>
        </div>
        <div class="details">
          <h3> {{ meal.strMeal }} </h3>
          <h4 v-if="meal.strCategory != null"> {{ meal.strCategory }} | {{ meal.strArea }}</h4>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

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

  &:hover {
    scale: 1.1;
  }

  &:hover &__content {
    .image figure img {
      filter: brightness(70%);
      transform: scale(1.07);
      -webkit-filter: brightness(70%);
    }

    .details {
      opacity: 1;
    }
  }

  &__content {

    border-radius: 10px;
    overflow: hidden;

    .image {

      figure {
        overflow: hidden;

        img {
          -webkit-transition: all 1s ease;
          -moz-transition: all 1s ease;
          -o-transition: all 1s ease;
          -ms-transition: all 1s ease;
          transition: all 1s ease;

          max-width: 100%;
          height: auto;
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

      h3 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 300px;

        font-size: 1.7rem;
      }

      h4 {
        font-size: 1.3rem;
        font-weight: 400;
      }
    }
  }
}

@media screen and (max-width: $large) {
  .card {
    width: 350px;


    &__content {
      .image figure img {
        filter: brightness(80%);
        -webkit-filter: brightness(80%);
      }

      .details {
        opacity: 1;
      }
    }
  }
}
</style>
