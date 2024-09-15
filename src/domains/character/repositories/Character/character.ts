import apiService from '@/api/ApiService'

export const getCharacterById = async (characterId: string) => {
  try {
    const response = await apiService.get(`/characters/${characterId}`)
    return response.data.data.results[0]
  } catch (error) {
    throw new Error('Error fetching character')
  }
}
