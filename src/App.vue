<script setup>
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="main">
    <main>
      <div class="nav">
        <figure class="nav__image logo">
          <router-link class="logo__link" to="/"><img src="./assets/logo.png" alt="veisla_logo"></router-link>
        </figure>
        <div class="nav__links">
          <router-link to='/ingredients'>
            Ingredients</router-link> |
          <router-link to='/'>Home</router-link> |
          <router-link to='/categories'>Categories</router-link> |
          <router-link to='/areas'>Areas</router-link>
        </div>
      </div>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="route.path">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import './styles/variables';

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

.main {
  position: relative;
  min-height: 100vh;
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
