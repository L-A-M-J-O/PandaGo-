import { defineStore } from 'pinia'
import { getFilteredCatalogData } from '@/domains/catalog/adapters/catalogFilter'
import { getRepositoriesCharacters } from '@/domains/character/repositories/Characters/characters'
import { getRepositoriesComics } from '@/domains/comic/repositories/Comics/comics'
import { getRepositoriesCreators } from '@/domains/creator/repositories/Creators/creators'
import { getRepositoriesEvents } from '@/domains/event/repositories/Events/events'
import { getRepositoriesSeries } from '@/domains/serie/repositories/Series/series'
import { CharacterModel } from '@/domains/character/models/character'
import { ComicModel } from '@/domains/comic/models/comic'
import { CreatorModel } from '@/domains/creator/models/creator'
import { EventModel } from '@/domains/event/models/event'
import { SerieModel } from '@/domains/serie/models/serie'

export const useCatalogStore = defineStore('catalogStore', {
  state: () => ({
    characters: [] as CharacterModel[],
    comics: [] as ComicModel[],
    creators: [] as CreatorModel[],
    events: [] as EventModel[],
    series: [] as SerieModel[],
    filteredCharacters: [] as CharacterModel[],
    filteredComics: [] as ComicModel[],
    filteredCreators: [] as CreatorModel[],
    filteredEvents: [] as EventModel[],
    filteredSeries: [] as SerieModel[],
    loading: false as boolean,
    error: '' as string | null,
    offset: 0,
    limit: 15,
    filter: '',
    selectedCategories: [] as string[] // Categorías seleccionadas
  }),

  actions: {
    async getCatalogData() {
      this.loading = true
      this.error = null

      try {
        // Desestructuramos los valores devueltos por Promise.all
        const [characters, comics, creators, events, series] = await Promise.all([
          getRepositoriesCharacters(this.limit, this.offset),
          getRepositoriesComics(this.limit, this.offset),
          getRepositoriesCreators(this.limit, this.offset),
          getRepositoriesEvents(this.limit, this.offset),
          getRepositoriesSeries(this.limit, this.offset)
        ])

        this.characters = characters
        this.comics = comics
        this.creators = creators
        this.events = events
        this.series = series

        this.applyCategoryFilter() // Filtramos según las categorías seleccionadas
      } catch (err) {
        this.error = 'Failed to fetch catalog data'
      } finally {
        this.loading = false
      }
    },

    // Aplicar filtro de búsqueda
    async applyFilter() {
      this.loading = true

      try {
        const { characters, comics, creators, events, series } = await getFilteredCatalogData(
          this.filter,
          this.selectedCategories
        )

        this.filteredCharacters = characters || []
        this.filteredComics = comics || []
        this.filteredCreators = creators || []
        this.filteredEvents = events || []
        this.filteredSeries = series || []
      } catch (error) {
        this.error = 'Error while applying filter'
      } finally {
        this.loading = false
      }
    },

    // Aplicar filtro de categorías
    applyCategoryFilter() {
      if (this.selectedCategories.length === 0) {
        this.filteredCharacters = this.characters
        this.filteredComics = this.comics
        this.filteredCreators = this.creators
        this.filteredEvents = this.events
        this.filteredSeries = this.series
      } else {
        this.filteredCharacters = this.selectedCategories.includes('characters')
          ? this.characters
          : []
        this.filteredComics = this.selectedCategories.includes('comics') ? this.comics : []
        this.filteredCreators = this.selectedCategories.includes('creators') ? this.creators : []
        this.filteredEvents = this.selectedCategories.includes('events') ? this.events : []
        this.filteredSeries = this.selectedCategories.includes('series') ? this.series : []
      }
    },

    // Actualizar las categorías seleccionadas y recargar los datos
    updateSelectedCategories(categories: string[]) {
      this.selectedCategories = categories
      if (!this.filter) {
        this.getCatalogData()
      } else {
        this.applyFilter()
      }
    },

    // Función para ordenar A-Z o Z-A
    sortByName(order: 'asc' | 'desc') {
      const sortFunction = (a: { name: string }, b: { name: string }) =>
        order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)

      this.filteredCharacters = this.filteredCharacters.sort(sortFunction)
      this.filteredComics = this.filteredComics.sort((a, b) =>
        order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      )
      this.filteredCreators = this.filteredCreators.sort((a, b) =>
        order === 'asc'
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName)
      )
      this.filteredEvents = this.filteredEvents.sort((a, b) =>
        order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      )
      this.filteredSeries = this.filteredSeries.sort((a, b) =>
        order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      )
    }
  }
})
