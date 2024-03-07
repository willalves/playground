<script setup>
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core";

const searchInput = ref("");
const emit = defineEmits(["search"]);

watchDebounced(
  searchInput,
  () => {
    emit("search", searchInput);
  },
  { debounce: 1000, maxWait: 5000 }
);
</script>

<template>
  <div
    class="search-box mt-6 border rounded-full flex items-center justify-center sm:w-[60vw] md:w-[30vw] py-1 px-4 mx-auto"
  >
    <input
      type="text"
      placeholder="Search"
      class="w-full focus:outline-none"
      v-model="searchInput"
    />
    <span
      v-if="searchInput"
      class="transition-transform rotate-45 text-xl cursor-pointer text-red-600 ml-1"
      @click="searchInput = ''"
      >+</span
    >
  </div>
</template>

<style lang="scss" scoped></style>
