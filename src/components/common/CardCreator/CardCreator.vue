<script lang="ts" setup>
import type { CreatorModel } from '@/domains/creator/models/creator'
import { useRouter } from 'vue-router'

const props = defineProps<{
  creator: CreatorModel
}>()

const getCreatorImageUrl = (creator: CreatorModel) => {
  return `${creator.thumbnail.path}.${creator.thumbnail.extension}`
}

const router = useRouter()

const goToCreatorDetail = () => {
  router.push(`/creator/${props.creator.id}`)
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-lg p-4 text-center transform transition-all duration-300 hover:scale-105 relative"
    style="height: 300px; overflow: hidden"
  >
    <img
      :src="getCreatorImageUrl(props.creator)"
      :alt="props.creator.fullName"
      class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
    />
    <h3 class="font-bold text-lg">{{ props.creator.fullName }}</h3>
    <div class="text-sm text-gray-600 mt-4">
      <p v-if="props.creator.comics.items.length">
        Known for comics:
        {{
          props.creator.comics.items
            .slice(0, 3)
            .map((item) => item.name)
            .join(', ')
        }}
      </p>
      <p v-if="props.creator.series.items.length">
        Known for series:
        {{
          props.creator.series.items
            .slice(0, 2)
            .map((item) => item.name)
            .join(', ')
        }}
      </p>
    </div>
    <div
      class="absolute bottom-0 left-0 right-0 p-4 mt-auto bg-gradient-to-t from-slate-200 to-transparent"
    >
      <button
        @click="goToCreatorDetail"
        class="bg-green-700 hover:bg-[#046C4E] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-300"
      >
        View more
      </button>
    </div>
  </div>
</template>
