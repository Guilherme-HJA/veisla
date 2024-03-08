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
            ><img src="./assets/logo.webp" alt="veisla_logo"
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
    <Footer />
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
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

main {
  min-height: 100vh;
  min-width: 100%;
}

.nav {
  margin: 1em 2em;

  text-transform: uppercase;
  text-align: center;
  font-size: 1.6rem;

  display: flex;
  justify-content: space-between;

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
    display: flex;
    align-items: center;
    justify-content: center;

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

    img {
      height: 300px;
      width: 300px;
    }
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
