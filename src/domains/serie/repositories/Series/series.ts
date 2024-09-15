// src/domains/serie/repositories/series.ts
import apiService from '@/api/ApiService'
import { SerieModel } from '@/domains/serie/models/serie'

export const getRepositoriesSeries = async (
  limit: number,
  offset: number
): Promise<SerieModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }

    const response = await apiService.get('/series', { params })
    return response.data.data.results as SerieModel[]
  } catch (error) {
    throw new Error('Error fetching series')
  }
}

export const getRepositoriesSeriesFilter = async (title: string): Promise<SerieModel[]> => {
  try {
    const params: any = {
      title
    }

    const response = await apiService.get('/series', { params })
    return response.data.data.results as SerieModel[]
  } catch (error) {
    throw new Error('Error fetching filtered series')
  }
}
