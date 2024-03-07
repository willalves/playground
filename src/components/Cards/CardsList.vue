<script setup>
import { ref } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import Card from "./Card.vue";

const props = defineProps({
  list: {} | [],
});
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4 mt-4 py-10">
    <div v-for="item in list" :key="item.id">
      <Card :item="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
