<script setup>
import { ref, watch, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useUserStore } from "@/stores/user.js";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const route = useRoute();
const mobileMenuOpen = ref(false);
const profileMenuOpen = ref(false);
const profileDropdown = ref(null);

const userInitials = computed(() => {
  const userInfo = userStore.currentUser;
  return userInfo?.username
    .split(" ")
    .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
    .join("");
});

onClickOutside(profileDropdown, () => (profileMenuOpen.value = false));

watch(
  () => isLoggedIn,
  () => {
    userInitials();
  }
);

const handleLogout = () => {
  mobileMenuOpen.value = false;
  profileMenuOpen.value = false;
  userStore.logout();
  localStorage.removeItem("user-token");
  router.go({ name: "login" });
};
</script>

<template>
  <nav class="bg-gray-800 fixed z-20 top-0 left-0 w-full shadow-md">
    <div class="container">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <!-- Mobile menu icon open/closed -->
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                :d="
                  mobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                "
              />
            </svg>
          </button>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <RouterLink
            :to="{ name: 'home' }"
            class="flex flex-shrink-0 items-center"
          >
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt=""
            />
          </RouterLink>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                :to="{ name: 'home' }"
                class="rounded-md px-3 py-2 text-sm font-medium"
                :class="
                  route.name == 'home'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                "
                aria-current="page"
                >Home</RouterLink
              >
              <RouterLink
                :to="{ name: 'admin' }"
                class="rounded-md px-3 py-2 text-sm font-medium"
                :class="
                  route.name == 'admin'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                "
              >
                Admin
              </RouterLink>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <RouterLink
            :to="{ name: 'login' }"
            class="text-gray-300 hover:text-white text-sm font-medium"
            v-if="!isLoggedIn"
          >
            Login
          </RouterLink>

          <!-- Profile dropdown -->
          <div ref="profileDropdown" class="relative ml-3" v-if="isLoggedIn">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                @click="profileMenuOpen = !profileMenuOpen"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <span
                  class="p-1 rounded-full flex items-center justify-center text-base text-white border"
                  >WA</span
                >
              </button>
            </div>
            <div
              class="right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              :class="profileMenuOpen ? 'absolute' : 'hidden'"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <RouterLink
                :to="{ name: 'profile' }"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
              >
                Your Profile
              </RouterLink>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
                @click="handleLogout"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      class="sm:hidden"
      :class="mobileMenuOpen ? 'block' : 'hidden'"
      id="mobile-menu"
    >
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a
          href="#"
          class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
          aria-current="page"
          >Admin</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Team</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Projects</a
        >
        <a
          href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >Calendar</a
        >
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
