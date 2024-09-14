export interface StorySeries {
  resourceURI: string
  name: string
}

export interface StoryComic {
  resourceURI: string
  name: string
}

export interface StoryCreators {
  available: number
  collectionURI: string
  items: any[] // Puedes definir una interfaz para los creadores si es necesario
  returned: number
}

export interface StoryCharacters {
  available: number
  collectionURI: string
  items: any[] // Puedes definir una interfaz para los personajes si es necesario
  returned: number
}

export interface StoryEvents {
  available: number
  collectionURI: string
  items: any[] // Puedes definir una interfaz para los eventos si es necesario
  returned: number
}

export interface OriginalIssue {
  resourceURI: string
  name: string
}

export interface IStory {
  id: number
  title: string
  description: string
  resourceURI: string
  type: string
  modified: string
  thumbnail: null // En este caso, el thumbnail no está disponible
  creators: StoryCreators
  characters: StoryCharacters
  series: {
    available: number
    collectionURI: string
    items: StorySeries[]
    returned: number
  }
  comics: {
    available: number
    collectionURI: string
    items: StoryComic[]
    returned: number
  }
  events: StoryEvents
  originalIssue: OriginalIssue
}
