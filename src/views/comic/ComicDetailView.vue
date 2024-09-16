<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAdapterComicById } from '@/domains/comic/adapters/Comic/getAdapterComic'
import { ComicModel } from '@/domains/comic/models/comic'

const route = useRoute()
const comicDetail = ref<ComicModel>()

onMounted(async () => {
  const id = route.params.id as string
  try {
    comicDetail.value = await getAdapterComicById(id)
    console.log(comicDetail.value)
  } catch (error) {
    console.error('Error fetching comic details', error)
  }
})

const getComicImageUrl = (comic: ComicModel) => {
  return `${comic.thumbnail.path}.${comic.thumbnail.extension}`
}
</script>

<template>
  <div v-if="comicDetail" class="px-4 py-8">
    <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <!-- Comic Hero Section -->
      <div class="md:flex">
        <div class="md:w-1/3 p-8">
          <img
            :src="getComicImageUrl(comicDetail)"
            :alt="comicDetail.title"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div class="md:w-2/3 p-8">
          <h2 class="text-4xl font-bold text-gray-900 mb-2">{{ comicDetail.title }}</h2>
          <p class="text-xl text-gray-600 mb-4">
            {{ new Date(comicDetail.dates[0].date).toLocaleDateString() }}
          </p>
          <div class="flex flex-wrap gap-4 mb-6">
            <span class="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">{{
              comicDetail.format
            }}</span>
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{{
              comicDetail.prices[0].price ? '$' + comicDetail.prices[0].price : 'Price Unavailable'
            }}</span>
            <span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
              >{{ comicDetail.pageCount }} Pages</span
            >
          </div>
          <p class="text-gray-700 text-lg mb-6">
            {{ comicDetail.description || 'No description available for this comic.' }}
          </p>
          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Comic Details</h3>
            <ul class="grid grid-cols-2 gap-4">
              <li class="flex items-center">
                <span class="font-semibold mr-2">Published:</span>
                {{ new Date(comicDetail.dates[0].date).toLocaleDateString() }}
              </li>
              <li class="flex items-center">
                <span class="font-semibold mr-2">Price:</span>
                {{ comicDetail.prices[0].price ? '$' + comicDetail.prices[0].price : 'N/A' }}
              </li>
              <li class="flex items-center">
                <span class="font-semibold mr-2">Pages:</span> {{ comicDetail.pageCount }}
              </li>
              <li class="flex items-center">
                <span class="font-semibold mr-2">Format:</span> {{ comicDetail.format }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Creators Section -->
      <div class="bg-gray-50 p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Creators</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="creator in comicDetail.creators.items"
            :key="creator.resourceURI"
            class="flex items-center space-x-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 8.5C15 10.433 13.433 12 11.5 12C9.567 12 8 10.433 8 8.5C8 6.567 9.567 5 11.5 5C13.433 5 15 6.567 15 8.5Z"
                fill="#000000"
              />
              <path
                d="M17.6305 20H5.94623C5.54449 20 5.31716 19.559 5.56788 19.2451C6.68379 17.8479 9.29072 15 12 15C14.7275 15 17.0627 17.8864 18.0272 19.2731C18.2474 19.5897 18.0161 20 17.6305 20Z"
                fill="#000000"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <p class="font-semibold text-gray-800">{{ creator.name }}</p>
              <p class="text-gray-600">{{ creator.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Preview</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <img
            v-for="image in comicDetail.images"
            :key="image.path"
            :src="`${image.path}.${image.extension}`"
            :alt="`Preview page`"
            class="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition duration-300"
          />
        </div>
      </div>

      <!-- Characters Section -->
      <div class="bg-gray-50 p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Featured Characters</h3>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="character in comicDetail.characters.items"
            :key="character.resourceURI"
            class="bg-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#000000"
              height="30px"
              width="30px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M493.824,176.768c-18.112-13.099-42.517-8.597-72.512,0.661L390.336,45.013c-2.645-15.851-12.949-29.333-27.563-36.117    c-14.123-6.485-30.997-5.312-45.184,3.264l-24.427,14.741c-22.912,13.867-51.413,13.867-74.325,0L194.411,12.16    c-14.144-8.555-31.061-9.771-45.227-3.243c-14.571,6.763-24.875,20.245-27.243,34.773L90.688,177.429    c-29.995-9.237-54.4-13.717-72.512-0.661C6.101,185.472,0,200,0,219.968c0,48.043,32.896,90.347,85.547,119.253    c0.512,32.875,9.28,63.317,26.411,90.432c30.699,48.597,84.565,77.589,144.043,77.589s113.323-28.992,144.043-77.589    c17.131-27.115,25.899-57.557,26.411-90.432C479.104,310.315,512,268.011,512,219.968C512,200,505.899,185.472,493.824,176.768z     M363.968,406.869C341.12,443.008,300.779,464.576,256,464.576c-44.779,0-85.12-21.568-107.968-57.707    c-9.301-14.72-15.189-30.848-18.005-48.043c37.013,12.757,79.851,20.032,125.973,20.032s88.96-7.275,125.973-20.032    C379.157,376,373.269,392.149,363.968,406.869z M256,336.192c-115.648,0-213.333-53.227-213.333-116.224    c0-5.44,0.725-8.043,0.512-8.512c5.76-1.557,22.272,2.795,37.781,7.616c-0.341,1.728-0.128,3.392-0.128,5.099    c-0.021,1.237-0.256,2.475-0.107,3.669c0.235,1.813,0.939,3.499,1.515,5.205c0.384,1.131,0.533,2.325,1.067,3.413    c0.853,1.728,2.133,3.179,3.349,4.693c0.683,0.853,1.131,1.835,1.899,2.603c2.176,2.155,4.715,3.989,7.616,5.376l36.885,17.579    c10.24,5.184,20.523,9.707,30.827,13.611c5.141,1.92,10.283,3.2,15.424,4.821c5.184,1.621,10.368,3.584,15.573,4.885    c6.805,1.707,13.632,2.688,20.459,3.84c3.541,0.597,7.083,1.536,10.645,1.984c7.979,1.003,15.936,1.28,23.893,1.515    c2.389,0.064,4.757,0.448,7.125,0.448h0.171c41.237,0,82.091-10.304,121.28-30.891l37.44-17.813    c2.88-1.387,5.419-3.221,7.573-5.355c0.832-0.832,1.323-1.899,2.048-2.816c1.109-1.429,2.347-2.816,3.157-4.437    c0.683-1.408,0.939-2.944,1.387-4.437c0.405-1.387,1.003-2.688,1.195-4.139c0.192-1.493-0.064-3.029-0.128-4.565    c-0.043-1.451,0.171-2.859-0.107-4.331c15.915-5.035,32.64-9.728,37.035-8.491c0.021,0.021,1.28,2.261,1.28,9.429    C469.333,282.965,371.648,336.192,256,336.192z"
                  />
                </g>
              </g>
            </svg>
            <span class="font-medium text-gray-800">{{ character.name }}</span>
          </div>
        </div>
      </div>

      <!-- Related Comics Section -->
      <div class="p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div
            v-for="relatedComic in comicDetail.collectedIssues.slice(0, 5)"
            :key="relatedComic.resourceURI"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              :src="getComicImageUrl(relatedComic)"
              alt="Related Comic"
              class="w-full h-64 object-cover"
            />
            <div class="p-4">
              <p class="font-semibold text-gray-800">{{ relatedComic.title }}</p>
              <p class="text-gray-600 text-sm">
                {{ new Date(relatedComic.dates[0].date).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
