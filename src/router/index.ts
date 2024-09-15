import { createRouter, createWebHistory } from 'vue-router'

// view main
import HomeView from '@/views/HomeView.vue'

// view details
import CharacterDetailView from '@/views/character/CharacterDetailView.vue'
import ComicDetailView from '@/views/comic/ComicDetailView.vue'
import SerieDetailView from '@/views/serie/SerieDetailView.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import StoryDetailView from '@/views/story/StoryDetailView.vue'
import CreatorDetailView from '@/views/creator/CreatorDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/character/:id',
      name: 'CharacterDetail',
      component: CharacterDetailView
    },
    {
      path: '/comic/:id',
      name: 'ComicDetail',
      component: ComicDetailView
    },
    {
      path: '/serie/:id',
      name: 'SerieDetail',
      component: SerieDetailView
    },
    {
      path: '/event/:id',
      name: 'EventDetail',
      component: EventDetailView
    },
    {
      path: '/story/:id',
      name: 'StoryDetail',
      component: StoryDetailView
    },
    {
      path: '/creator/:id',
      name: 'CreatorDetail',
      component: CreatorDetailView
    }
  ]
})

export default router
