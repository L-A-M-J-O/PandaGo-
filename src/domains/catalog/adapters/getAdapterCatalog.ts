import { getCacheData, setCacheData } from '@/utils/cacheService'
import { getRepositoriesCharacters } from '@/domains/character/repositories/Characters/repositoriesCharacters'
import { getRepositoriesComics } from '@/domains/comic/repositories/Comics/repositoriesComics'
import { getRepositoriesCreators } from '@/domains/creator/repositories/Creators/repositoriesCreators'
import { getRepositoriesEvents } from '@/domains/event/repositories/Events/repositoriesEvents'
import { getRepositoriesSeries } from '@/domains/serie/repositories/Series/repositoriesSeries'
import { getRepositoriesStories } from '@/domains/story/repositories/Stories/repositoriesStories'
import { CharacterModel } from '@/domains/character/models/character'
import { ComicModel } from '@/domains/comic/models/comic'
import { CreatorModel } from '@/domains/creator/models/creator'
import { EventModel } from '@/domains/event/models/event'
import { SerieModel } from '@/domains/serie/models/serie'
import { StoryModel } from '@/domains/story/models/story'

// Cache keys for different types of data
const CACHE_KEY_CHARACTERS = 'catalog_characters'
const CACHE_KEY_COMICS = 'catalog_comics'
const CACHE_KEY_CREATORS = 'catalog_creators'
const CACHE_KEY_EVENTS = 'catalog_events'
const CACHE_KEY_SERIES = 'catalog_series'
const CACHE_KEY_STORIES = 'catalog_stories'

// Function to get catalog data (without filters, with pagination)
export const getCatalogData = async (limit: number, offset: number) => {
  const characters = await getAdapterCharacters(limit, offset)
  const comics = await getAdapterComics(limit, offset)
  const creators = await getAdapterCreators(limit, offset)
  const events = await getAdapterEvents(limit, offset)
  const series = await getAdapterSeries(limit, offset)
  const stories = await getAdapterStories(limit, offset)

  return { characters, comics, creators, events, series, stories }
}

export const getAdapterCharacters = async (
  limit: number,
  offset: number
): Promise<CharacterModel[]> => {
  const cachedData = await getCacheData(CACHE_KEY_CHARACTERS)
  if (cachedData) {
    return cachedData as CharacterModel[]
  }

  try {
    const characters = await getRepositoriesCharacters(limit, offset)
    await setCacheData(CACHE_KEY_CHARACTERS, characters)
    return characters
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}

// Adapter for Comics (without filters)
export const getAdapterComics = async (limit: number, offset: number): Promise<ComicModel[]> => {
  const cachedData = await getCacheData(CACHE_KEY_COMICS)
  if (cachedData) {
    return cachedData as ComicModel[]
  }

  try {
    const comics = await getRepositoriesComics(limit, offset)
    await setCacheData(CACHE_KEY_COMICS, comics)
    return comics
  } catch (error) {
    throw new Error('Error fetching comics')
  }
}

// Adapter for Creators (without filters)
export const getAdapterCreators = async (
  limit: number,
  offset: number
): Promise<CreatorModel[]> => {
  try {
    const creators = await getRepositoriesCreators(limit, offset)
    return creators
  } catch (error) {
    throw new Error('Error fetching creators')
  }
}

// Adapter for Events (without filters)
export const getAdapterEvents = async (limit: number, offset: number): Promise<EventModel[]> => {
  const cachedData = await getCacheData(CACHE_KEY_EVENTS)
  if (cachedData) {
    return cachedData as EventModel[]
  }

  try {
    const events = await getRepositoriesEvents(limit, offset)
    await setCacheData(CACHE_KEY_EVENTS, events)
    return events
  } catch (error) {
    throw new Error('Error fetching events')
  }
}

// Adapter for Series (without filters)
export const getAdapterSeries = async (limit: number, offset: number): Promise<SerieModel[]> => {
  const cachedData = await getCacheData(CACHE_KEY_SERIES)
  if (cachedData) {
    return cachedData as SerieModel[]
  }

  try {
    const series = await getRepositoriesSeries(limit, offset)
    await setCacheData(CACHE_KEY_SERIES, series)
    return series
  } catch (error) {
    throw new Error('Error fetching series')
  }
}

// Adapter for Stories (without filters)
export const getAdapterStories = async (limit: number, offset: number): Promise<StoryModel[]> => {
  const cachedData = await getCacheData(CACHE_KEY_STORIES)
  if (cachedData) {
    return cachedData as StoryModel[]
  }

  try {
    const stories = await getRepositoriesStories(limit, offset)
    await setCacheData(CACHE_KEY_STORIES, stories)
    return stories
  } catch (error) {
    throw new Error('Error fetching stories')
  }
}
