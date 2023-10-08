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
                            <h3>{drink.name}</h3>
                            <p>{drink.milk}</p>
                            <p>{drink.spice}</p>
                            <p>{drink.syrup}</p>
                            <p>{drink.iced}</p>
                            <p>{drink.price}</p>
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