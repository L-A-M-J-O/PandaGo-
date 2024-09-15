<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'

// components
import CardCatalog from '@/components/common/CardCatalog.vue'

const catalogStore = useCatalogStore()

const filter = ref('')
const loading = computed(() => catalogStore.loading)
const filteredCharacters = computed(() => catalogStore.filteredCharacters)
const filteredComics = computed(() => catalogStore.filteredComics)
const filteredCreators = computed(() => catalogStore.filteredCreators)
const filteredEvents = computed(() => catalogStore.filteredEvents)
const filteredSeries = computed(() => catalogStore.filteredSeries)

const availableCategories = [
  { label: 'Characters', value: 'characters' },
  { label: 'Comics', value: 'comics' },
  { label: 'Creators', value: 'creators' },
  { label: 'Events', value: 'events' },
  { label: 'Series', value: 'series' }
]

const selectedCategories = ref(catalogStore.selectedCategories)
const updateCategories = () => {
  catalogStore.updateSelectedCategories(selectedCategories.value)
}
const applyFilterHandler = () => {
  if (filter.value) {
    catalogStore.filter = filter.value
    catalogStore.applyFilter()
  } else {
    catalogStore.getCatalogData()
  }
}

const sortByName = (order: 'asc' | 'desc') => {
  catalogStore.sortByName(order)
}

watch(filter, (newFilter) => {
  if (newFilter === '') {
    catalogStore.getCatalogData()
  }
})

onMounted(async () => {
  await catalogStore.getCatalogData()
})
</script>

<template>
  <div>
    <h1>Marvel Catalog</h1>
    <input
      v-model="filter"
      type="text"
      placeholder="Search in catalog..."
      class="search-input"
      @keydown.enter="applyFilterHandler"
    />
    <button @click="applyFilterHandler">Search</button>

    <div v-if="loading" class="spinner">Loading...</div>

    <div class="categories">
      <h3>Categories</h3>
      <ul>
        <li v-for="category in availableCategories" :key="category.value">
          <label>
            <input
              type="checkbox"
              :value="category.value"
              v-model="selectedCategories"
              @change="updateCategories"
            />
            {{ category.label }}
          </label>
        </li>
      </ul>
    </div>

    <div class="sort-options">
      <button @click="sortByName('desc')">Sort A-Z</button>
      <button @click="sortByName('asc')">Sort Z-A</button>
    </div>

    <div v-if="filteredCharacters.length && !loading">
      <h2>Characters</h2>
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4"
      >
        <li v-for="character in filteredCharacters" :key="character.id">
          <CardCatalog :character="character" />
        </li>
      </ul>
    </div>

    <div v-if="filteredComics.length && !loading">
      <h2>Comics</h2>
      <ul>
        <li v-for="comic in filteredComics" :key="comic.id">
          {{ comic.title }}
        </li>
      </ul>
    </div>

    <div v-if="filteredCreators.length && !loading">
      <h2>Creators</h2>
      <ul>
        <li v-for="creator in filteredCreators" :key="creator.id">
          {{ creator.fullName }}
        </li>
      </ul>
    </div>

    <div v-if="filteredEvents.length && !loading">
      <h2>Events</h2>
      <ul>
        <li v-for="event in filteredEvents" :key="event.id">
          {{ event.title }}
        </li>
      </ul>
    </div>

    <div v-if="filteredSeries.length && !loading">
      <h2>Series</h2>
      <ul>
        <li v-for="serie in filteredSeries" :key="serie.id">
          {{ serie.title }}
        </li>
      </ul>
    </div>

    <div
      v-if="
        !loading &&
        !filteredCharacters.length &&
        !filteredComics.length &&
        !filteredCreators.length &&
        !filteredEvents.length &&
        !filteredSeries.length
      "
      class="no-results"
    >
      <h2>No Results Found</h2>
    </div>
  </div>
</template>
