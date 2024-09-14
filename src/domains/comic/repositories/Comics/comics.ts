import apiService from '@/api/ApiService'
import { ComicModel } from '@/domains/comic/models/comic'

export const getRepositoriesComics = async (
  limit: number,
  offset: number,
  title?: string
): Promise<ComicModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }

    if (title) {
      params.title = title
    }

    const response = await apiService.get('/comics', { params })
    return response.data.data.results as ComicModel[]
  } catch (error) {
    throw new Error('Error fetching comics')
  }
}
