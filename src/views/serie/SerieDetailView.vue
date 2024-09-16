<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAdapterSerieById } from '@/domains/serie/adapters/getAdapterSerie'
import { SerieModel } from '@/domains/serie/models/serie'

const route = useRoute()
const serieDetail = ref<SerieModel>()

onMounted(async () => {
  const id = route.params.id as string
  try {
    serieDetail.value = await getAdapterSerieById(id)
    console.log(serieDetail.value)
  } catch (error) {
    console.error('Error fetching series details', error)
  }
})

const getSerieImageUrl = (serie: SerieModel) => {
  return `${serie.thumbnail.path}.${serie.thumbnail.extension}`
}
</script>

<template>
  <div v-if="serieDetail" class="px-4 py-8">
    <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <!-- Hero Section -->
      <div class="relative">
        <img
          :src="getSerieImageUrl(serieDetail)"
          :alt="serieDetail.title"
          class="w-full h-96 object-fill"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8"
        >
          <h2 class="text-4xl font-bold text-white mb-2">{{ serieDetail.title }}</h2>
          <p class="text-xl text-gray-300">
            {{ new Date(serieDetail.startYear).getFullYear() }} -
            {{ new Date(serieDetail.endYear).getFullYear() }}
          </p>
        </div>
      </div>

      <!-- Series Info -->
      <div class="p-8">
        <div class="flex flex-wrap gap-4 mb-6">
          <span class="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
            {{ serieDetail.comics.available }} Issues
          </span>
          <span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            modified: {{ serieDetail.modified }}
          </span>
          <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            Rated: {{ serieDetail.rating || 'N/A' }}
          </span>
        </div>
        <p class="text-gray-700 text-lg mb-6">
          {{ serieDetail.description || 'No description available for this series.' }}
        </p>
      </div>

      <!-- Creators Section -->
      <div class="bg-gray-50 p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Creators</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="creator in serieDetail.creators.items"
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

      <!-- comics Section -->
      <div class="p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Comics</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div
            v-for="comic in serieDetail.comics.items.slice(0, 6)"
            :key="comic.resourceURI"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width="100px"
              height="300px"
              viewBox="0 0 24 24"
              role="img"
            >
              <title>LINE WEBTOON icon</title>
              <path
                d="M15.023 15.26c.695 0 1.014-.404 1.014-1.051 0-.551-.308-1.01-.984-1.01-.58 0-.912.404-.912 1.016 0 .543.32 1.045.882 1.045zM10.135 15.447c.764 0 1.113-.443 1.113-1.154 0-.604-.338-1.109-1.082-1.109-.637 0-1.002.445-1.002 1.115 0 .597.352 1.148.971 1.148zM24 10.201l-3.15.029.83-9.686L1.958 3.605l1.686 6.248H0l3.734 11.488 8.713-1.283v3.396l10.113-4.641L24 10.201zm-9.104-3.594c0-.049.039-.092.088-.094l1.879-.125.446-.029c.524-.035 1.634.063 1.634 1.236 0 .83-.619 1.184-.619 1.184s.75.189.707 1.092c0 1.602-1.943 1.389-1.943 1.389l-.225-.006-1.908-.053a.089.089 0 0 1-.086-.09l.027-4.504zm-3.675.243c0-.047.039-.09.088-.092l3.064-.203a.08.08 0 0 1 .087.08v.943c0 .049-.039.09-.087.092l-1.9.08a.094.094 0 0 0-.088.09l-.005.394a.083.083 0 0 0 .086.084l1.646-.066a.082.082 0 0 1 .086.084l-.02 1.012a.089.089 0 0 1-.089.086h-1.63a.089.089 0 0 0-.088.088v.416c0 .047.039.088.088.088l1.87.033a.09.09 0 0 1 .087.09v.951a.084.084 0 0 1-.087.084l-3.063-.123a.09.09 0 0 1-.087-.09l.042-4.121zm-6.01.312l.975-.064a.101.101 0 0 1 .105.08l.458 2.205c.01.047.027.047.039 0l.576-2.281a.132.132 0 0 1 .108-.09l.921-.061a.108.108 0 0 1 .109.078l.564 2.342c.012.047.029.047.041 0l.6-2.424a.131.131 0 0 1 .108-.092l.996-.064c.048-.004.077.031.065.078l-1.09 4.104a.113.113 0 0 1-.109.082l-1.121-.031a.12.12 0 0 1-.109-.086l-.535-1.965c-.012-.047-.033-.047-.045 0l-.522 1.934a.12.12 0 0 1-.11.082l-1.109-.031a.123.123 0 0 1-.108-.088l-.873-3.618c-.011-.047.019-.088.066-.09zm-.288 9.623v-3.561a.089.089 0 0 0-.087-.088l-1.252-.029a.095.095 0 0 1-.091-.09l-.046-1.125a.082.082 0 0 1 .083-.086l4.047.096c.048 0 .087.041.085.088l-.022 1.088a.093.093 0 0 1-.089.088l-1.139.004a.09.09 0 0 0-.087.088v3.447c0 .049-.039.09-.087.092l-1.227.07a.08.08 0 0 1-.088-.082zm2.834-2.379c0-1.918 1.321-2.482 2.416-2.482s2.339.73 2.339 2.316c0 1.9-1.383 2.482-2.416 2.482-1.033.001-2.339-.724-2.339-2.316zm5.139-.115c0-1.746 1.166-2.238 2.162-2.238s2.129.664 2.129 2.107c0 1.729-1.259 2.26-2.198 2.26s-2.093-.68-2.093-2.129zm7.259 1.711a.175.175 0 0 1-.139-.064l-1.187-1.631c-.029-.039-.053-.031-.053.018v1.67c0 .047-.039.09-.086.092l-1.052.061a.082.082 0 0 1-.087-.082l.039-3.842c0-.047.039-.086.088-.084l.881.02a.2.2 0 0 1 .137.074l1.293 1.902c.027.041.051.033.051-.014l.032-1.846a.087.087 0 0 1 .089-.086l.963.029c.047 0 .085.041.083.09l-.138 3.555a.097.097 0 0 1-.091.092l-.823.046zM16.258 8.23l.724-.014s.47.018.47-.434c0-.357-.411-.33-.411-.33l-.782.008a.09.09 0 0 0-.088.088v.598a.083.083 0 0 0 .087.084zM16.229 10.191h.99c.024 0 .35-.051.35-.404 0-.293-.229-.402-.441-.398l-.898.029a.089.089 0 0 0-.087.09v.596a.086.086 0 0 0 .086.087z"
              />
            </svg>
            <div class="p-4">
              <p class="font-semibold text-gray-800">{{ comic.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Characters Section -->
      <div class="bg-gray-50 p-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Featured Characters</h3>
        <div class="flex flex-wrap gap-4">
          <div
            v-for="character in serieDetail.characters.items.slice(0, 5)"
            :key="character.resourceURI"
            class="bg-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#000000"
              height="50px"
              width="50px"
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
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
