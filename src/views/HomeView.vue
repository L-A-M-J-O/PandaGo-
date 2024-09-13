<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'

// componenst
import CardCatalog from '@/components/common/CardCatalog.vue'

const catalogStore = useCatalogStore()

const loading = computed(() => catalogStore.loading)
const characters = computed(() => catalogStore.characters)
const error = computed(() => catalogStore.error)

onMounted(() => {
  catalogStore.getStoreCharacterCatalog()
})
</script>

<template>
  <div>
    <h1>Marvel Characters</h1>

    <div v-if="loading">Loading characters...</div>

    <div v-if="error">{{ error }}</div>

    <div v-if="!loading && !error">
      <CardCatalog v-for="character in characters" :key="character.id" :character="character" />
    </div>
  </div>
</template>
