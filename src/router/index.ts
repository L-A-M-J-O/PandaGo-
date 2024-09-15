import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CharacterDetailView from '@/views/character/CharacterDetailView.vue'

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
    }
  ]
})

export default router
