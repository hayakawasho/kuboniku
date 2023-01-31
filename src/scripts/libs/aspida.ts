import aspida from '@aspida/fetch'
import api from '../../api/$api'
import { WP_API_BASE } from '../const'

const fetchConfig = {
  baseURL: WP_API_BASE,
  throwHttpErrors: true,
}

export const apiClient = api(aspida(fetch, fetchConfig))
