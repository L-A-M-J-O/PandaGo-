// tests/stores/catalogStore.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest' // Importa `beforeEach`
import { setActivePinia, createPinia } from 'pinia'
import { useCatalogStore } from '@/stores/catalogStore'
import { getRepositoriesCharacters } from '@/domains/character/repositories/Characters/repositoriesCharacters'
import { CharacterModel } from '@/domains/character/models/character' // Asegúrate de importar el modelo

vi.mock('@/domains/character/repositories/Characters/repositoriesCharacters')

describe('catalogStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debe obtener los datos de personajes correctamente', async () => {
    const store = useCatalogStore()

    // Simulamos una respuesta mock con todos los campos requeridos por CharacterModel
    const mockCharacter: CharacterModel = {
      id: 1,
      name: 'Iron Man',
      description: 'Genius, Billionaire, Playboy, Philanthropist',
      modified: '2023-09-01T12:00:00Z',
      thumbnail: {
        path: 'path/to/thumbnail',
        extension: 'jpg'
      },
      resourceURI: 'http://gateway.marvel.com/v1/public/characters/1',
      comics: {
        available: 10,
        collectionURI: 'http://gateway.marvel.com/v1/public/characters/1/comics',
        items: [],
        returned: 10
      },
      series: {
        available: 5,
        collectionURI: 'http://gateway.marvel.com/v1/public/characters/1/series',
        items: [],
        returned: 5
      },
      stories: {
        available: 7,
        collectionURI: 'http://gateway.marvel.com/v1/public/characters/1/stories',
        items: [],
        returned: 7
      },
      events: {
        available: 2,
        collectionURI: 'http://gateway.marvel.com/v1/public/characters/1/events',
        items: [],
        returned: 2
      },
      urls: [],

      // Agrega el método `getThumbnailUrl` requerido
      getThumbnailUrl() {
        return `${this.thumbnail.path}.${this.thumbnail.extension}`
      }
    }

    // Mock de getRepositoriesCharacters con la respuesta correcta
    vi.mocked(getRepositoriesCharacters).mockResolvedValue([mockCharacter])

    // Llamada a la función store
    await store.getCatalogData()

    // Verificación de los resultados
    expect(store.characters.length).toBe(1)
    expect(store.characters[0].name).toBe('Iron Man')
    expect(store.characters[0].description).toBe('Genius, Billionaire, Playboy, Philanthropist')
    expect(store.characters[0].getThumbnailUrl()).toBe('path/to/thumbnail.jpg')
  })
})
