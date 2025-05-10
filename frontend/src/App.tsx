import './styles/App.css'

import './styles/NavBar.css'
import './styles/Connexion.css'
import './styles/EventForm.css'
import Connexion from './pages/Connexion';
import EventForm from './pages/EventForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './pages/EventList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList/>}/>
        <Route path="/Event-form" element={<EventForm />}/>
        <Route path="/Connexion" element={<Connexion/>}/>
      </Routes>
    </Router> 
  )
}

export default App
