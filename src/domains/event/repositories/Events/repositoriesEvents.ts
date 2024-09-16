import apiService from '@/api/ApiService'
import { EventModel } from '@/domains/event/models/event'

export const getRepositoriesEvents = async (
  limit: number,
  offset: number
): Promise<EventModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }

    const response = await apiService.get('/events', { params })
    return response.data.data.results as EventModel[]
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}

export const getRepositoriesEventsFilter = async (name: string): Promise<EventModel[]> => {
  try {
    const params: any = {
      name
    }

    const response = await apiService.get('/events', { params })
    return response.data.data.results as EventModel[]
  } catch (error) {
    throw new Error('Error fetching filtered events')
  }
}
