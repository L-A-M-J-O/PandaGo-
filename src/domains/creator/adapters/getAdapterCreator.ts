import { getCreatorById } from '../repositories/Creator/repositoriesCreator'

export const getAdapterCreatorById = async (creatorId: string) => {
  try {
    const creator = await getCreatorById(creatorId)
    return creator
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
