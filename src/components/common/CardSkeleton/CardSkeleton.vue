<template>
  <div class="bg-gray-200 animate-pulse rounded-lg p-4 shadow-lg">
    <!-- Imagen -->
    <div class="h-40 bg-gray-300 rounded-lg mb-4"></div>

    <!-- Título -->
    <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

    <!-- Descripción corta -->
    <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>

    <!-- Otro campo -->
    <div class="h-4 bg-gray-300 rounded w-1/3"></div>
  </div>
</template>

<script setup lang="ts">
// No hay lógica para el skeleton, ya que solo es una plantilla de carga.
</script>

<style scoped>
/* Agrega animación de "pulse" para el efecto de carga */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
