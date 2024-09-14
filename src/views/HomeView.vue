<template>
  <div>
    <h1>Marvel Catalog</h1>

    <!-- Barra de búsqueda -->
    <input v-model="filter" type="text" placeholder="Search in catalog..." class="search-input" />
    <button @click="applyFilterHandler">Search</button>

    <!-- Spinner Global -->
    <div v-if="loading" class="spinner">Loading...</div>

    <!-- Categorías -->
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

    <!-- Sección de personajes -->
    <div v-if="selectedCategories.includes('') || selectedCategories.includes('characters')">
      <div v-if="filteredCharacters.length && !loading">
        <h2>Characters</h2>
        <ul>
          <li v-for="character in filteredCharacters" :key="character.id">
            {{ character.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Sección de cómics -->
    <div v-if="selectedCategories.includes('') || selectedCategories.includes('comics')">
      <div v-if="filteredComics.length && !loading">
        <h2>Comics</h2>
        <ul>
          <li v-for="comic in filteredComics" :key="comic.id">
            {{ comic.title }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Sección de creadores -->
    <div v-if="selectedCategories.includes('') || selectedCategories.includes('creators')">
      <div v-if="filteredCreators.length && !loading">
        <h2>Creators</h2>
        <ul>
          <li v-for="creator in filteredCreators" :key="creator.id">
            {{ creator.fullName }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Sección de eventos -->
    <div v-if="selectedCategories.includes('') || selectedCategories.includes('events')">
      <div v-if="filteredEvents.length && !loading">
        <h2>Events</h2>
        <ul>
          <li v-for="event in filteredEvents" :key="event.id">
            {{ event.title }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Sección de series -->
    <div v-if="selectedCategories.includes('') || selectedCategories.includes('series')">
      <div v-if="filteredSeries.length && !loading">
        <h2>Series</h2>
        <ul>
          <li v-for="serie in filteredSeries" :key="serie.id">
            {{ serie.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'

// Inicializar la store
const catalogStore = useCatalogStore()

// Referencias para los datos individuales de cada sección
const filter = ref('')
const loading = computed(() => catalogStore.loading)
const filteredCharacters = computed(() => catalogStore.filteredCharacters)
const filteredComics = computed(() => catalogStore.filteredComics)
const filteredCreators = computed(() => catalogStore.filteredCreators)
const filteredEvents = computed(() => catalogStore.filteredEvents)
const filteredSeries = computed(() => catalogStore.filteredSeries)

// Categorías disponibles
const availableCategories = [
  { label: 'Characters', value: 'characters' },
  { label: 'Comics', value: 'comics' },
  { label: 'Creators', value: 'creators' },
  { label: 'Events', value: 'events' },
  { label: 'Series', value: 'series' }
]

// Categorías seleccionadas
const selectedCategories = ref(catalogStore.selectedCategories)

// Acción para actualizar las categorías seleccionadas
const updateCategories = () => {
  catalogStore.updateSelectedCategories(selectedCategories.value)
}

// Acción para aplicar el filtro
const applyFilterHandler = () => {
  catalogStore.applyFilter(filter.value)
}

// Watcher para observar cambios en el input de búsqueda
let debounceTimer: ReturnType<typeof setTimeout>
// watch(
//   filter,
//   (newFilter) => {
//     clearTimeout(debounceTimer)
//     debounceTimer = setTimeout(() => {
//       applyFilterHandler()
//     }, 500)
//   },
//   { immediate: true }
// )

// Cargar los datos al montar el componente
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

.no-results {
  text-align: center;
  font-size: 18px;
  color: gray;
  margin-top: 20px;
}

.categories ul {
  list-style-type: none;
}

.categories label {
  cursor: pointer;
}

.categories input {
  margin-right: 5px;
}
</style>
