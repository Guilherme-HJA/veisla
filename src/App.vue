<script setup>

</script>

<template>
  <div>
    <header class="header">
      <h1 class="header__title">VEISLA</h1>
      <h2 class="header__subtitle">Your handy recipy library</h2>
    </header>
    <main>
      <div class="nav">
        <router-link to='/ingredients'>
          Ingredients</router-link> |
        <router-link to='/'>Home</router-link> |
        <router-link to='/categories'>Categories</router-link> |
        <router-link to='/areas'>Areas</router-link>
      </div>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="route.path">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </main>
    <footer>
      <strong>VEISLA</strong> by
      <a href="https://github.com/Guilherme-HJA"> Guilherme Araujo </a>,
      is made under MIT License. <br>
      Source code can be found on Github.
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@import './styles/variables';

* {
  margin: 0;
  padding: 0;
  font-family: $main-font;
}

.header {
  text-align: center;
  color: $black;

  &__title {
    font-size: $title;
    font-weight: 300;
  }

  &__subtitle {
    font-size: $subsubheading;
  }
}

.nav {
  margin: 1em 2em;

  text-transform: uppercase;
  text-align: center;
  font-size: 1.6rem;

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
}

a.router-link-active {
  border-bottom: 2px solid $orange;
}

footer {

  transition: transformY 0.5s ease;

  margin: 1em 0;
  text-align: center;
  font-size: 1.1rem;
}

@media screen and (max-width: 480px) {
  .header {
    &__title {
      font-size: $title-mobile;
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
