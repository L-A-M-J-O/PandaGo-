<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAdapterEventById } from '@/domains/event/adapters/getAdapterEvent'
import { EventModel } from '@/domains/event/models/event'

const route = useRoute()
const eventDetail = ref<EventModel>()

onMounted(async () => {
  const id = route.params.id as string
  try {
    eventDetail.value = await getAdapterEventById(id)
    console.log(eventDetail.value)
  } catch (error) {
    console.error('Error fetching event details', error)
  }
})

const getEventImageUrl = (event: EventModel) => {
  return `${event.thumbnail.path}.${event.thumbnail.extension}`
}
</script>

<template>
  <div v-if="eventDetail" class="px-4 py-8">
    <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <!-- Event Hero Section -->
      <div class="relative">
        <img
          :src="getEventImageUrl(eventDetail)"
          :alt="eventDetail.title"
          class="w-full h-96 object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <h2 class="text-6xl font-bangers tracking-wide text-green-400 mb-2 drop-shadow-lg">
            {{ eventDetail.title }}
          </h2>
          <p class="text-2xl text-gray-300 mb-4">{{ eventDetail.description }}</p>
          <div class="flex flex-wrap gap-4 mb-6">
            <span class="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full"
              >Crossover Event</span
            >
            <span class="bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full"
              >{{ new Date(eventDetail.start).getFullYear() }} -
              {{ new Date(eventDetail.end).getFullYear() }}</span
            >
          </div>
        </div>
      </div>

      <!-- Event Description -->
      <div class="p-8">
        <p class="text-gray-900 text-lg mb-6">
          {{ eventDetail.description || 'No description available for this event.' }}
        </p>
        <div class="flex flex-wrap gap-4 mb-8">
          <a
            href="#"
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >Read Now</a
          >
          <a
            href="#"
            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >Add to Reading List</a
          >
        </div>
      </div>

      <!-- Key Issues Section -->
      <div class="bg-gray-200 p-8">
        <h3 class="text-3xl font-bangers tracking-wide text-green-400 mb-6">Key Issues</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6"></div>
      </div>

      <!-- Creators Section -->
      <div class="p-8">
        <h3 class="text-3xl font-bangers tracking-wide text-green-400 mb-6">Creators</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="creator in eventDetail.creators.items"
            :key="creator.resourceURI"
            class="flex items-center space-x-4 bg-gray-200 rounded-lg p-4"
          >
            <img src="" alt="Creator Avatar" class="w-16 h-16 rounded-full" />
            <div>
              <p class="font-semibold text-gray-900">{{ creator.name }}</p>
              <p class="text-gray-700">{{ creator.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Characters Section -->
      <div class="bg-gray-200 p-8">
        <h3 class="text-3xl font-bangers tracking-wide text-green-400 mb-6">Key Characters</h3>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="character in eventDetail.characters.items"
            :key="character.resourceURI"
            class="bg-gray-100 rounded-full px-4 py-2 flex items-center space-x-2 shadow-md"
          >
            <img src="" alt="Character Avatar" class="w-8 h-8 rounded-full" />
            <span class="font-medium text-gray-900">{{ character.name }}</span>
          </div>
        </div>
      </div>

      <!-- Related Events Section -->
      <div class="bg-gray-100 p-8">
        <h3 class="text-3xl font-bangers tracking-wide text-green-400 mb-6">Related Events</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
