import apiService from '@/api/ApiService'
import { CharacterModel } from '@/domains/character/models/character'

export const getRepositoriesCharacters = async (
  limit: number,
  offset: number
): Promise<CharacterModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }
    const response = await apiService.get('/characters', { params })
    return response.data.data.results as CharacterModel[]
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}

export const getRepositoriesCharactersFilter = async (name: string): Promise<CharacterModel[]> => {
  try {
    const params: any = {
      name
    }

    const response = await apiService.get('/characters', { params })
    return response.data.data.results as CharacterModel[]
  } catch (error) {
    throw new Error('Error fetching filtered characters')
  }
}
