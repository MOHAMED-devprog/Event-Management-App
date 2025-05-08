

import './styles/App.css'
import NavBar from './components/NavBar';
import './styles/NavBar.css'
import './styles/Connexion.css'
import './styles/EventForm.css'
import Connexion from './pages/Connexion';
import EventForm from './pages/EventForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar/>}/>
        <Route path="/Event-form" element={<EventForm />}/>
        <Route path="/Connexion" element={<Connexion/>}/>
      </Routes>
    </Router> 
  )
}

export default App
