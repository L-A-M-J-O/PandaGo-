<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { ComicModel } from '@/domains/comic/models/comic'

const props = defineProps<{
  comic: ComicModel
}>()

const getComicImageUrl = (comic: ComicModel) => {
  return `${comic.thumbnail.path}.${comic.thumbnail.extension}`
}

const formatPrice = (price: number) => {
  return price ? `$${price.toFixed(2)}` : 'Price unavailable'
}

const showFullDescription = ref(false)

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}
const truncatedDescription = computed(() => {
  if (props.comic.description && props.comic.description.length > 100) {
    return showFullDescription.value
      ? props.comic.description
      : props.comic.description.substring(0, 100) + '...'
  }
  return props.comic.description || 'Description not available'
})
</script>

<template>
  <div class="max-w-sm w-full">
    <div
      class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
    >
      <div class="relative">
        <img
          :src="getComicImageUrl(props.comic)"
          alt="Portada de {{ props.comic.title }}"
          class="w-full h-64 object-cover"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
        >
          <h2 class="text-white text-xl font-bold">{{ props.comic.title }}</h2>
          <span class="text-gray-300 text-sm">{{
            props.comic.modified || 'Unknown Publisher'
          }}</span>
        </div>
      </div>
      <div class="p-4 space-y-2">
        <div class="flex justify-between items-center">
          <p class="text-gray-600 text-sm">
            {{ truncatedDescription }}
          </p>
        </div>
        <div
          v-if="props.comic.description && props.comic.description.length > 100"
          class="flex justify-end"
        >
          <button @click="toggleDescription" class="text-blakc-500">
            <span v-if="!showFullDescription">👁️ show more</span>
            <span v-else>👁️ show less</span>
          </button>
        </div>

        <span class="text-gray-600 text-sm">
          {{ new Date(props.comic.dates[0]?.date || '').toLocaleDateString() || 'Unknown Date' }}
        </span>
        <div class="flex justify-between items-center pt-2">
          <div class="flex items-center space-x-1">
            <img src="/src/assets/images/dolar.png" alt="price" />
            <span class="text-green-600 font-semibold">
              {{ formatPrice(props.comic.prices[0]?.price || 0) }}
            </span>
          </div>
          <RouterLink
            :to="{ name: 'ComicDetail', params: { id: props.comic.id } }"
            class="bg-green-700 hover:bg-[#046C4E] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-300"
          >
            👁️
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
