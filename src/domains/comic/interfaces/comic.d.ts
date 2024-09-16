export interface ComicUrl {
  type: string
  url: string
}

export interface ComicSeries {
  resourceURI: string
  name: string
}

export interface ComicVariant {
  resourceURI: string
  name: string
}

export interface ComicDate {
  type: string
  date: string
}

export interface ComicPrice {
  type: string
  price: number
}

export interface ComicThumbnail {
  path: string
  extension: string
}

export interface ComicCreator {
  resourceURI: string
  name: string
  role: string
}

export interface ComicCharacter {
  available: number
  collectionURI: string
  items: any[]
  returned: number
}

export interface ComicStory {
  resourceURI: string
  name: string
  type: string
}

export interface ComicStories {
  available: number
  collectionURI: string
  items: ComicStory[]
  returned: number
}

// Interface para eventos
export interface ComicEvents {
  available: number
  collectionURI: string
  items: any[]
  returned: number
}

export interface IComic {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  modified: string
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: number
  textObjects: any[]
  resourceURI: string
  urls: ComicUrl[]
  series: ComicSeries
  variants: ComicVariant[]
  collections: any[]
  collectedIssues: any[]
  dates: ComicDate[]
  prices: ComicPrice[]
  thumbnail: ComicThumbnail
  images: any[]
  creators: {
    available: number
    collectionURI: string
    items: ComicCreator[]
    returned: number
  }
  characters: ComicCharacter
  stories: ComicStories
  events: ComicEvents
}
