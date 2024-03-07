<script setup>
const props = defineProps({
  item: {},
});
</script>
<template>
  <routerLink :to="{ name: 'recipe', params: { id: item.id } }">
    <div
      class="shadow-md p-2 rounded-md hover:shadow-lg cursor-pointer transition w-72"
    >
      <div class="flex flex-col">
        <div class="card-heading">
          <div
            class="rating flex items-center -mb-7 relative justify-end bg-gray-800 bg-opacity-30 p-1"
          >
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
            <p class="text-sm font-bold text-white">
              {{ item.rating?.toFixed(2) }}
            </p>
            <span class="w-1 h-1 mx-1.5 bg-white rounded-full"></span>
            <a
              href="#"
              class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              {{ item.reviewCount }} reviews
            </a>
          </div>
          <img :src="item.image" alt="" class="w-full h-64 rounded-md" />
        </div>
        <div class="card-content mt-4">
          <div class="tags flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in item.tags"
              :key="index"
              class="text-xs font-light border border-indigo-700 text-indigo-700 rounded-full py-1 px-2"
            >
              {{ tag }}
            </span>
          </div>
          <div class="">
            <h3 class="card-title font-semibold mt-2">{{ item.name }}</h3>
            <div class="flex justify-between text-sm mt-2">
              <p>Time: {{ item.prepTimeMinutes }}min</p>
              <p>People: {{ item.servings }}</p>
              <p>Difficulty: {{ item.difficulty }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </routerLink>
</template>

<style lang="scss" scoped></style>
