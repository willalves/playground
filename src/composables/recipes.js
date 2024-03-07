import { ref, onMounted } from "vue";
import http from "@/services/http.js";

export function useRecipes() {
  const isLoading = ref(false);
  const allRecipes = ref(null);
  const allTags = ref(null);
  const recipesByTag = ref(null);
  const tagSelected = ref(false);
  const searching = ref(false);
  const recipesBySearch = ref(null);
  const singleRecipe = ref(null);

  const fetchAllRecipes = async () => {
    isLoading.value = true;
    try {
      const { data } = await http.get("/");
      allRecipes.value = data.recipes;
    } catch (error) {
      console.log(error?.value?.data);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchAllTags = async () => {
    isLoading.value = true;
    try {
      const { data } = await http.get("/tags");
      allTags.value = data;
    } catch (error) {
      console.log(error?.value?.data);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchRecipeByTag = async (tag) => {
    isLoading.value = true;
    tagSelected.value = true;
    try {
      const { data } = await http.get(`/tag/${tag}`);
      recipesByTag.value = data.recipes;
    } catch (error) {
      console.log(error?.value?.data);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchRecipeBySearch = async (searchValue) => {
    searchValue.value ? (searching.value = true) : (searching.value = false);
    isLoading.value = true;
    try {
      const { data } = await http.get(`/search?q=${searchValue.value}`);
      recipesBySearch.value = data.recipes;
    } catch (error) {
      console.log(error?.value?.data);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchRecipeById = async (recipeId) => {
    isLoading.value = true;
    try {
      const { data } = await http.get(`/${recipeId}`);
      singleRecipe.value = data;
    } catch (error) {
      console.log(error?.value?.data);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchAllRecipes();
    fetchAllTags();
  });

  return {
    allRecipes,
    allTags,
    fetchRecipeByTag,
    recipesByTag,
    tagSelected,
    fetchRecipeBySearch,
    recipesBySearch,
    searching,
    fetchRecipeById,
    singleRecipe,
    isLoading,
  };
}
