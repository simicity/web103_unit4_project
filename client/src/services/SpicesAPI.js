import { request } from '../utilities/api'

const spicesURL = 'http://localhost:3000/spices'

const getAllSpices = () => request('GET', spicesURL)

export default {
  getAllSpices
}