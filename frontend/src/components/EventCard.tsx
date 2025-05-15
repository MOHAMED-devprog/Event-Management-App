import {  registerForEvent } from '../services/eventRegistration'
import '../styles/EventCard.css'
import { useProfile } from '../context/ProfileContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



export default function EventCard(props:any){
    
    const [registrationEffect, setRegistrationEffect] = useState(false);

    const {profile} = useProfile();

    
    const navigate = useNavigate();


    const handleRegister = async (id:string) => {
        
        if(profile?.id){
            await registerForEvent(id, profile.id);
            setRegistrationEffect(true);
        }
        
    }


    useEffect(() => {
        
        if (profile){
            if (props.registred){
                setRegistrationEffect(true);
            }else 
                setRegistrationEffect(false);
        }
    },[profile]);


    return (
        
        <div className={`event-container ${props.isRemoving ? "removing" : ""}`}>
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
                        {props.owner ? (

                            <button className="event-button-owner" onClick={() => navigate('/MyEvents')}>
                                Modify
                            </button>
                        
                        ): props.registred || registrationEffect? (

                            <div className="success-checkmark">
                                <div className="check-icon">
                                    <span className="icon-line line-tip"></span>
                                    <span className="icon-line line-long"></span>
                                    <div className="icon-circle"></div>
                                    <div className="icon-fix"></div>
                                </div>
                                <span>Registred</span>
                            </div>
                            
                        ):(

                            <button 
                                className="event-button"
                                onClick={props.buttonText.toLowerCase() === "register now" ? (

                                    () => handleRegister(props.id) 

                                    ) : props.buttonText.toLowerCase() === "de-registration" ? (

                                        props.onClick

                                    ):(

                                        props.onUpdateOrDelete
                                        
                                )}>

                                {props.buttonText}
                                    <svg className="button-icon" viewBox="0 0 24 24">
                                        <path d={props.svgPath}/>
                                    </svg>
                            </button>
                            
                        )}
                        
                    </div>
                </div>
            </div>
        </div>

    )
}