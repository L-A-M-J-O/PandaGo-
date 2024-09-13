import localforage from 'localforage'

localforage.config({
  name: 'MarvelAppCache',
  storeName: 'apiCache'
})

// Función para obtener datos del caché
export const getCacheData = async (key: string) => {
  try {
    const data = await localforage.getItem(key)
    return data
  } catch (error) {
    console.error('Error getting cache data', error)
    return null
  }
}

// Función para guardar datos en el caché
export const setCacheData = async (key: string, data: any) => {
  try {
    await localforage.setItem(key, data)
  } catch (error) {
    console.error('Error setting cache data', error)
  }
}

// Función para limpiar el caché (si es necesario)
export const clearCache = async () => {
  try {
    await localforage.clear()
  } catch (error) {
    console.error('Error clearing cache', error)
  }
}
