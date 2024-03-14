<script setup>
import { defineAsyncComponent, onMounted, ref, watch } from "vue";
import filter from "../api/filter";
import getLists from "../api/list";
import { useRoute } from "vue-router";

const route = useRoute();

const FoodCard = defineAsyncComponent(
  () => import("../components/FoodCard.vue"),
);

const currType = ref();
const typeList = ref();
const selectedType = ref("Select one on the list");

const asideVisible = ref(false);
const cardsloaded = ref(false);

const meals = ref();

watch(
  () => route.params.type,
  async (newType) => {
    asideVisible.value = false;
    await loadList(newType.toString());
    currType.value = newType;
    asideVisible.value = true;
  },
  { immediate: true },
);

async function loadList(type) {
  const res = await getLists(type.charAt(0));

  //Different from Categories and Areas, Ingredients do not return an Object<Array<>>
  //It returns an Array<Object> so this condition is to sort them out.
  typeList.value =
    type !== "ingredients"
      ? res
          .map((item) => {
            return Object.values(item).join();
          })
          .sort()
      : res.map((item) => item.strIngredient).sort();
}

async function fetchMealsByType(type, query) {
  cardsloaded.value = false;
  const res = await filter(type.charAt(0), query);
  meals.value = res;
  selectedType.value = res !== null ? query : "Nothing here...";
  cardsloaded.value = true;
}
</script>

<template>
  <div>
    <div class="wrapper">
      <transition name="fade">
        <aside class="side-nav" v-show="asideVisible">
          <h1>{{ currType }}</h1>
          <ul>
            <li v-for="type in typeList">
              <input
                type="radio"
                name="rd-type"
                :value="type"
                :id="type"
                @input="fetchMealsByType(currType, type)"
              />
              <label :for="type">{{ type }}</label>
            </li>
          </ul>
        </aside>
      </transition>
      <div class="cards-space">
        <h1 class="item-name">{{ selectedType }}</h1>
        <Transition name="fade">
          <div class="cards-space__container" v-if="cardsloaded">
            <FoodCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables";

* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  box-sizing: border-box;
  color: $white;
}

.wrapper {
  height: 100%;
  display: grid;
  grid-template-areas: "aside content";
  grid-template-columns: 400px 1fr;

  margin-bottom: 2em;

  align-content: center;

  .side-nav {
    margin-left: -1em;
    width: 400px;
    height: 100vh;
    grid-area: aside;

    background-color: $darkorange;
    border-radius: 0 30px 30px 0;

    display: flex;
    flex-direction: column;
    align-content: center;
    row-gap: 2em;

    padding-top: 1em;

    h1 {
      text-align: center;
      font-size: $subsubheading;
      text-transform: uppercase;
    }

    ul {
      overflow: scroll;
      padding: 1em 0;
      display: flex;
      flex-direction: column;
      row-gap: 2em;
      margin: 0 2em;
      list-style: none;

      li {
        display: flex;
        max-height: 100px;
        input[type="radio"] {
          visibility: hidden;
          margin: 0;
          padding: 0;

          &:checked + label {
            background-color: $white;
            color: $darkorange;
          }
        }
        label {
          overflow: hidden;
          cursor: pointer;

          font-size: 1.5rem;
          text-overflow: ellipsis;
          text-align: left;

          padding: 0.5em 1em;
          border-radius: 5px;

          transition:
            color 0.4s ease,
            background-color 0.4s ease;
        }
      }
    }
  }

  .cards-space {
    grid-area: content;

    display: flex;
    flex-direction: column;
    align-content: center;

    .item-name {
      text-transform: uppercase;
      text-align: center;
      font-size: 4rem;
      color: $black;
    }

    &__container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      justify-items: center;
      row-gap: 3em;
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

@media screen and (max-width: 1024px) {
  .wrapper {
    grid-template-areas:
      "aside"
      "content";
    grid-template-rows: 300px 1fr;
    grid-template-columns: auto;

    justify-items: center;

    row-gap: 3em;

    padding: 0.4em;

    .side-nav {
      width: 100%;
      margin: 0;
      max-height: 300px;
      border-radius: 3px;
      justify-content: center;

      ul {
        margin: 0;
        li {
          justify-content: center;

          label {
            text-align: center;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) and (min-width: 480px) {
}

@media screen and (max-width: 480px) {
  .wrapper {
    .cards-space {
      align-items: center;

      .item-name {
        font-size: 3.2rem;
      }

      &__container {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }
  }
}
</style>
