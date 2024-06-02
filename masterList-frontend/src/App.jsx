import { useState } from 'react'
import './App.css'
import { ListPassengers } from './components/ListPassengers'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Passenger } from './components/Passenger'
import { Home } from './components/Home'


function App() {
  return (
    //fragment tag
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path='/' element={<Home />}></Route>

          {/* //http://localhost:3000/passengers */}
          <Route path='/passengers' element={<ListPassengers />} ></Route>

          {/* //http://localhost:3000/add-passenger */}
          <Route path='/add-passenger' element={<Passenger />}></Route>

          {/* //http://localhost:3000/edit-passenger */}
          <Route path='/edit-passenger/:id' element={<Passenger />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
