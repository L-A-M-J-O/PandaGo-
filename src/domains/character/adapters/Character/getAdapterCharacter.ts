import { getCharacterById } from '../../repositories/Character/character'

export const getAdapterCharacterById = async (characterId: string) => {
  try {
    const characters = await getCharacterById(characterId)
    return characters
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
