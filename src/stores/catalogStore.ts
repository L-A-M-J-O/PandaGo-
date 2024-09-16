import { defineStore } from 'pinia'
import { getFilteredCatalogData } from '@/domains/catalog/adapters/getAdapterCatalogFilter'
import { getRepositoriesCharacters } from '@/domains/character/repositories/Characters/repositoriesCharacters'
import { getRepositoriesComics } from '@/domains/comic/repositories/Comics/repositoriesComics'
import { getRepositoriesCreators } from '@/domains/creator/repositories/Creators/repositoriesCreators'
import { getRepositoriesEvents } from '@/domains/event/repositories/Events/repositoriesEvents'
import { getRepositoriesSeries } from '@/domains/serie/repositories/Series/repositoriesSeries'
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
    limit: 8,
    filter: '',
    selectedCategories: [] as string[],
    filterDate: '' as string // Fecha seleccionada
  }),

  actions: {
    async getCatalogData() {
      this.loading = true
      this.error = null

      try {
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

        if (this.filterDate) {
          this.applyDateFilter()
        }
      } catch (error) {
        this.error = 'Error while applying filter'
      } finally {
        this.loading = false
      }
    },

    applyDateFilter() {
      const selectedDate = new Date(this.filterDate)

      // Filtrar personajes
      this.filteredCharacters = this.filteredCharacters.filter((character) => {
        return new Date(character.modified) >= selectedDate
      })

      // Filtrar cómics
      this.filteredComics = this.filteredComics.filter((comic) => {
        return new Date(comic.modified) >= selectedDate
      })

      // Filtrar creadores
      this.filteredCreators = this.filteredCreators.filter((creator) => {
        return new Date(creator.modified) >= selectedDate
      })

      // Filtrar eventos
      this.filteredEvents = this.filteredEvents.filter((event) => {
        return new Date(event.modified) >= selectedDate
      })

      // Filtrar series
      this.filteredSeries = this.filteredSeries.filter((serie) => {
        return new Date(serie.modified) >= selectedDate
      })
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

    // Actualizar la fecha seleccionada y aplicar el filtro de fecha
    updateSelectedDate(date: string) {
      this.filterDate = date

      // Si hay un filtro de búsqueda, aplicar filtro de fecha sobre los resultados de búsqueda
      if (this.filter) {
        this.applyDateFilter()
      } else {
        // Si no hay búsqueda, filtrar por fecha en todos los datos
        this.filterByDateWithoutSearch()
      }
    },

    // Filtrar por fecha sin un filtro de búsqueda
    filterByDateWithoutSearch() {
      const selectedDate = new Date(this.filterDate)

      // Filtrar personajes
      this.filteredCharacters = this.characters.filter((character) => {
        return new Date(character.modified) >= selectedDate
      })

      // Filtrar cómics
      this.filteredComics = this.comics.filter((comic) => {
        return new Date(comic.modified) >= selectedDate
      })

      // Filtrar creadores
      this.filteredCreators = this.creators.filter((creator) => {
        return new Date(creator.modified) >= selectedDate
      })

      // Filtrar eventos
      this.filteredEvents = this.events.filter((event) => {
        return new Date(event.modified) >= selectedDate
      })

      // Filtrar series
      this.filteredSeries = this.series.filter((serie) => {
        return new Date(serie.modified) >= selectedDate
      })
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
