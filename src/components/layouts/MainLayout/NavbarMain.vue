<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)
const isDarkMode = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Detectar la preferencia de modo oscuro del sistema o localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <nav class="bg-white dark:bg-gray-900 text-slate-800 dark:text-white shadow-md">
    <div class="container mx-auto px-8 py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-2xl font-bold">
        <RouterLink to="/" class="hover:text-[#2ED926] transition-colors">
          <img src="/src/assets/images/pandaGo.png" alt="PandaGo" width="140" />
        </RouterLink>
      </div>

      <!-- Links (Desktop) -->
      <div class="hidden md:flex space-x-6">
        <RouterLink to="/" rel="noopener noreferrer" class="hover:text-[#2ED926] transition-colors">
          Home
        </RouterLink>
        <a
          href="https://developer.marvel.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[#2ED926] transition-colors"
        >
          About
        </a>
        <a
          href="https://developer.marvel.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[#2ED926] transition-colors"
        >
          Services
        </a>
        <a
          href="https://developer.marvel.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[#2ED926] transition-colors"
        >
          Contact
        </a>
      </div>

      <!-- Dark Mode Toggle and Search (Desktop) -->
      <div class="hidden md:flex items-center space-x-4">
        <!-- Dark Mode Button -->
        <button
          @click="toggleDarkMode"
          class="focus:outline-none rounded-full p-[4px] border-2 border-slate-100 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 h"
        >
          <svg
            v-if="!isDarkMode"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M19.6065 16.1775C18.9417 16.387 18.234 16.5 17.5 16.5C13.634 16.5 10.5 13.366 10.5 9.5C10.5 7.54163 11.3042 5.77109 12.6004 4.50062C12.567 4.50021 12.5335 4.5 12.5 4.5C8.08172 4.5 4.5 8.08172 4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C15.5924 20.5 18.275 18.7454 19.6065 16.1775Z"
              stroke="#121923"
              stroke-width="1.2"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 25 25"
            fill="none"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M19 12.5H22M3 12.5H6M12.5 6V3M12.5 22V19M17.3891 7.61091L19.5104 5.48959M5.48959 19.5104L7.61091 17.3891M7.61091 7.61091L5.48959 5.48959M19.5104 19.5104L17.3891 17.3891M16 12.5C16 14.433 14.433 16 12.5 16C10.567 16 9 14.433 9 12.5C9 10.567 10.567 9 12.5 9C14.433 9 16 10.567 16 12.5Z"
                stroke="#ffffff"
                stroke-width="1.2"
              />
            </g>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg
            v-if="!isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            aria-hidden="true"
            style="pointer-events: none; display: inherit; width: 100%; height: 100%"
          >
            <path
              d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-white dark:bg-gray-900 text-slate-800 dark:text-white"
    >
      <RouterLink to="/" class="block px-4 py-2 hover:bg-[#2ED926] hover:text-white"
        >Home</RouterLink
      >
      <a
        href="https://developer.marvel.com/docs"
        target="_blank"
        rel="noopener noreferrer"
        class="block px-4 py-2 hover:bg-[#2ED926] hover:text-white transition-colors"
      >
        About
      </a>
      <a
        href="https://developer.marvel.com/docs"
        target="_blank"
        rel="noopener noreferrer"
        class="block px-4 py-2 hover:bg-[#2ED926] hover:text-white transition-colors"
      >
        Services
      </a>
      <a
        href="https://developer.marvel.com/docs"
        target="_blank"
        rel="noopener noreferrer"
        class="block px-4 py-2 hover:bg-[#2ED926] hover:text-white transition-colors"
      >
        Contact
      </a>

      <!-- Dark Mode Toggle for Mobile -->
      <div class="px-4 py-2 flex justify-center">
        <button
          @click="toggleDarkMode"
          class="focus:outline-none rounded-full p-[4px] border-2 border-slate-100 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 h"
        >
          <svg
            v-if="!isDarkMode"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M19.6065 16.1775C18.9417 16.387 18.234 16.5 17.5 16.5C13.634 16.5 10.5 13.366 10.5 9.5C10.5 7.54163 11.3042 5.77109 12.6004 4.50062C12.567 4.50021 12.5335 4.5 12.5 4.5C8.08172 4.5 4.5 8.08172 4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C15.5924 20.5 18.275 18.7454 19.6065 16.1775Z"
              stroke="#121923"
              stroke-width="1.2"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 25 25"
            fill="none"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M19 12.5H22M3 12.5H6M12.5 6V3M12.5 22V19M17.3891 7.61091L19.5104 5.48959M5.48959 19.5104L7.61091 17.3891M7.61091 7.61091L5.48959 5.48959M19.5104 19.5104L17.3891 17.3891M16 12.5C16 14.433 14.433 16 12.5 16C10.567 16 9 14.433 9 12.5C9 10.567 10.567 9 12.5 9C14.433 9 16 10.567 16 12.5Z"
                stroke="#ffffff"
                stroke-width="1.2"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
