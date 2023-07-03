<script>
export default {
  props: ['meal'],
}
</script>

<template>
  <router-link :to="'/meals/' + meal.idMeal">
    <div class="card">
      <div class="card__header">
        <div class="card__image">
          <figure class="image">
            <img :src="meal.strMealThumb" alt="image">
          </figure>
        </div> <!-- card__image -->
        <h3> {{ meal.strMeal }} </h3>
      </div> <!-- card__header -->
    </div> <!-- card -->
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 6px;

  text-align: center;

  border-radius: 10px;

  width: 350px;

  padding: 10px;

  transition: all 1s ease;

  &:hover {
    scale: 1.1;
    transition: all 1s ease;
    background: #e0e0e0;
    box-shadow: 12px 12px 24px #afafaf, -12px -12px 24px #ffffff;
  }

  &:hover &__image .image img {
    transform: scale(1.1);
    transition: transform 1s ease;
  }

  &__header {
    border-radius: 5px;

    h3 {
      margin-top: 4px;
      font-size: 2.0rem;
      color: $black;
    }
  }

  &__image {
    .image {
      overflow: hidden;
      border-radius: 7px;

      img {
        max-width: 100%;
        height: auto;
        transition: transform 0.50s ease-in;
      }
    }
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;

    button {
      padding: 5px 30px;

      border: none;
      border-radius: 20px;

      cursor: pointer;

      &.button-view {
        font-size: 1.6rem;
        font-weight: 600;

        color: $orange;
        background: none;
        transition: background-color 0.30s ease;

        &:hover {
          background-color: $orange;
          color: $white;
          transition: background-color 0.30s ease, color 0.10s ease;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .card {
    width: 350px;
    background: $white;
    padding: 0;

    box-shadow: $shadow-mobile;
  }
}

@media screen and (min-width: 480px) and (max-width: 768px) {
  .card {
    padding: 0;

    background: $white;
    box-shadow: $shadow-mobile;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .card {
    padding: 0;

    background: $white;
    box-shadow: $shadow-mobile;
  }
}
</style>
