import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './components/Auth'
import Admin from './components/Admin'
import Users from './components/Users'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='admin' element={<Admin/>}/>
        <Route path='users' element={<Users/>}/>
      </Routes>
    </div>
  )
}

export default App
