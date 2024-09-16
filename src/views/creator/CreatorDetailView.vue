<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { getAdapterCreatorById } from '@/domains/creator/adapters/getAdapterCreator'
import { CreatorModel } from '@/domains/creator/models/creator'

const route = useRoute()
const creatorDetail = ref<CreatorModel>()

onMounted(async () => {
  const id = route.params.id as string
  try {
    creatorDetail.value = await getAdapterCreatorById(id)
    console.log(creatorDetail.value)
  } catch (error) {
    console.error('Error fetching creator details', error)
  }
})

const getCreatorImageUrl = (creator: CreatorModel) => {
  return `${creator.thumbnail.path}.${creator.thumbnail.extension}`
}
</script>

<template>
  <div v-if="creatorDetail" class="px-4 py-8">
    <div class="bg-white rounded-lg shadow-2xl overflow-hidden">
      <!-- Creator Profile Section -->
      <div class="md:flex">
        <div class="md:w-1/3 bg-gray-100">
          <img
            :src="getCreatorImageUrl(creatorDetail)"
            :alt="creatorDetail.fullName"
            class="w-full h-auto object-cover"
          />
        </div>
        <div class="md:w-2/3 p-8">
          <h2 class="text-4xl font-bangers text-gray-900 mb-4">{{ creatorDetail.firstName }}</h2>
          <p class="text-xl text-gray-600 mb-4">{{ creatorDetail.lastName }}</p>
          <p class="text-gray-700 mb-6">
            {{ creatorDetail.suffix || 'No description available for this creator.' }}
          </p>
          <div class="flex flex-wrap gap-4 mb-6">
            <span
              v-for="role in creatorDetail.urls"
              :key="role.type"
              class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
            >
              {{ role.url }}
            </span>
          </div>
          <div class="flex items-center text-gray-600">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
              />
            </svg>
            <div v-for="storie in creatorDetail.stories.items" :key="storie.type">
              <span>Collaborated with {{ storie.name }} + artists</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Career Stats Section -->
      <div class="bg-gray-100 p-8">
        <h3
          class="text-3xl font-semibold font-bangers tracking-wide text-[#046C4E] mb-4 drop-shadow-lg"
        >
          Career Statistics
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="bg-white p-4 rounded-lg shadow text-center">
            <p class="text-4xl font-bold text-[#2ED926]">150+</p>
            <p class="text-gray-600">Comics Written</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow text-center">
            <p class="text-4xl font-bold text-[#2ED926]">80+</p>
            <p class="text-gray-600">Characters Created</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow text-center">
            <p class="text-4xl font-bold text-[#2ED926]">40+</p>
            <p class="text-gray-600">Years in Industry</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow text-center">
            <p class="text-4xl font-bold text-[#2ED926]">25+</p>
            <p class="text-gray-600">Awards Won</p>
          </div>
        </div>
      </div>

      <!-- Featured Works Section -->
      <div class="p-8">
        <h3
          class="text-3xl font-semibold font-bangers tracking-wide text-[#046C4E] mb-4 drop-shadow-lg"
        >
          Featured Works
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="comic in creatorDetail.comics.items.slice(0, 4)"
            :key="comic.resourceURI"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              :src="getCreatorImageUrl(creatorDetail)"
              :alt="comic.name"
              class="w-full h-64 object-cover"
            />
            <div class="p-4">
              <p class="font-semibold">{{ comic.name }}</p>
              <p class="text-sm text-gray-600">
                {{ comic.name || 'No description available.' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Created Characters Section -->
      <div class="bg-gray-100 p-8">
        <h3
          class="text-3xl font-semibold font-bangers tracking-wide text-[#046C4E] mb-4 drop-shadow-lg"
        >
          Created Characters
        </h3>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="character in creatorDetail.comics.items"
            :key="character.resourceURI"
            class="bg-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-md"
          >
            <img src="" :alt="character.name" class="w-8 h-8 rounded-full" />
            <span class="font-medium">{{ character.name }}</span>
          </div>
        </div>
      </div>

      <!-- Career Timeline Section -->
      <div class="p-8">
        <h3
          class="text-3xl font-semibold font-bangers tracking-wide text-[#046C4E] mb-4 drop-shadow-lg"
        >
          Career Timeline
        </h3>
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
          <div class="space-y-12">
            <div class="flex items-center">
              <div class="w-1/2 pr-8 text-right">
                <h4 class="text-xl font-semibold">Started at Timely Comics</h4>
                <p class="text-gray-600">
                  Began as an assistant at Timely Comics, precursor to Marvel
                </p>
              </div>
              <div class="w-4 h-4 bg-[#2ED926] rounded-full flex-shrink-0"></div>
              <div class="w-1/2 pl-8">
                <p class="text-gray-600">1939</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-1/2 pr-8 text-right">
                <p class="text-gray-600">1961</p>
              </div>
              <div class="w-4 h-4 bg-[#2ED926] rounded-full flex-shrink-0"></div>
              <div class="w-1/2 pl-8">
                <h4 class="text-xl font-semibold">Creation of the Fantastic Four</h4>
                <p class="text-gray-600">Marked the beginning of the "Marvel Age of Comics"</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-1/2 pr-8 text-right">
                <h4 class="text-xl font-semibold">Creation of Spider-Man</h4>
                <p class="text-gray-600">One of Marvel's most iconic characters</p>
              </div>
              <div class="w-4 h-4 bg-[#2ED926] rounded-full flex-shrink-0"></div>
              <div class="w-1/2 pl-8">
                <p class="text-gray-600">1962</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-1/2 pr-8 text-right">
                <p class="text-gray-600">1972</p>
              </div>
              <div class="w-4 h-4 bg-[#2ED926] rounded-full flex-shrink-0"></div>
              <div class="w-1/2 pl-8">
                <h4 class="text-xl font-semibold">Named President of Marvel Comics</h4>
                <p class="text-gray-600">Took over leadership of the company</p>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-1/2 pr-8 text-right">
                <h4 class="text-xl font-semibold">Cameo in X-Men</h4>
                <p class="text-gray-600">First cameo in a Marvel movie</p>
              </div>
              <div class="w-4 h-4 bg-[#2ED926] rounded-full flex-shrink-0"></div>
              <div class="w-1/2 pl-8">
                <p class="text-gray-600">2000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Famous Quotes Section -->
      <div class="bg-gray-100 p-8">
        <h3
          class="text-3xl font-semibold font-bangers tracking-wide text-[#046C4E] mb-4 drop-shadow-lg"
        >
          Famous Quotes
        </h3>
        <div class="grid gap-6 md:grid-cols-2">
          <blockquote class="bg-white p-6 rounded-lg shadow-md">
            <footer class="text-gray-600">- {{ creatorDetail.stories.items[0].type }}</footer>
            <p class="text-lg mb-4">"{{ creatorDetail.stories.items[0].resourceURI }}"</p>
          </blockquote>
          <!-- Add more quotes similarly -->
        </div>
      </div>

      <!-- Legacy Section -->
      <div class="p-8">
        <h3
          class="text-3xl font-semibold font-bangers tracking-wide text-[#046C4E] mb-4 drop-shadow-lg"
        >
          Legacy
        </h3>
        <p class="text-gray-700 mb-4">{{ creatorDetail.suffix }}</p>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
