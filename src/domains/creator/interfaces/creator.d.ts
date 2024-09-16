export interface CreatorUrl {
  type: string
  url: string
}

export interface CreatorThumbnail {
  path: string
  extension: string
}

export interface CreatorComic {
  resourceURI: string
  name: string
}

export interface CreatorComics {
  available: number
  collectionURI: string
  items: CreatorComic[]
  returned: number
}

export interface CreatorSeries {
  resourceURI: string
  name: string
}

export interface CreatorSeriesCollection {
  available: number
  collectionURI: string
  items: CreatorSeries[]
  returned: number
}

export interface CreatorStory {
  resourceURI: string
  name: string
  type: string
}

export interface CreatorStories {
  available: number
  collectionURI: string
  items: CreatorStory[]
  returned: number
}

export interface CreatorEvents {
  available: number
  collectionURI: string
  items: any[] // Puedes definirlo si es necesario
  returned: number
}

export interface ICreator {
  id: number
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  fullName: string
  modified: string
  thumbnail: CreatorThumbnail
  resourceURI: string
  comics: CreatorComics
  series: CreatorSeriesCollection
  stories: CreatorStories
  events: CreatorEvents
  urls: CreatorUrl[]
}
