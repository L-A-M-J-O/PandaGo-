import { getComicById } from '../../repositories/Comic/repositoriesComic'

export const getAdapterComicById = async (comicId: string) => {
  try {
    const comic = await getComicById(comicId)
    return comic
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
