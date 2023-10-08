import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import DrinksAPI from '../services/DrinksAPI'
import MilksAPI from '../services/MilksAPI'
import SpicesAPI from '../services/SpicesAPI'
import SyrupsAPI from '../services/SyrupsAPI'

const CreateDrink = () => {
    const [drink, setDrink] = useState({name: '', milk: '', spice: '', syrup: '', iced: false, price: 0})
    const [milkOptions, setMilkOptions] = useState([])
    const [spiceOptions, setSpiceOptions] = useState([])
    const [syrupsOptions, setSyrupsOptions] = useState([])

    const calculatePrice = (drink) => {
        let price = 4
        if (drink.milk) {
            price += milkOptions.filter((milk) => milk.name === drink.milk)[0].price
        }
        if (drink.spice) {
            price += spiceOptions.filter((spice) => spice.name === drink.spice)[0].price
        }
        if (drink.syrup) {
            price += syrupsOptions.filter((syrup) => syrup.name === drink.syrup)[0].price
        }
        return price
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target
        const newDrink = {...drink}
        if(name == 'iced') newDrink['iced'] = !newDrink['iced']
        else newDrink[name] = value
        setDrink({
            ...newDrink,
            price: calculatePrice(newDrink)
        })
    }

    const createDrink = async (event) => {
        event.preventDefault()
        await DrinksAPI.createDrink(drink)
        window.location = '/'
    }

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
            
            <div>
                <details open>
                    <summary>Milk</summary>
                    {milkOptions && milkOptions.map.length > 0 && (
                        <div className='grid'>
                            {milkOptions.map((milk) => (
                                <div key={milk.name} className='vertical-float-section'>
                                    <img src={milk.image} alt="" className="option-img" />
                                    <label className='option-label'>{milk.name}</label>
                                    <input type='radio' name='milk' value={milk.name} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                    )}
                </details>

                <details>
                    <summary>Spice</summary>
                    {spiceOptions && spiceOptions.map.length > 0 && (
                        <div className='grid'>
                            {spiceOptions.map((spice) => (
                                <div key={spice.name} className='vertical-float-section'>
                                    <img src={spice.image} alt="" className="option-img" />
                                    <label className='option-label'>{spice.name}</label>
                                    <input type='radio' name='spice' value={spice.name} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                    )}
                </details>

                <details>
                    <summary>Syrup</summary>
                    {syrupsOptions && syrupsOptions.map.length > 0 && (
                        <div className='grid'>
                            {syrupsOptions.map((syrup) => (
                                <div key={syrup.name} className='vertical-float-section'>
                                    <img src={syrup.image} alt="" className="option-img" />
                                    <label className='option-label'>{syrup.name}</label>
                                    <input type='radio' name='syrup' value={syrup.name} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                    )}
                </details>
            </div>

            <div>
                <label htmlFor="iced">
                    <input type="checkbox" name="iced" role="switch" onChange={handleChange} />
                    {drink.iced ? 'Iced' : 'Hot'}
                </label>
                
                <div className='horizontal-float-section'>
                    <p>Price: ${drink.price}</p>
                    <div className='horizontal-float-section'>
                        <label htmlFor="name">
                            <input type="text" name="name" placeholder='Name your drink' onChange={handleChange} />
                        </label>
                        <button onClick={createDrink}>Order</button>
                    </div>
                </div>
            </div>

        </article>
    )
}

export default CreateDrink