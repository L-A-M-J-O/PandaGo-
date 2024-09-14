import apiService from '@/api/ApiService'
import { CreatorModel } from '@/domains/creator/models/creator'

export const getRepositoriesCreators = async (
  limit: number,
  offset: number,
  firstName?: string,
  middleName?: string,
  lastName?: string
): Promise<CreatorModel[]> => {
  try {
    const params: any = {
      limit,
      offset
    }

    if (firstName) {
      params.firstName = firstName
    }
    if (middleName) {
      params.middleName = middleName
    }
    if (lastName) {
      params.lastName = lastName
    }

    const response = await apiService.get('/creators', { params })
    return response.data.data.results as CreatorModel[]
  } catch (error) {
    throw new Error('Error fetching creators')
  }
}
