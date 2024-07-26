import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import CountryDetails from './pages/CountryDetails'

function App() {

  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      {/* <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path=':country' element={<CountryDetails />} />
        </Route>
      </Routes> */}
    </AnimatePresence>
  )
}

export default App
