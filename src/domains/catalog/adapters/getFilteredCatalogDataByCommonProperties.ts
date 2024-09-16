import { getRepositoriesCharactersFilterByProperties } from '@/domains/character/repositories/Characters/repositoriesCharacters'
import { getRepositoriesCreatorsFilterByProperties } from '@/domains/creator/repositories/Creators/repositoriesCreators'
import { getRepositoriesComicsFilterByProperties } from '@/domains/comic/repositories/Comics/repositoriesComics'
import { getRepositoriesSeriesFilterByProperties } from '@/domains/serie/repositories/Series/repositoriesSeries'
import { getRepositoriesEventsFilterByProperties } from '@/domains/event/repositories/Events/repositoriesEvents'

export const getFilteredCatalogDataByCommonProperties = async (properties: {
  [key: string]: any
}) => {
  const results: {
    characters?: any[]
    comics?: any[]
    creators?: any[]
    events?: any[]
    series?: any[]
  } = {}

  try {
    // Realiza las consultas filtrando por las propiedades pasadas
    const [characters, comics, creators, events, series] = await Promise.all([
      getRepositoriesCharactersFilterByProperties(properties),
      getRepositoriesComicsFilterByProperties(properties),
      getRepositoriesCreatorsFilterByProperties(properties),
      getRepositoriesEventsFilterByProperties(properties),
      getRepositoriesSeriesFilterByProperties(properties)
    ])

    results.characters = characters
    results.comics = comics
    results.creators = creators
    results.events = events
    results.series = series

    return results
  } catch (error) {
    throw new Error('Error fetching catalog data by properties')
  }
}
