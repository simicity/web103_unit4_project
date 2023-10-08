import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import DrinksAPI from '../services/DrinksAPI'

const ViewDrinks = () => {
    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const data = await DrinksAPI.getAllDrinks()
                setDrinks(data)
            } catch (error) {
                throw error
            }
        }) ()
    }, [])

    return (
        <div>
            {drinks && drinks.length > 0 ? (
                <div>
                    {drinks.map((drink) => (
                        <article key={drink.id}>
                            <h3>{drink.name} {drink.iced ? "❄️" : "🔥"} {` ($${drink.price})`}</h3>
                            <div className='grid'>
                                <p><b>🥛 Milk: </b>{drink.milk}</p>
                                <p><b>🫚 Spice: </b>{drink.spice}</p>
                                <p><b>🍯 Syrup: </b>{drink.syrup}</p>
                            </div>
                            <a href={`/customdrinks/${drink.id}`} role='button'>Details</a>
                        </article>
                    ))}
                </div>
            ) : (
                <p>No drinks yet</p>
            )}
        </div>
    )
}

export default ViewDrinks