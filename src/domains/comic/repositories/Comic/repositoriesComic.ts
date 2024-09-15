import apiService from '@/api/ApiService'

export const getComicById = async (characterId: string) => {
  try {
    const response = await apiService.get(`/comics/${characterId}`)
    return response.data.data.results[0]
  } catch (error) {
    throw new Error('Error fetching character')
  }
}
