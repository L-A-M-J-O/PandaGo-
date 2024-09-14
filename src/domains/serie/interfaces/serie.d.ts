export interface SeriesUrl {
  type: string
  url: string
}

export interface SeriesThumbnail {
  path: string
  extension: string
}

export interface SeriesCreator {
  resourceURI: string
  name: string
  role: string
}

export interface SeriesCreators {
  available: number
  collectionURI: string
  items: SeriesCreator[]
  returned: number
}

export interface SeriesCharacter {
  available: number
  collectionURI: string
  items: any[] // Puedes definir una interfaz si es necesario
  returned: number
}

export interface SeriesStory {
  resourceURI: string
  name: string
  type: string
}

export interface SeriesStories {
  available: number
  collectionURI: string
  items: SeriesStory[]
  returned: number
}

export interface SeriesComic {
  resourceURI: string
  name: string
}

export interface SeriesComics {
  available: number
  collectionURI: string
  items: SeriesComic[]
  returned: number
}

export interface SeriesEvents {
  available: number
  collectionURI: string
  items: any[] // Puedes definir una interfaz si es necesario
  returned: number
}

export interface ISeries {
  id: number
  title: string
  description: string | null
  resourceURI: string
  urls: SeriesUrl[]
  startYear: number
  endYear: number
  rating: string
  type: string
  modified: string
  thumbnail: SeriesThumbnail
  creators: SeriesCreators
  characters: SeriesCharacter
  stories: SeriesStories
  comics: SeriesComics
  events: SeriesEvents
  next: null
  previous: null
}
