export interface EventUrl {
  type: string
  url: string
}

export interface EventThumbnail {
  path: string
  extension: string
}

export interface EventCreator {
  resourceURI: string
  name: string
  role: string
}

export interface EventCreators {
  available: number
  collectionURI: string
  items: EventCreator[]
  returned: number
}

export interface EventCharacter {
  resourceURI: string
  name: string
}

export interface EventCharacters {
  available: number
  collectionURI: string
  items: EventCharacter[]
  returned: number
}

export interface EventStory {
  resourceURI: string
  name: string
  type: string
}

export interface EventStories {
  available: number
  collectionURI: string
  items: EventStory[]
  returned: number
}

export interface IEvent {
  id: number
  title: string
  description: string
  resourceURI: string
  urls: EventUrl[]
  modified: string
  start: string
  end: string
  thumbnail: EventThumbnail
  creators: EventCreators
  characters: EventCharacters
  stories: EventStories
}
