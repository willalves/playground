<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const userStore = useUserStore();
const nameInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const register = ref(false);

const handleSubmit = (submitType) => {
  if (submitType === "register") {
    userStore.register(nameInput.value, emailInput.value, passwordInput.value);

    toast.success(`Thank you ${nameInput.value}, for creating an account`);

    register.value = false;
  }

  if (submitType === "login") {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      if (emailInput.value !== userInfo.email) {
        toast.error("No user found with this email address");
      } else if (passwordInput.value !== userInfo.password) {
        toast.error("Incorrect password");
      } else {
        toast.success(`Welcome ${userInfo.username}`, { autoClose: 1000 });
        localStorage.setItem(
          "user-token",
          Math.random().toString(36).substr(2)
        );
        userStore.login(emailInput.value, passwordInput.value);

        nameInput.value = "";

        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      }
    } else {
      toast.error("No user found with this credentials");
    }
  }
};
</script>

<template>
  <div
    class="page-wrapper bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
  >
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="leading-tight tracking-tight text-white">
          {{ register ? "Sign up" : "Sign in" }}
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="">
          <div v-if="register">
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required=""
              v-model="nameInput"
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
              v-model="emailInput"
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              v-model="passwordInput"
            />
          </div>
          <button
            class="w-full border text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 hover:bg-slate-600 transition focus:bg-white focus:text-gray-900"
            @click="handleSubmit(register ? 'register' : 'login')"
          >
            {{ register ? "Sign up" : "Sign in" }}
          </button>
          <p
            class="text-sm font-light text-gray-500 dark:text-gray-400"
            v-if="register"
          >
            Already have an account?
            <a
              class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
              @click="register = !register"
            >
              Sign in
            </a>
          </p>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400" v-else>
            Don't have an account yet?
            <a
              class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
              @click="register = !register"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
