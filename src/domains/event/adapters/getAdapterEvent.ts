import { getEventById } from '../repositories/Event/repositoriesEvent'

export const getAdapterEventById = async (eventId: string) => {
  try {
    const creator = await getEventById(eventId)
    return creator
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
