import './styles/App.css'
import './styles/NavBar.css'
import './styles/Connexion.css'
import './styles/EventForm.css'
import Connexion from './pages/Connexion';
import EventForm from './pages/EventForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './pages/EventList';
import { useEffect } from 'react';
import { useProfile } from './context/ProfileContext';
import { useLogin } from './context/LoginContext';
import MyEvents from './pages/MyEvents';
import MyReagistrations from './pages/MyRagistrations';
import EditEvent from './pages/EditEvent';

function App() {

  const {updateName} = useProfile();
  const {switchLogin} = useLogin();

  useEffect(() => {
    
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser){
      updateName(JSON.parse(currentUser));
      switchLogin(true);
    }

  },[]);




  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList/>}/>
        <Route path="/MyEvents" element={<MyEvents/>}/>
        <Route path="/MyRegistrations" element={<MyReagistrations/>}/>
        <Route path="/Event-form" element={<EventForm />}/>
        <Route path="/MyEvents/EditEvent/:eventId" element={<EditEvent />}/>
        <Route path="/Connexion" element={<Connexion/>}/>
      </Routes>
    </Router> 
  )
}

export default App
