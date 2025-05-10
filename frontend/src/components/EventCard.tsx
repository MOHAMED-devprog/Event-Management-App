import { registerForEvent } from '../services/eventRegistration'
import '../styles/EventCard.css'
import { useProfile } from '../context/ProfileContext'
import { useNavigate } from 'react-router-dom';

export default function EventCard(props:any){

    const {profile} = useProfile();

    const navigate = useNavigate();

    const handleRegister = async () =>{

        if (profile?.id){
            await registerForEvent(props.id, profile.id);
        }else {
            navigate('/Connexion');
        }
    }

    return (
        
        <div className="event-container">
            <div className="event-card">
                <div className="image-container">
                    <img src={props.img} alt="Event" className="event-image" />
                    <div className="event-badge">Popular</div>
                </div>
                <div className="event-content">
                    <div className="event-meta">
                        <span className="event-date">{props.date}</span>
                        <span className="event-location">{props.location}</span>
                    </div>
                    <h3 className="event-title">{props.title}</h3>
                    <p className="event-description">{props.description}</p>
                    <div className="event-footer">
                        <div className="participants">
                            <svg className="participant-icon" viewBox="0 0 24 24">
                                <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
                            </svg>
                            <span>{props.participants} attending</span>
                        </div>
                        <button className="event-button" onClick={handleRegister}>
                            Register Now
                            <svg className="button-icon" viewBox="0 0 24 24">
                                <path d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}