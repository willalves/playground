<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  allTags: {} | [],
});

const selectedTag = ref("");
const selectTag = ref(false);
const tagsDropdown = ref(null);
const emit = defineEmits(["tag-selected", "clear-tag"]);

onClickOutside(tagsDropdown, () => (selectTag.value = false));

const handleSelectTag = (e) => {
  selectedTag.value = e.target.outerText;
  selectTag.value = false;
  emit("tag-selected", selectedTag.value);
};

const clearSelectedTag = () => {
  selectedTag.value = "";
  emit("clear-tag");
};
</script>

<template>
  <div class="all-tags my-4">
    <div class="text-center flex justify-center items-center">
      <button
        @click="selectTag = !selectTag"
        class="cursor-pointer underline hover:no-underline mr-2"
      >
        Or select a tag:
      </button>
      <p class="text-indigo-500">
        {{ selectedTag }}
      </p>
      <span
        v-if="selectedTag"
        class="transition-transform rotate-45 text-xl cursor-pointer text-red-600 ml-1"
        @click="clearSelectedTag"
        >+</span
      >
    </div>
    <div
      v-if="selectTag"
      class="tags-list mt-4 flex flex-wrap gap-2 mx-auto max-w-7xl absolute z-10 bg-white p-4 shadow-lg rounded-md"
      ref="tagsDropdown"
    >
      <span
        v-for="tag in allTags"
        :key="tag"
        class="cursor-pointer border border-indigo-500 px-2 py-1 text-sm rounded-full transition"
        :class="
          selectedTag === tag
            ? 'bg-indigo-500 text-white'
            : 'text-indigo-500 hover:bg-indigo-100'
        "
        @click="handleSelectTag"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
