import { getSerieById } from '../repositories/Serie/repositorieSerie'

export const getAdapterSerieById = async (serieId: string) => {
  try {
    const creator = await getSerieById(serieId)
    return creator
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
