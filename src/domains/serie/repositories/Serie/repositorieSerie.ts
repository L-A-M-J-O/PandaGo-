import apiService from '@/api/ApiService'

export const getSerieById = async (serieId: string) => {
  try {
    const response = await apiService.get(`/series/${serieId}`)
    return response.data.data.results[0]
  } catch (error) {
    throw new Error('Error fetching character')
  }
}
