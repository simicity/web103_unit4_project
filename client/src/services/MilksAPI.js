import { request } from '../utilities/api'

const milksURL = 'http://localhost:3000/milks'

const getAllMilks = () => request('GET', milksURL)

export default {
  getAllMilks
}