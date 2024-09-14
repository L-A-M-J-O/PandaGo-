// src/domains/serie/repositories/series.ts
import apiService from '@/api/ApiService'
import { SerieModel } from '@/domains/serie/models/serie'

export const getRepositoriesSeries = async (
  limit: number,
  offset: number,
  title?: string
): Promise<SerieModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }

    if (title) {
      params.title = title
    }

    const response = await apiService.get('/series', { params })
    return response.data.data.results as SerieModel[]
  } catch (error) {
    throw new Error('Error fetching series')
  }
}
