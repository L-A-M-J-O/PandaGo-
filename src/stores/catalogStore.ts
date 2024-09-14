import { defineStore } from 'pinia'
import { getCatalogData } from '@/domains/catalog/adapters/catalog'
import { getFilteredCatalogData } from '@/domains/catalog/adapters/catalgoFilter'
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
    limit: 10,
    filter: '',
    selectedCategories: [''] as string[]
  }),

  actions: {
    async getCatalogData() {
      this.loading = true
      this.error = null

      try {
        const { characters, comics, creators, events, series } = await getCatalogData(
          this.limit,
          this.offset
        )

        this.characters = characters
        this.comics = comics
        this.creators = creators
        this.events = events
        this.series = series

        // Filtramos según las categorías seleccionadas
        this.filteredCharacters =
          this.selectedCategories.includes('') || this.selectedCategories.includes('characters')
            ? characters
            : []
        this.filteredComics =
          this.selectedCategories.includes('') || this.selectedCategories.includes('comics')
            ? comics
            : []
        this.filteredCreators =
          this.selectedCategories.includes('') || this.selectedCategories.includes('creators')
            ? creators
            : []
        this.filteredEvents =
          this.selectedCategories.includes('') || this.selectedCategories.includes('events')
            ? events
            : []
        this.filteredSeries =
          this.selectedCategories.includes('') || this.selectedCategories.includes('series')
            ? series
            : []

        this.offset += this.limit
      } catch (err) {
        this.error = 'Failed to fetch catalog data'
      } finally {
        this.loading = false
      }
    },

    // Aplicar filtro de búsqueda (sin paginación)
    async applyFilter(filter: string) {
      this.filter = filter
      this.loading = true

      try {
        if (!filter) {
          this.getCatalogData()
          return
        }

        const { characters, comics, creators, events } = await getFilteredCatalogData(filter)

        // Filtramos según las categorías seleccionadas
        this.filteredCharacters =
          this.selectedCategories.includes('') || this.selectedCategories.includes('characters')
            ? characters
            : []
        this.filteredComics =
          this.selectedCategories.includes('') || this.selectedCategories.includes('comics')
            ? comics
            : []
        this.filteredCreators =
          this.selectedCategories.includes('') || this.selectedCategories.includes('creators')
            ? creators
            : []
        this.filteredEvents =
          this.selectedCategories.includes('') || this.selectedCategories.includes('events')
            ? events
            : []
      } catch (error) {
        this.error = 'Error while applying filter'
      } finally {
        this.loading = false
      }
    },

    updateSelectedCategories(categories: string[]) {
      // Filtrar categorías para excluir 'all' si está presente
      const filteredCategories = categories.filter((category) => category !== '')

      // Si no hay categorías seleccionadas, asignamos 'all' por defecto
      if (filteredCategories.length === 0) {
        this.selectedCategories = ['']
      } else {
        // Si hay categorías seleccionadas, actualizamos el estado sin 'all'
        this.selectedCategories = filteredCategories
      }

      // Llamar la función para recargar los datos con las nuevas categorías seleccionadas
      this.getCatalogData()
    }
  }
})
