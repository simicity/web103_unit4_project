import { request } from '../utilities/api'

const syrupsURL = 'http://localhost:3000/syrups'

const getAllSyrups = () => request('GET', syrupsURL)

export default {
  getAllSyrups
}