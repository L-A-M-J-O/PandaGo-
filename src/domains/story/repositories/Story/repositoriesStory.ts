import apiService from '@/api/ApiService'

export const getStoryById = async (storyId: string) => {
  try {
    const response = await apiService.get(`/stories/${storyId}`)
    return response.data.data.results[0]
  } catch (error) {
    throw new Error('Error fetching character')
  }
}
