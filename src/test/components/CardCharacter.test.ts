import { render } from '@testing-library/vue'
import CardCharacter from '@/components/common/CardCharacter/CardCharacter.vue'
import { describe, it, expect } from 'vitest'

describe('CardCharacter.vue', () => {
  it('debe renderizar el nombre del personaje correctamente', () => {
    const character = {
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

    const { getByText } = render(CardCharacter, {
      props: { character }
    })

    expect(getByText('Iron Man')).toBeTruthy()
  })
})
