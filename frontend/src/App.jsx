import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './Body'
import Navbar from './Navbar' 
import Login from './Login'
import Profile from './Profile'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>

    
     
    </>
  )
}

export default App
