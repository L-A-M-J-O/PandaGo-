import type {
  IEvent,
  EventUrl,
  EventThumbnail,
  EventCreators,
  EventCharacters,
  EventStories,
  EventCreator,
  EventCharacter
} from '@/domains/event/interfaces/event'

export class EventModel implements IEvent {
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

  constructor(data: IEvent) {
    this.id = data.id
    this.title = data.title
    this.description = data.description || 'No description available'
    this.resourceURI = data.resourceURI
    this.urls = data.urls
    this.modified = data.modified
    this.start = data.start
    this.end = data.end
    this.thumbnail = data.thumbnail
    this.creators = data.creators
    this.characters = data.characters
    this.stories = data.stories
  }

  // Método para obtener la URL completa de la miniatura
  getThumbnailUrl(): string {
    return `${this.thumbnail.path}.${this.thumbnail.extension}`
  }

  // Método para obtener la URL de detalle del evento
  getDetailUrl(): string {
    const detailUrl = this.urls.find((url) => url.type === 'detail')
    return detailUrl ? detailUrl.url : ''
  }

  // Método para obtener la lista de creadores del evento
  getCreatorsList(): string[] {
    return this.creators.items.map((creator: EventCreator) => `${creator.name} (${creator.role})`)
  }

  // Método para obtener la lista de personajes involucrados en el evento
  getCharactersList(): string[] {
    return this.characters.items.map((character: EventCharacter) => character.name)
  }
}
