import { getCacheData, setCacheData } from '@/utils/cacheService'
import { getRepositoriesCharacters } from '../repositories/catalog/characters'
import { CharacterModel } from '@/domains/character/models/character'

const CACHE_KEY = 'catalog_characters'

export const getAdapterCharacters = async (): Promise<CharacterModel[]> => {
  const cachedData = await getCacheData(CACHE_KEY)
  if (cachedData) {
    return cachedData as CharacterModel[]
  }

  try {
    const characters = await getRepositoriesCharacters()
    await setCacheData(CACHE_KEY, characters)
    return characters
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
