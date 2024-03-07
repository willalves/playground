<script setup>
import { onBeforeMount, ref } from "vue";

import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import http from "@/services/http.js";
import CardList from "@/components/Cards/CardsList.vue";
import Loading from "@/components/Loading.vue";
import SearchInput from "@/components/SearchInput.vue";
import Tags from "@/components/Tags.vue";
import { useRecipes } from "@/composables/recipes.js";

const userStore = useUserStore();
const router = useRouter();

const {
  allRecipes,
  allTags,
  fetchRecipeByTag,
  recipesByTag,
  tagSelected,
  fetchRecipeBySearch,
  recipesBySearch,
  searching,
  isLoading,
} = useRecipes();

onBeforeMount(() => {
  const userToken = localStorage.getItem("user-token");
  if (!userToken) return router.push({ name: "login" });
});
</script>

<template>
  <div class="container page-wrapper">
    <div class="page-header pt-10">
      <h1 class="text-2xl text-center">Search and Filter recipes</h1>
      <SearchInput v-on:search="fetchRecipeBySearch" />
      <Tags
        v-on:tag-selected="fetchRecipeByTag"
        v-on:clear-tag="tagSelected = false"
        :allTags="allTags"
      />
    </div>
    <Loading :is-loading="isLoading" />
    <div v-if="allRecipes" class="">
      <CardList
        :list="
          tagSelected ? recipesByTag : searching ? recipesBySearch : allRecipes
        "
      />
    </div>
  </div>
</template>
