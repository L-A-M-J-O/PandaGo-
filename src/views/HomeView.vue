<template>
  <div class="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
    <!-- Sidebar: Search, Categories, and Sorting -->
    <aside class="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
      <!-- Search Bar -->
      <div class="mb-6">
        <label class="block text-sm font-bold text-gray-700">Search</label>
        <input
          v-model="filter"
          type="text"
          placeholder="Search in catalog..."
          class="w-full p-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300"
          @keydown.enter="applyFilterHandler"
        />
        <button
          @click="applyFilterHandler"
          class="w-full mt-3 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <!-- Categories as Buttons -->
      <div class="mb-6">
        <h3 class="block text-sm font-bold text-gray-700 mb-3">Categories</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in availableCategories"
            :key="category.value"
            @click="toggleCategory(category.value)"
            :class="{
              'bg-red-600 text-white': selectedCategories.includes(category.value),
              'bg-gray-200 text-gray-700': !selectedCategories.includes(category.value)
            }"
            class="px-4 py-2 rounded-lg transition-colors duration-300"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Sorting Select -->
      <div>
        <label for="SortBy" class="block text-sm font-bold text-gray-700">Sort By</label>
        <select
          id="SortBy"
          v-model="sortOrder"
          @change="sortByName(sortOrder as 'asc' | 'desc')"
          class="w-full mt-1 p-2 border rounded-lg text-gray-700"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </aside>

    <!-- Main Content: Filtered Results -->
    <main class="w-full lg:w-3/4">
      <!-- Loading Spinner -->
      <div v-if="loading" class="spinner text-center text-xl">Loading...</div>

      <!-- Characters Section -->
      <div v-if="filteredCharacters.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Characters</h2>
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <li v-for="character in filteredCharacters" :key="character.id">
            <CardCharacter :character="character" />
          </li>
        </ul>
      </div>

      <!-- Comics Section -->
      <div v-if="filteredComics.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Comics</h2>
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <li v-for="comic in filteredComics" :key="comic.id">
            <CardComic :comic="comic" />
          </li>
        </ul>
      </div>

      <!-- Events Section -->
      <div v-if="filteredEvents.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Events</h2>
        <ul class="flex flex-col gap-4">
          <li v-for="event in filteredEvents" :key="event.id">
            <CardEvent :event="event" />
          </li>
        </ul>
      </div>

      <!-- Series Section -->
      <div v-if="filteredSeries.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Series</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          <li v-for="serie in filteredSeries" :key="serie.id">
            <CardSerie :serie="serie" />
          </li>
        </ul>
      </div>

      <!-- Creators Section -->
      <div v-if="filteredCreators.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Creators</h2>
        <ul class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          <li v-for="creator in filteredCreators" :key="creator.id">
            <CardCreator :creator="creator" />
          </li>
        </ul>
      </div>

      <!-- No Results Found -->
      <div
        v-if="
          !loading &&
          !filteredCharacters.length &&
          !filteredComics.length &&
          !filteredCreators.length &&
          !filteredEvents.length &&
          !filteredSeries.length
        "
        class="text-center text-2xl text-gray-600"
      >
        <h2>No Results Found</h2>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'

// Import components
import CardCharacter from '@/components/common/CardCharacter/CardCharacter.vue'
import CardComic from '@/components/common/CardComic/CardComic.vue'
import CardSerie from '@/components/common/CardSerie/CardSerie.vue'
import CardEvent from '@/components/common/CardEvent/CardEvent.vue'
import CardCreator from '@/components/common/CardCreator/CardCreator.vue'

// Initialize store
const catalogStore = useCatalogStore()

// Reactive variables
const filter = ref('')
const loading = computed(() => catalogStore.loading)
const filteredCharacters = computed(() => catalogStore.filteredCharacters)
const filteredComics = computed(() => catalogStore.filteredComics)
const filteredCreators = computed(() => catalogStore.filteredCreators)
const filteredEvents = computed(() => catalogStore.filteredEvents)
const filteredSeries = computed(() => catalogStore.filteredSeries)

// Available categories
const availableCategories = [
  { label: 'Characters', value: 'characters' },
  { label: 'Comics', value: 'comics' },
  { label: 'Creators', value: 'creators' },
  { label: 'Events', value: 'events' },
  { label: 'Series', value: 'series' }
]

// Handle category selection
const selectedCategories = ref(catalogStore.selectedCategories)
const toggleCategory = (category: string) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter((c) => c !== category)
  } else {
    selectedCategories.value.push(category)
  }
  catalogStore.updateSelectedCategories(selectedCategories.value)
}

// Sort function
const sortOrder = ref<'asc' | 'desc'>('asc')
const sortByName = (order: 'asc' | 'desc') => {
  catalogStore.sortByName(order)
}

// Handle search/filter
const applyFilterHandler = () => {
  if (filter.value) {
    catalogStore.filter = filter.value
    catalogStore.applyFilter()
  } else {
    catalogStore.getCatalogData()
  }
}

// Watch search input and fetch data on empty search
watch(filter, (newFilter) => {
  if (newFilter === '') {
    catalogStore.getCatalogData()
  }
})

// Fetch catalog data on component mount
onMounted(async () => {
  await catalogStore.getCatalogData()
})
</script>

<style scoped>
.spinner {
  text-align: center;
  margin: 20px;
  font-size: 20px;
}
</style>
