import apiService from '@/api/ApiService'
import { CreatorModel } from '@/domains/creator/models/creator'

export const getRepositoriesCreators = async (
  limit: number,
  offset: number
): Promise<CreatorModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }

    const response = await apiService.get('/creators', { params })
    return response.data.data.results as CreatorModel[]
  } catch (error) {
    throw new Error('Error fetching creators')
  }
}

export const getRepositoriesCreatorsFilter = async (firstName: string): Promise<CreatorModel[]> => {
  try {
    const params: any = {
      firstName
    }

    const response = await apiService.get('/creators', { params })
    return response.data.data.results as CreatorModel[]
  } catch (error) {
    throw new Error('Error fetching filtered creators')
  }
}
