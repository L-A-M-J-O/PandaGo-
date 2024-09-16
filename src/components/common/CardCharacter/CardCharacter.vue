<script lang="ts" setup>
import type { CharacterModel } from '@/domains/character/models/character'

const props = defineProps<{
  character: CharacterModel
}>()

const getCharacterImageUrl = (character: CharacterModel) => {
  return `${character.thumbnail.path}.${character.thumbnail.extension}`
}

const getInitial = (name: string) => {
  return name.charAt(0)
}
</script>

<template>
  <div
    class="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
  >
    <RouterLink
      :to="{ name: 'CharacterDetail', params: { id: props.character.id } }"
      class="block h-full w-full"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 transition-all duration-500 group-hover:scale-110"
        :style="{
          backgroundImage: `url(${getCharacterImageUrl(props.character)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
      ></div>
      <div class="relative p-6 h-64 flex flex-col justify-end">
        <div
          class="absolute top-4 right-4 w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-4xl font-bold text-white transition-all duration-500 group-hover:scale-0"
        >
          {{ getInitial(props.character.name) }}
        </div>
        <h2
          class="text-2xl font-bold text-white mb-1 transform translate-y-8 transition-all duration-300 group-hover:translate-y-0"
        >
          {{ props.character.name }}
        </h2>
        <p class="text-sm text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          {{ props.character.description || 'No description available' }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.group:hover .bg-gradient-to-t {
  opacity: 1;
}

.block {
  display: block;
  text-decoration: none;
  color: inherit;
}

.relative {
  overflow: hidden;
}

h2,
p {
  margin: 0;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
