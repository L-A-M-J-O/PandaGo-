<script lang="ts" setup>
import type { EventModel } from '@/domains/event/models/event'

const props = defineProps<{
  event: EventModel
  viewMode: string
}>()

const getEventImageUrl = (event: EventModel) => {
  return `${event.thumbnail.path}.${event.thumbnail.extension}`
}
</script>

<template>
  <RouterLink
    :to="{ name: 'EventDetail', params: { id: props.event.id } }"
    :class="{
      'bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 flex flex-wrap items-center':
        props.viewMode === 'grid',
      'bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 flex flex-row items-center':
        props.viewMode === 'normal'
    }"
  >
    <div class="h-32 w-32 rounded-full overflow-hidden mx-4 border-4 border-gray-200">
      <img
        :src="getEventImageUrl(props.event)"
        :alt="props.event.title"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="flex flex-col justify-center">
      <h3 class="font-bold text-xl mb-2 text-gray-800">{{ props.event.title }}</h3>
      <p class="text-gray-600 text-sm line-clamp-3">
        {{ props.event.description || 'No description available' }}
      </p>
      <div class="text-sm text-gray-500 mt-2">
        <p>Start: {{ props.event.start || 'N/A' }}</p>
        <p>End: {{ props.event.end || 'N/A' }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
