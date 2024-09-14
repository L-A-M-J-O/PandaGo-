import apiService from '@/api/ApiService'

import { CharacterModel } from '@/domains/character/models/character'
import { ComicModel } from '@/domains/comic/models/comic'
import { CreatorModel } from '@/domains/creator/models/creator'
import { EventModel } from '@/domains/event/models/event'
// import { SerieModel } from '@/domains/serie/models/serie'
// import { StoryModel } from '@/domains/story/models/story'

// Function to get filtered catalog data (with filters, no pagination)
export const getFilteredCatalogData = async (filter: string) => {
  const [characters, comics, creators, events] = await Promise.all([
    apiService
      .get(`/characters`, { params: { name: filter } })
      .then((res) => res.data.data.results as CharacterModel[]),
    apiService
      .get(`/comics`, { params: { title: filter } })
      .then((res) => res.data.data.results as ComicModel[]),
    apiService
      .get(`/creators`, { params: { firstName: filter } })
      .then((res) => res.data.data.results as CreatorModel[]),
    apiService
      .get(`/events`, { params: { name: filter } })
      .then((res) => res.data.data.results as EventModel[])
    // apiService
    //   .get(`/series`, { params: { title: filter } })
    //   .then((res) => res.data.data.results as SerieModel[]),
    // apiService
    //   .get(`/stories`, { params: { title: filter } })
    //   .then((res) => res.data.data.results as StoryModel[])
  ])

  return { characters, comics, creators, events }
}
