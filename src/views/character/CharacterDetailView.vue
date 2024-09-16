<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAdapterCharacterById } from '@/domains/character/adapters/Character/getAdapterCharacter'
import { CharacterModel } from '@/domains/character/models/character'

const route = useRoute()
const characterDetail = ref<CharacterModel>()

onMounted(async () => {
  const id = route.params.id as string
  try {
    characterDetail.value = await getAdapterCharacterById(id)
    console.log(characterDetail.value)
  } catch (error) {
    console.error('Error fetching character details', error)
  }
})

const getCharacterImageUrl = (character: CharacterModel) => {
  return `${character.thumbnail.path}.${character.thumbnail.extension}`
}
</script>

<template>
  <div v-if="characterDetail" class="px-4 py-8">
    <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Hero Section -->
      <div class="md:flex">
        <div class="md:w-1/2 relative">
          <img
            class="w-full h-full object-cover"
            :src="getCharacterImageUrl(characterDetail)"
            :alt="characterDetail.name"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6"
          >
            <h1 class="text-4xl font-bold text-white mb-2">{{ characterDetail.name }}</h1>
            <p class="text-xl text-gray-300">Superhero ID: {{ characterDetail.id }}</p>
          </div>
        </div>
        <div class="md:w-1/2 p-8 bg-gradient-to-br from-gray-100 to-white">
          <p class="text-xl text-gray-700 mb-4">
            {{ characterDetail.description || 'No description available for this character.' }}
          </p>
          <p class="text-sm text-gray-500">
            Last modified: {{ new Date(characterDetail.modified).toLocaleDateString() }}
          </p>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="grid md:grid-cols-2 gap-8 p-8">
        <!-- Comics Section -->
        <div
          v-if="characterDetail.comics.items.length"
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <h2 class="text-2xl font-bold text-cyan-500 mb-4">
            Comics
            <span class="text-gray-500">({{ characterDetail.comics.available }} available)</span>
          </h2>
          <ul class="space-y-2">
            <li
              v-for="comic in characterDetail.comics.items.slice(0, 5)"
              :key="comic.resourceURI"
              class="flex items-center"
            >
              <span class="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>{{ comic.name }}
            </li>
          </ul>
          <a href="#" class="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-semibold"
            >View all comics →</a
          >
        </div>

        <!-- Series Section -->
        <div
          v-if="characterDetail.series.items.length"
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <h2 class="text-2xl font-bold text-purple-600 mb-4">
            Series
            <span class="text-gray-500">({{ characterDetail.series.available }} available)</span>
          </h2>
          <ul class="space-y-2">
            <li
              v-for="serie in characterDetail.series.items.slice(0, 5)"
              :key="serie.resourceURI"
              class="flex items-center"
            >
              <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>{{ serie.name }}
            </li>
          </ul>
          <a href="#" class="mt-4 inline-block text-purple-600 hover:text-purple-800 font-semibold"
            >View all series →</a
          >
        </div>

        <!-- Stories Section -->
        <div
          v-if="characterDetail.stories.items.length"
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <h2 class="text-2xl font-bold text-blue-600 mb-4">
            Stories
            <span class="text-gray-500">({{ characterDetail.stories.available }} available)</span>
          </h2>
          <ul class="space-y-2">
            <li
              v-for="story in characterDetail.stories.items.slice(0, 5)"
              :key="story.resourceURI"
              class="flex items-center"
            >
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>{{ story.name }} ({{
                story.type
              }})
            </li>
          </ul>
          <a href="#" class="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
            >View all stories →</a
          >
        </div>

        <!-- Events Section -->
        <div
          v-if="characterDetail.events.items.length"
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <h2 class="text-2xl font-bold text-red-600 mb-4">
            Events
            <span class="text-gray-500">({{ characterDetail.events.available }} available)</span>
          </h2>
          <ul class="space-y-2">
            <li
              v-for="event in characterDetail.events.items.slice(0, 5)"
              :key="event.resourceURI"
              class="flex items-center"
            >
              <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>{{ event.name }}
            </li>
          </ul>
          <a href="#" class="mt-4 inline-block text-red-600 hover:text-red-800 font-semibold"
            >View all events →</a
          >
        </div>
      </div>

      <!-- Related Links Section -->
      <div
        v-if="characterDetail.urls.length"
        class="bg-gradient-to-r from-[#046C4E] to-[#2ED926] p-8 text-white"
      >
        <h2 class="text-3xl font-bold mb-6">Related Links</h2>
        <div class="flex flex-wrap gap-4">
          <a
            v-for="link in characterDetail.urls"
            :key="link.url"
            :href="link.url"
            target="_blank"
            class="bg-white text-[#046C4E] font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            {{ link.type }}
          </a>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
