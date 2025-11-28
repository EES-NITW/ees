import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Events from './Pages/Events'
import Teams from './Pages/Teams'
import Placements from './Pages/Placements'
import Admin from './Pages/Admin'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div> 
      <BrowserRouter>
        <Routes> 
           <Route path="/" element={<Landing/> }/> 
           <Route path="/events" element={<Events/> }/>
            <Route path="/teams" element={<Teams/> }/> 
            <Route path="/placements" element={<Placements/> }/>
            <Route path="/admin" element={<Admin/> }/> 
        </Routes>


      </BrowserRouter>

     </div>
  )
}

export default App
