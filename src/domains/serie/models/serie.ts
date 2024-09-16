import type {
  ISeries,
  SeriesUrl,
  SeriesThumbnail,
  SeriesCreators,
  SeriesCharacter,
  SeriesStories,
  SeriesComics,
  SeriesEvents
} from '@/domains/serie/interfaces/serie'

export class SerieModel implements ISeries {
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

  constructor(data: ISeries) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.resourceURI = data.resourceURI
    this.urls = data.urls
    this.startYear = data.startYear
    this.endYear = data.endYear
    this.rating = data.rating
    this.type = data.type
    this.modified = data.modified
    this.thumbnail = data.thumbnail
    this.creators = data.creators
    this.characters = data.characters
    this.stories = data.stories
    this.comics = data.comics
    this.events = data.events
    this.next = data.next
    this.previous = data.previous
  }

  // Método para obtener la URL completa de la miniatura
  getThumbnailUrl(): string {
    return `${this.thumbnail.path}.${this.thumbnail.extension}`
  }

  // Método para obtener la URL de detalle de la serie
  getDetailUrl(): string {
    const detailUrl = this.urls.find((url) => url.type === 'detail')
    return detailUrl ? detailUrl.url : ''
  }

  // Método para obtener la lista de creadores de la serie
  getCreatorsList(): string[] {
    return this.creators.items.map((creator) => `${creator.name} (${creator.role})`)
  }

  // Método para obtener la lista de historias de la serie
  getStoriesList(): string[] {
    return this.stories.items.map((story) => story.name)
  }

  // Método para obtener la lista de cómics de la serie
  getComicsList(): string[] {
    return this.comics.items.map((comic) => comic.name)
  }
}
