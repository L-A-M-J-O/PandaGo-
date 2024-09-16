import { getRepositoriesCharactersFilter } from '@/domains/character/repositories/Characters/repositoriesCharacters'
import { getRepositoriesComicsFilter } from '@/domains/comic/repositories/Comics/repositoriesComics'
import { getRepositoriesCreatorsFilter } from '@/domains/creator/repositories/Creators/repositoriesCreators'
import { getRepositoriesSeriesFilter } from '@/domains/serie/repositories/Series/repositoriesSeries'
import { getRepositoriesEventsFilter } from '@/domains/event/repositories/Events/repositoriesEvents'

import { getRepositoriesCharacters } from '@/domains/character/repositories/Characters/repositoriesCharacters'
import { getRepositoriesComics } from '@/domains/comic/repositories/Comics/repositoriesComics'
import { getRepositoriesCreators } from '@/domains/creator/repositories/Creators/repositoriesCreators'
import { getRepositoriesEvents } from '@/domains/event/repositories/Events/repositoriesEvents'
import { getRepositoriesSeries } from '@/domains/serie/repositories/Series/repositoriesSeries'

export const getFilteredCatalogData = async (
  filter: string,
  selectedCategories: string[],
  limit = 15,
  offset = 0
) => {
  const results: {
    characters?: any[]
    comics?: any[]
    creators?: any[]
    events?: any[]
    series?: any[]
  } = {}

  try {
    // Si el search tiene contenido
    if (filter) {
      if (selectedCategories.length > 0) {
        // Si hay categorías seleccionadas, filtrar por las seleccionadas y el search
        if (selectedCategories.includes('characters')) {
          results.characters = await getRepositoriesCharactersFilter(filter)
        }
        if (selectedCategories.includes('comics')) {
          results.comics = await getRepositoriesComicsFilter(filter)
        }
        if (selectedCategories.includes('creators')) {
          results.creators = await getRepositoriesCreatorsFilter(filter)
        }
        if (selectedCategories.includes('events')) {
          results.events = await getRepositoriesEventsFilter(filter)
        }
        if (selectedCategories.includes('series')) {
          results.series = await getRepositoriesSeriesFilter(filter)
        }
      } else {
        // Si no hay categorías seleccionadas, buscar en todas las categorías
        const [characters, comics, creators, events, series] = await Promise.all([
          getRepositoriesCharactersFilter(filter),
          getRepositoriesComicsFilter(filter),
          getRepositoriesCreatorsFilter(filter),
          getRepositoriesEventsFilter(filter),
          getRepositoriesSeriesFilter(filter)
        ])

        results.characters = characters
        results.comics = comics
        results.creators = creators
        results.events = events
        results.series = series
      }
    } else {
      // Si no hay filtro en el search
      if (selectedCategories.length > 0) {
        // Filtrar por las categorías seleccionadas sin search
        if (selectedCategories.includes('characters')) {
          results.characters = await getRepositoriesCharacters(limit, offset)
        }
        if (selectedCategories.includes('comics')) {
          results.comics = await getRepositoriesComics(limit, offset)
        }
        if (selectedCategories.includes('creators')) {
          results.creators = await getRepositoriesCreators(limit, offset)
        }
        if (selectedCategories.includes('events')) {
          results.events = await getRepositoriesEvents(limit, offset)
        }
        if (selectedCategories.includes('series')) {
          results.series = await getRepositoriesSeries(limit, offset)
        }
      } else {
        // Si no hay categorías seleccionadas ni search, traer los datos por defecto
        const [characters, comics, creators, events, series] = await Promise.all([
          getRepositoriesCharacters(limit, offset),
          getRepositoriesComics(limit, offset),
          getRepositoriesCreators(limit, offset),
          getRepositoriesEvents(limit, offset),
          getRepositoriesSeries(limit, offset)
        ])

        results.characters = characters
        results.comics = comics
        results.creators = creators
        results.events = events
        results.series = series
      }
    }

    return results
  } catch (error) {
    throw new Error('Error fetching catalog data')
  }
}
