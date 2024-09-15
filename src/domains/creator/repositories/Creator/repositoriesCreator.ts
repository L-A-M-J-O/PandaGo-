import apiService from '@/api/ApiService'

export const getCreatorById = async (creatorId: string) => {
  try {
    const response = await apiService.get(`/creators/${creatorId}`)
    return response.data.data.results[0]
  } catch (error) {
    throw new Error('Error fetching character')
  }
}
