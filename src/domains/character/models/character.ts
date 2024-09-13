import type { ICharacter } from '@/domains/character/interfaces/character'

export class CharacterModel implements ICharacter {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: { path: string; extension: string }
  resourceURI: string
  comics: {
    available: number
    collectionURI: string
    items: { resourceURI: string; name: string }[]
    returned: number
  }
  series: {
    available: number
    collectionURI: string
    items: { resourceURI: string; name: string }[]
    returned: number
  }
  stories: {
    available: number
    collectionURI: string
    items: { resourceURI: string; name: string; type: string }[]
    returned: number
  }
  events: {
    available: number
    collectionURI: string
    items: { resourceURI: string; name: string }[]
    returned: number
  }
  urls: { type: string; url: string }[]

  constructor(data: ICharacter) {
    this.id = data.id
    this.name = data.name
    this.description = data.description || 'No description available'
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
}
