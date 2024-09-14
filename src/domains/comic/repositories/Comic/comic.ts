import apiService from '@/api/ApiService'

export default {
  async getComicById(id: number) {
    try {
      const response = await apiService.get(`/comic/${id}`)
      console.log(response)
      //   return response.data.data.results[0]
    } catch (error) {
      throw new Error('Error fetching character')
    }
  }
}
