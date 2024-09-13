import apiService from '@/api/ApiService'
import { CharacterModel } from '@/domains/character/models/character'

export const getRepositoriesCharacters = async (): Promise<CharacterModel[]> => {
  try {
    const response = await apiService.get('/characters')
    return response.data.data.results as CharacterModel[]
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
