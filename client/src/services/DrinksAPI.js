import { request } from '../utilities/api'

const drinksURL = 'http://localhost:3000/drinks'

const getAllDrinks = () => request('GET', drinksURL)
const getDrinksById = (id) => request('GET', `${drinksURL}/${id}`)
const createDrink = (drink) => request('POST', drinksURL, drink)
const updateDrink = (id, drink) => request('PATCH', `${drinksURL}/${id}`, drink)
const deleteDrink = (id) => request('DELETE', `${drinksURL}/${id}`)

export default {
    getAllDrinks,
    getDrinksById,
    createDrink,
    updateDrink,
    deleteDrink
}