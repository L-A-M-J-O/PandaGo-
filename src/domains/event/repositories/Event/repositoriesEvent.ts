import apiService from '@/api/ApiService'

export const getEventById = async (eventId: string) => {
  try {
    const response = await apiService.get(`/events/${eventId}`)
    return response.data.data.results[0]
  } catch (error) {
    throw new Error('Error fetching character')
  }
}
