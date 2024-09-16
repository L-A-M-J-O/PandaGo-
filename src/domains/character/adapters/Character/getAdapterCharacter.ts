import { getCharacterById } from '../../repositories/Character/repositoriesCharacter'

export const getAdapterCharacterById = async (characterId: string) => {
  try {
    const character = await getCharacterById(characterId)
    return character
  } catch (error) {
    throw new Error('Error fetching characters')
  }
}
