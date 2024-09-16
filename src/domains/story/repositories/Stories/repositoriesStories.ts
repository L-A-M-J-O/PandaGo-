import apiService from '@/api/ApiService'
import { StoryModel } from '@/domains/story/models/story'

export const getRepositoriesStories = async (
  limit: number,
  offset: number,
  modifiedSince?: string
): Promise<StoryModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }

    if (modifiedSince) {
      params.modifiedSince = modifiedSince
    }

    const response = await apiService.get('/stories', { params })
    return response.data.data.results as StoryModel[]
  } catch (error) {
    throw new Error('Error fetching stories')
  }
}
