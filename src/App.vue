<template>
  <header>
    <Navbar />
  </header>

  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<style scoped></style>
