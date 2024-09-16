import type {
  IStory,
  StorySeries,
  StoryComic,
  StoryCreators,
  StoryCharacters,
  StoryEvents,
  OriginalIssue
} from '@/domains/story/interfaces/story'

export class StoryModel implements IStory {
  id: number
  title: string
  description: string
  resourceURI: string
  type: string
  modified: string
  thumbnail: null
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

  constructor(data: IStory) {
    this.id = data.id
    this.title = data.title
    this.description = data.description || 'No description available'
    this.resourceURI = data.resourceURI
    this.type = data.type
    this.modified = data.modified
    this.thumbnail = data.thumbnail
    this.creators = data.creators
    this.characters = data.characters
    this.series = data.series
    this.comics = data.comics
    this.events = data.events
    this.originalIssue = data.originalIssue
  }

  // Método para obtener la lista de series de la historia
  getSeriesList(): string[] {
    return this.series.items.map((series: StorySeries) => series.name)
  }

  // Método para obtener la lista de cómics relacionados con la historia
  getComicsList(): string[] {
    return this.comics.items.map((comic: StoryComic) => comic.name)
  }

  // Método para obtener el nombre del original issue
  getOriginalIssueName(): string {
    return this.originalIssue.name
  }
}
