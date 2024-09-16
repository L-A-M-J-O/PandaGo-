import type {
  IComic,
  ComicUrl,
  ComicSeries,
  ComicVariant,
  ComicDate,
  ComicPrice,
  ComicThumbnail,
  ComicCreator,
  ComicCharacter,
  ComicStories,
  ComicEvents
} from '@/domains/comic/interfaces/comic'

export class ComicModel implements IComic {
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

  constructor(data: IComic) {
    this.id = data.id
    this.digitalId = data.digitalId
    this.title = data.title
    this.issueNumber = data.issueNumber
    this.variantDescription = data.variantDescription
    this.description = data.description || 'No description available'
    this.modified = data.modified
    this.isbn = data.isbn
    this.upc = data.upc
    this.diamondCode = data.diamondCode
    this.ean = data.ean
    this.issn = data.issn
    this.format = data.format
    this.pageCount = data.pageCount
    this.textObjects = data.textObjects
    this.resourceURI = data.resourceURI
    this.urls = data.urls
    this.series = data.series
    this.variants = data.variants
    this.collections = data.collections
    this.collectedIssues = data.collectedIssues
    this.dates = data.dates
    this.prices = data.prices
    this.thumbnail = data.thumbnail
    this.images = data.images
    this.creators = data.creators
    this.characters = data.characters
    this.stories = data.stories
    this.events = data.events
  }

  getThumbnailUrl(): string {
    return `${this.thumbnail.path}.${this.thumbnail.extension}`
  }

  getPrintPrice(): number {
    const printPrice = this.prices.find((price) => price.type === 'printPrice')
    return printPrice ? printPrice.price : 0
  }

  getDetailUrl(): string {
    const detailUrl = this.urls.find((url) => url.type === 'detail')
    return detailUrl ? detailUrl.url : ''
  }

  getSeriesName(): string {
    return this.series ? this.series.name : 'No series available'
  }
}
