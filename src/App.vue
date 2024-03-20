<script setup>
import { onMounted, ref } from "vue";
import randomMeal from "./api/random";
import Footer from "./components/Footer.vue";

const randomMealLink = ref("");

async function getRandomMeal() {
  const response = await randomMeal();

  randomMealLink.value = `/meals/${response.idMeal}`;
}

onMounted(async () => {
  getRandomMeal();
});
</script>

<template>
  <div class="wrapper">
    <header>
      <div class="nav">
        <figure class="nav__image logo">
          <router-link class="logo__link" to="/"
            ><img loading="lazy" src="./assets/logo.svg" alt="veisla_logo"
          /></router-link>
        </figure>
        <div class="nav__links">
          <router-link @click="getRandomMeal" :to="randomMealLink"
            >Surprise Me</router-link
          >
          | <router-link to="/ingredients"> Ingredients</router-link> |
          <router-link to="/areas">Areas</router-link> |
          <router-link to="/categories">Categories</router-link> |
          <router-link to="/">Home</router-link>
        </div>
      </div>
    </header>
    <main>
      <section>
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <div :key="route.path">
              <component :is="Component"></component>
            </div>
          </transition>
        </router-view>
      </section>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import "./styles/variables";

* {
  margin: 0;
  padding: 0;
  font-family: $main-font;
}

.logo {
  &__link {
    border-bottom: none !important;
  }
}

.wrapper {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  min-width: 100%;

  display: grid;
  grid-template-rows: auto 1fr auto;
}

main {
  display: flex;
  flex-direction: column;
}

.nav {
  margin: 1em 2em;

  text-transform: uppercase;
  text-align: center;
  font-size: 1.6rem;

  display: flex;
  justify-content: center;
  align-content: center;

  a {
    text-decoration: none;
    color: $orange;

    &:hover {
      color: $darkorange2;
    }

    &:visited {
      color: $black;

      &:hover {
        color: $orange;
      }
    }
  }

  &__image {
    display: none;
    img {
      width: 100px;
      height: 100px;
    }
  }
}

a {
  cursor: pointer;
}

a.router-link-active {
  border-bottom: 2px solid $orange;
}

@media screen and (max-width: 480px) {
  .header {
    &__title {
      font-size: $title-mobile;
    }
  }

  .nav {
    flex-direction: column;

    &__image {
      display: block;
      img {
        max-height: auto;
        width: 100%;
      }
    }
  }

  .wrapper {
    grid-template-columns: 350px;
    justify-content: center;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
