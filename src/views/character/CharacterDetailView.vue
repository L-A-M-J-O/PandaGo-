<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAdapterCharacterById } from '@/domains/character/adapters/Character/getAdapterCharacter'
import { CharacterModel } from '@/domains/character/models/character'

const route = useRoute()
const characterDetail = ref<CharacterModel>()

onMounted(async () => {
  const id = route.params.id as string
  try {
    characterDetail.value = await getAdapterCharacterById(id)
    console.log(characterDetail.value)
  } catch (error) {
    console.error('Error fetching character details', error)
  }
})
</script>

<template>
  <div v-if="characterDetail" class="bg-white rounded-lg shadow-xl overflow-hidden w-full">
    <div class="relative h-64 sm:h-80">
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-white text-9xl font-bold opacity-20">S</span>
      </div>
      <img
        :src="`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`"
        alt="Character Image"
        class="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div
        class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
      >
        <h1 class="text-4xl font-bold text-white mb-2">{{ characterDetail.name }}</h1>
        <p class="text-xl text-white opacity-80">Clark Kent</p>
      </div>
    </div>
    <div class="p-6 space-y-6">
      <div class="flex flex-wrap gap-4">
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
          >Fuerza sobrehumana</span
        >
        <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold"
          >Vuelo</span
        >
        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold"
          >Visión de rayos X</span
        >
        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold"
          >Invulnerabilidad</span
        >
      </div>
      <p class="text-gray-600 leading-relaxed">
        {{ characterDetail.description || 'No description available' }}
      </p>
      <div class="border-t border-gray-200 pt-6">
        <h2 class="text-2xl font-semibold mb-4">Estadísticas</h2>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">Fuerza</span>
              <span class="text-sm font-medium text-gray-700">100%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-blue-600 h-2.5 rounded-full" style="width: 100%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">Inteligencia</span>
              <span class="text-sm font-medium text-gray-700">80%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-green-600 h-2.5 rounded-full" style="width: 80%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">Velocidad</span>
              <span class="text-sm font-medium text-gray-700">95%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-yellow-600 h-2.5 rounded-full" style="width: 95%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
