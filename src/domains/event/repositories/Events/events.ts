import apiService from '@/api/ApiService'
import { EventModel } from '@/domains/event/models/event'

export const getRepositoriesEvents = async (
  limit: number,
  offset: number,
  name?: string
): Promise<EventModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }

    if (name) {
      params.name = name
    }

    const response = await apiService.get('/events', { params })
    return response.data.data.results as EventModel[]
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
