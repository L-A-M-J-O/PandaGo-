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
  <div>
    <div v-if="characterDetail">
      <!-- Mostrar los detalles del personaje -->
      <h1>{{ characterDetail.name }}</h1>
      <p>{{ characterDetail.description || 'No description available' }}</p>
      <img
        :src="`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`"
        alt="Character Image"
      />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>
