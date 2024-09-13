import { defineStore } from 'pinia'
import { getAdapterCharacters } from '@/domains/catalog/adapters/catalog'
import { CharacterModel } from '@/domains/character/models/character'

export const useCatalogStore = defineStore('catalogStore', {
  state: () => ({
    characters: [] as CharacterModel[],
    loading: false as boolean,
    error: '' as string | null
  }),
  actions: {
    async getStoreCharacterCatalog() {
      this.loading = true
      this.error = null
      try {
        const characters = await getAdapterCharacters()
        this.characters = characters
      } catch (err) {
        this.error = 'Failed to fetch characters'
      } finally {
        this.loading = false
      }
    }
  }
})
