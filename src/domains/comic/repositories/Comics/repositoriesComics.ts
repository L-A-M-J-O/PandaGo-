import apiService from '@/api/ApiService'
import { ComicModel } from '@/domains/comic/models/comic'

export const getRepositoriesComics = async (
  limit: number,
  offset: number
): Promise<ComicModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }
    const response = await apiService.get('/comics', { params })
    return response.data.data.results as ComicModel[]
  } catch (error) {
    throw new Error('Error fetching comics')
  }
}

export const getRepositoriesComicsFilter = async (title: string): Promise<ComicModel[]> => {
  try {
    const params: any = {
      title
    }

    const response = await apiService.get('/comics', { params })
    return response.data.data.results as ComicModel[]
  } catch (error) {
    throw new Error('Error fetching filtered comics')
  }
}

export const getRepositoriesComicsFilterByProperties = async (properties: {
  [key: string]: any
}): Promise<ComicModel[]> => {
  try {
    const response = await apiService.get('/comics', {
      params: properties
    })
    return response.data.data.results as ComicModel[]
  } catch (error) {
    throw new Error('Error fetching comics by properties')
  }
}
