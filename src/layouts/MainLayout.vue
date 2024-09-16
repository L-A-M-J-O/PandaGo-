<script lang="ts" setup>
import { RouterView } from 'vue-router'
import MainFooter from '@/components/layouts/MainLayout/MainFooter.vue'
import MainNavbar from '@/components/layouts/MainLayout/MainNavbar.vue'
</script>

<template>
  <header><MainNavbar /></header>
  <main class="container mx-auto">
    <RouterView />
  </main>
  <footer><MainFooter /></footer>
</template>
