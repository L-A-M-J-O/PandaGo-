<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'

// Import components
import CardCharacter from '@/components/common/CardCharacter/CardCharacter.vue'
import CardComic from '@/components/common/CardComic/CardComic.vue'
import CardSerie from '@/components/common/CardSerie/CardSerie.vue'
import CardEvent from '@/components/common/CardEvent/CardEvent.vue'
import CardCreator from '@/components/common/CardCreator/CardCreator.vue'
import CardSkeleton from '@/components/common/CardSkeleton/CardSkeleton.vue'

// Initialize store
const catalogStore = useCatalogStore()

// Reactive variables
const filter = ref('')
const selectedDate = ref('')
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

// View mode (normal or grid)
const viewMode = ref<'normal' | 'grid'>('normal')
const setViewMode = (mode: 'normal' | 'grid') => {
  viewMode.value = mode
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

// Function to apply the date filter
const applyDateFilter = () => {
  catalogStore.updateSelectedDate(selectedDate.value)
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

<template>
  <div class="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
    <!-- Sidebar: Search, Categories, Sorting, and View Mode -->
    <aside class="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
      <!-- Search Bar -->
      <div class="mb-6">
        <label class="block text-sm font-bold text-gray-700 pb-2">Search</label>
        <input
          v-model="filter"
          type="text"
          placeholder="Search in catalog..."
          class="w-full p-2 border rounded-lg text-gray-700 focus:ring focus:ring-green-300"
          @keydown.enter="applyFilterHandler"
        />
        <button
          @click="applyFilterHandler"
          class="w-full mt-3 bg-[#046C4E] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#2ED926]"
        >
          Search
        </button>
      </div>

      <!-- Filter by Date -->
      <div class="mb-6">
        <h3 class="block text-sm font-bold text-gray-700 mb-3">Filter by Date</h3>
        <div class="space-y-2">
          <input
            type="date"
            v-model="selectedDate"
            class="w-full p-2 border rounded-lg text-gray-700 focus:ring focus:ring-green-300"
          />
          <button
            @click="applyDateFilter"
            class="w-full mt-3 bg-[#046C4E] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#2ED926]"
          >
            Apply Date Filter
          </button>
        </div>
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
              'bg-[#046C4E] text-white hover:bg-[#2ED926] hover:text-white':
                selectedCategories.includes(category.value),
              'bg-gray-200 text-gray-700 hover:bg-[#2ED926] hover:text-white':
                !selectedCategories.includes(category.value)
            }"
            class="px-4 py-2 rounded-lg transition-colors duration-300"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Sorting and View Mode -->
      <div class="mb-6">
        <label for="SortBy" class="block text-sm font-bold text-gray-700">Sort By</label>
        <select
          id="SortBy"
          v-model="sortOrder"
          @change="sortByName(sortOrder)"
          class="w-full mt-1 p-2 border rounded-lg text-gray-700"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <!-- View Mode Buttons -->
      <div class="mb-6">
        <h3 class="block text-sm font-bold text-gray-700 mb-3">View Mode</h3>
        <div class="flex gap-2">
          <button
            @click="setViewMode('normal')"
            :class="{
              'bg-slate-400 text-white': viewMode === 'normal',
              'bg-gray-200 text-gray-700': viewMode !== 'normal'
            }"
            class="px-4 py-2 rounded-lg"
          >
            <svg
              width="24"
              height="24"
              role="img"
              class="Icon_icon-content-1__kPDLF"
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12.5 4H20v16h-7.5zm-1-1H21v18H3V3zm0 17H4V4h7.5z"
                clip-rule="evenodd"
              ></path>
              <title>Mostrar más artículos</title>
            </svg>
          </button>
          <button
            @click="setViewMode('grid')"
            :class="{
              'bg-slate-400 text-white': viewMode === 'grid',
              'bg-gray-200 text-gray-700': viewMode !== 'grid'
            }"
            class="px-4 py-2 rounded-lg"
          >
            <svg
              width="24"
              height="24"
              role="img"
              class="Icon_icon-content-1__kPDLF"
              xmlns="http://www.w3.org/2000/svg"
              xml:space="preserve"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3v18h18V3zm17 1v7.5h-7.5V4zm-8.5 0v7.5H4V4zM4 20v-7.5h7.5V20zm8.5 0v-7.5H20V20z"
              ></path>
              <title>Mostrar el máximo de artículos</title>
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <main class="w-full lg:w-3/4">
      <!-- Loading state -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <CardSkeleton v-for="n in 20" :key="n" />
      </div>

      <!-- Characters Section -->
      <div v-if="filteredCharacters.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Characters</h2>
        <ul
          :class="{
            'grid grid-cols-2 md:grid-cols-4 gap-6': viewMode === 'grid',
            'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6': viewMode === 'normal'
          }"
        >
          <li v-for="character in filteredCharacters" :key="character.id">
            <CardCharacter :character="character" />
          </li>
        </ul>
      </div>

      <!-- Comics Section -->
      <div v-if="filteredComics.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Comics</h2>
        <ul
          :class="{
            'grid grid-cols-2 md:grid-cols-4 gap-6': viewMode === 'grid',
            'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6': viewMode === 'normal'
          }"
        >
          <li v-for="comic in filteredComics" :key="comic.id">
            <CardComic :comic="comic" />
          </li>
        </ul>
      </div>

      <!-- Events Section -->
      <div v-if="filteredEvents.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Events</h2>
        <ul
          :class="{
            'grid grid-cols-2 md:grid-cols-4 gap-6': viewMode === 'grid',
            'space-y-4': viewMode === 'normal'
          }"
        >
          <li v-for="event in filteredEvents" :key="event.id">
            <CardEvent :event="event" :viewMode="viewMode" />
          </li>
        </ul>
      </div>

      <!-- Series Section -->
      <div v-if="filteredSeries.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Series</h2>
        <ul
          :class="{
            'grid grid-cols-1 md:grid-cols-4 gap-6': viewMode === 'grid',
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6': viewMode === 'normal'
          }"
        >
          <li v-for="serie in filteredSeries" :key="serie.id">
            <CardSerie :serie="serie" />
          </li>
        </ul>
      </div>

      <!-- Creators Section -->
      <div v-if="filteredCreators.length && !loading" class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Creators</h2>
        <ul
          :class="{
            'grid grid-cols-2 md:grid-cols-4 gap-6': viewMode === 'grid',
            'grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6': viewMode === 'normal'
          }"
        >
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
