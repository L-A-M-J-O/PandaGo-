import apiService from '@/api/ApiService'

export default {
  async getCharacterById(id: number) {
    try {
      const response = await apiService.get(`/characters/${id}`)
      console.log(response)
      //   return response.data.data.results[0]
    } catch (error) {
      throw new Error('Error fetching character')
    }
  }
}
