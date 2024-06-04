import { useState } from 'react'
import './App.css'
import { ListPassengers } from './components/ListPassengers'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BrowserRouter,RouterProvider, Routes, Route, createBrowserRouter } from "react-router-dom"
import { Passenger } from './components/Passenger'
import { Home } from './components/Home'
import { NotFound } from './components/NotFound'


const routes=[
  {
    path:'/',
    element:<Home/>,
  },
  {
    path:'passengers',
    element:<ListPassengers/>,
  },
  {
    path:'add-passenger',
    element:<Passenger/>,
  },
  {
    path:'edit-passenger/:id',
    element:<Passenger/>,
  },
  {
    path:'*',
    element:<NotFound/>,
  }
]

const router= createBrowserRouter(routes);

function App() {
  return (
    <>
    <Header/>
    <RouterProvider router={router}/>
    <Footer/>
    </>
  )
}

export default App
