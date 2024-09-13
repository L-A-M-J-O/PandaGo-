import apiService from '@/api/ApiService'

export default {
  async getCharacters(limit = 20, offset = 0) {
    try {
      const response = await apiService.get('/characters', {
        params: { limit, offset }
      })
      return response.data.data.results
    } catch (error) {
      throw new Error('Error fetching characters')
    }
  }
}
