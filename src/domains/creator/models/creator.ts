import type {
  ICreator,
  CreatorThumbnail,
  CreatorUrl,
  CreatorComics,
  CreatorSeriesCollection,
  CreatorStories,
  CreatorEvents
} from '@/domains/creator/interfaces/creator'

export class CreatorModel implements ICreator {
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

  constructor(data: ICreator) {
    this.id = data.id
    this.firstName = data.firstName
    this.middleName = data.middleName
    this.lastName = data.lastName
    this.suffix = data.suffix
    this.fullName = data.fullName
    this.modified = data.modified
    this.thumbnail = data.thumbnail
    this.resourceURI = data.resourceURI
    this.comics = data.comics
    this.series = data.series
    this.stories = data.stories
    this.events = data.events
    this.urls = data.urls
  }

  getThumbnailUrl(): string {
    return `${this.thumbnail.path}.${this.thumbnail.extension}`
  }

  getDetailUrl(): string {
    const detailUrl = this.urls.find((url) => url.type === 'detail')
    return detailUrl ? detailUrl.url : ''
  }
}
