<script lang="ts" setup>
import { RouterView } from 'vue-router'
import FooterPrimary from '@/components/layouts/MainLayout/FooterMain.vue'
import NavbarMain from '@/components/layouts/MainLayout/NavbarMain.vue'
</script>

<template>
  <header><NavbarMain /></header>
  <main class="container mx-auto">
    <RouterView />
  </main>
  <footer><FooterPrimary /></footer>
</template>
