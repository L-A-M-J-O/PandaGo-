import { getStoryById } from '../../story/repositories/Story/repositoriesStory'

export const getAdapterStoryById = async (storyId: string) => {
  try {
    const creator = await getStoryById(storyId)
    return creator
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
