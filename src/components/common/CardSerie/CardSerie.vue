<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { SerieModel } from '@/domains/serie/models/serie'

const props = defineProps<{
  serie: SerieModel
}>()

const getSerieImageUrl = (serie: SerieModel) => {
  return `${serie.thumbnail.path}.${serie.thumbnail.extension}`
}

// Lógica del "ojito" para manejar el estado de ver más o menos
const showFullDescription = ref(false)

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

// Computed para obtener la descripción truncada o completa
const truncatedDescription = computed(() => {
  if (props.serie.description && props.serie.description.length > 100) {
    return showFullDescription.value
      ? props.serie.description
      : props.serie.description.substring(0, 100) + '...'
  }
  return props.serie.description || 'No description available'
})
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
  >
    <img
      :src="getSerieImageUrl(props.serie)"
      :alt="props.serie.title"
      class="w-full h-48 object-cover"
    />
    <div class="p-4 flex flex-col">
      <h3 class="font-bold text-lg mb-2">{{ props.serie.title }}</h3>

      <!-- Descripción de la serie -->
      <p class="text-sm text-gray-600 mb-2">
        {{ truncatedDescription }}
      </p>
      <div
        v-if="props.serie.description && props.serie.description.length > 100"
        class="flex justify-start"
      >
        <button @click="toggleDescription" class="text-red-600">
          <span v-if="!showFullDescription">👁️</span>
          <span v-else>👁️</span>
        </button>
      </div>

      <!-- Botón ojito para mostrar/ocultar descripción -->

      <div class="text-sm text-gray-500 mt-4">
        <p>Start Year: {{ props.serie.startYear }}</p>
        <p>End Year: {{ props.serie.endYear }}</p>
        <p>Rating: {{ props.serie.rating || 'No rating' }}</p>
      </div>

      <!-- Botón de ver más detalles -->
      <RouterLink
        :to="{ name: 'SerieDetail', params: { id: props.serie.id } }"
        class="text-red-700 hover:underline mt-4 inline-block"
        target="_blank"
      >
        View More Details
      </RouterLink>
    </div>
  </div>
</template>
