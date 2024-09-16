import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCatalogStore } from '@/stores/catalogStore'
import { getRepositoriesCharacters } from '@/domains/character/repositories/Characters/repositoriesCharacters'

vi.mock('@/domains/character/repositories/Characters/repositoriesCharacters')

describe('catalogStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debe obtener los datos de personajes correctamente', async () => {
    const store = useCatalogStore()
    vi.mocked(getRepositoriesCharacters).mockResolvedValue([
      {
        id: 1,
        name: 'Iron Man',
        description: 'A superhero',
        modified: '2023-09-15T00:00:00Z',
        thumbnail: {
          path: 'path/to/image',
          extension: 'jpg'
        },
        resourceURI: 'http://example.com/resource',
        comics: {
          available: 5,
          collectionURI: 'http://example.com/comics',
          items: [],
          returned: 5
        },
        series: {
          available: 2,
          collectionURI: 'http://example.com/series',
          items: [],
          returned: 2
        },
        stories: {
          available: 1,
          collectionURI: 'http://example.com/stories',
          items: [],
          returned: 1
        },
        events: {
          available: 1,
          collectionURI: 'http://example.com/events',
          items: [],
          returned: 1
        },
        urls: [],
        getThumbnailUrl: () => 'path/to/image.jpg'
      }
    ])

    await store.getCatalogData()

    expect(store.characters.length).toBe(1)
    expect(store.characters[0].name).toBe('Iron Man')
  })
})
