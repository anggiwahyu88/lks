import './assets/css/custom.css'
import './assets/css/bootstrap.css'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Consultation from './components/Consultation'
import Vaccinations from './components/Vaccinations'
import Spot from './components/Spot'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/consultation' element={<Consultation />} />
        <Route path='/vaccination' element={<Vaccinations/>} />
        <Route path='/spot/:id' element={<Spot/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
