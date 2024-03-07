<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
</script>

<template>
  <div class="container page-wrapper">
    <div class="profile pt-10">
      <h1>Profile</h1>
      <div class="user-info mt-6">
        {{ userStore.currentUser }}
      </div>
    </div>
  </div>
</template>
