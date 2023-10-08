import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import DrinksAPI from '../services/DrinksAPI'
import MilksAPI from '../services/MilksAPI'
import SpicesAPI from '../services/SpicesAPI'
import SyrupsAPI from '../services/SyrupsAPI'

const DrinkDetails = () => {
    const { id } = useParams()
    const [drink, setDrink] = useState({name: '', milk: '', spice: '', syrup: '', iced: false, price: 0})
    const [milkOptions, setMilkOptions] = useState([])
    const [spiceOptions, setSpiceOptions] = useState([])
    const [syrupsOptions, setSyrupsOptions] = useState([])

    const deleteDrink = async (event) => {
        event.preventDefault()
        await DrinksAPI.deleteDrink(id)
        window.location = '/'
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await DrinksAPI.getDrinksById(id)
                setDrink(data)
            } catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const data = await MilksAPI.getAllMilks()
                setMilkOptions(data)
            } catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const data = await SpicesAPI.getAllSpices()
                setSpiceOptions(data)
            } catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const data = await SyrupsAPI.getAllSyrups()
                setSyrupsOptions(data)
            } catch (error) {
                throw error
            }
        }) ()
    }, [])

    return (
        <article>
            <div className='horizontal-float-section'>
                <h3>{drink.name} {drink.iced ? "❄️" : "🔥"}</h3>
                <p>Price: ${drink.price}</p>
            </div>
            
            <div className='horizontal-float-section'>
                <div className='vertical-float-section'>
                    <img src={drink.milk.length > 0 && milkOptions.length > 0 ? milkOptions.filter((milk) => milk.name === drink.milk)[0].image : ""} alt="" className="option-img" />
                    <p className='option-label'>Milk: {drink.milk}</p>
                </div>
                <div className='vertical-float-section'>
                    <img src={drink.spice.length > 0 && spiceOptions.length > 0 ? spiceOptions.filter((spice) => spice.name === drink.spice)[0].image : ""} alt="" className="option-img" />
                    <p className='option-label'>Spice: {drink.spice}</p>
                </div>
                <div className='vertical-float-section'>
                    <img src={drink.syrup.length > 0 && syrupsOptions.length > 0 ? syrupsOptions.filter((syrup) => syrup.name === drink.syrup)[0].image : ""} alt="" className="option-img" />
                    <p className='option-label'>Syrup: {drink.syrup}</p>
                </div>
            </div>

            <a href={`/edit/${id}`} role='button'>Edit</a>
            <a href='#' role='button' onClick={deleteDrink}>Delete</a>
                
        </article>
    )
}

export default DrinkDetails