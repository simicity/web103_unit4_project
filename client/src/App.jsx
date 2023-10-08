import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewDrinks from './pages/ViewDrinks'
import EditDrink from './pages/EditDrink'
import CreateDrink from './pages/CreateDrink'
import DrinkDetails from './pages/DrinkDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateDrink title='KOFFEE BUCKET | Customize' />
    },
    {
      path:'/customdrinks',
      element: <ViewDrinks title='KOFFEE BUCKET | Custom Drinks' />
    },
    {
      path: '/customdrinks/:id',
      element: <DrinkDetails title='KOFFEE BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditDrink title='KOFFEE BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App