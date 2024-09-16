// tests/components/CardCharacter.test.ts
import { render } from '@testing-library/vue'
import CardCharacter from '@/components/common/CardCharacter/CardCharacter.vue'
import { describe, it, expect } from 'vitest'

// Simulación del modelo CharacterModel
const mockCharacter = {
  id: 1,
  name: 'Iron Man',
  description: 'Genius, Billionaire, Playboy, Philanthropist',
  modified: '2023-09-01T12:00:00Z',
  thumbnail: {
    path: 'path/to/image',
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
  getThumbnailUrl() {
    return `${this.thumbnail.path}.${this.thumbnail.extension}`
  }
}

describe('CardCharacter.vue', () => {
  it('debe renderizar el nombre del personaje correctamente', () => {
    const { getByText } = render(CardCharacter, {
      props: { character: mockCharacter }
    })
    expect(getByText('Iron Man')).toBeTruthy() // Usa toBeTruthy en lugar de toBeInTheDocument
  })
})
