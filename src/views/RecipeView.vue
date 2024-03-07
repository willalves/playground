<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRecipes } from "@/composables/recipes.js";
import Loading from "@/components/Loading.vue";
import CardList from "@/components/Cards/CardsList.vue";

const route = useRoute();
const router = useRouter();
const recipeId = route.params.id;

const {
  fetchRecipeById,
  singleRecipe,
  fetchRecipeByTag,
  recipesByTag,
  isLoading,
} = useRecipes();

const handleRelatedRecipes = () => {
  const tagsArr = singleRecipe.value.tags;

  tagsArr?.forEach((tag) => {
    fetchRecipeByTag(tag);
  });
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    router.go({ name: "recipe", params: route.params.id });
  }
);

onMounted(() => {
  fetchRecipeById(recipeId);
  setTimeout(() => {
    handleRelatedRecipes();
  }, 500);
});
</script>

<template>
  <Loading :is-loading="isLoading" />
  <div class="container page-wrapper pt-10">
    <div class="recipe-wrapper">
      <div class="flex flex-col md:flex-row gap-4">
        <img :src="singleRecipe?.image" alt="" class="w-60 h-60" />
        <div class="header-content flex flex-col gap-2">
          <h1 class="text-2xl">{{ singleRecipe?.name }}</h1>
          <div class="rating flex items-center p-1">
            <svg
              class="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
            <p class="text-sm font-bold text-gray-800">
              {{ singleRecipe?.rating?.toFixed(2) }}
            </p>
            <span class="w-1 h-1 mx-1.5 bg-gray-800 rounded-full"></span>
            <a
              href="#"
              class="text-sm font-bold text-gray-900 underline hover:no-underline"
            >
              {{ singleRecipe?.reviewCount }} reviews
            </a>
          </div>
          <div class="tags flex gap-2">
            <span
              v-for="tag in singleRecipe?.tags"
              :key="tag"
              class="text-xs font-light border border-indigo-700 text-indigo-700 rounded-full py-1 px-2"
            >
              {{ tag }}
            </span>
          </div>
          <div class="flex gap-2">
            <p>Meal type:</p>
            <span v-for="mealType in singleRecipe?.mealType" :key="mealType">
              {{ mealType }}
            </span>
          </div>
          <div>
            <p>Calories per serving: {{ singleRecipe?.caloriesPerServing }}</p>
          </div>
          <div>
            <p>Cuisine: {{ singleRecipe?.cuisine }}</p>
          </div>
          <div class="flex justify-between gap-3">
            <p>Time: {{ singleRecipe?.prepTimeMinutes }}min</p>
            <p>People: {{ singleRecipe?.servings }}</p>
            <p>Difficulty: {{ singleRecipe?.difficulty }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-10">
        <div class="ingredients mt-4">
          <h3 class="text-xl">Ingredients:</h3>
          <ul>
            <li
              v-for="ingredients in singleRecipe?.ingredients"
              :key="ingredients"
              class=""
            >
              {{ ingredients }}
            </li>
          </ul>
        </div>
        <div class="instructions mt-4">
          <h3 class="text-xl">Instructions</h3>
          <ul>
            <li
              v-for="instructions in singleRecipe?.instructions"
              :key="instructions"
              class="list-decimal ml-4"
            >
              {{ instructions }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-20 flex flex-col justify-start items-center md:items-start">
      <h2>Related recipes</h2>
      <CardList :list="recipesByTag" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
