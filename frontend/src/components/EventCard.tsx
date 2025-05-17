import {  registerForEvent } from '../services/eventRegistration'
import '../styles/EventCard.css'
import { useProfile } from '../context/ProfileContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLogin } from '../context/LoginContext';



export default function EventCard(props:any){
    
    const [registrationEffect, setRegistrationEffect] = useState(false);

    const {profile} = useProfile();
    const {login} = useLogin();
    
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
                        <span className="event-time">{props.time}</span>
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
                            
                        ): !props.updateAndDelete ? (

                            <button 
                                className="event-button"
                                onClick={
                                    props.buttonText.toLowerCase() === "register now" ? (

                                    login ? () => handleRegister(props.id) : () => navigate('/Connexion')

                                    ):(

                                        props.onRemoveRegistration
             
                                )}>

                                {props.buttonText}
                                    <svg className="button-icon" viewBox="0 0 24 24">
                                        <path d={props.svgPath}/>
                                    </svg>
                            </button>
                            
                        ):(
                            <div className="update-delete-buttons">
                                <button 
                                    className="event-button"
                                    onClick={props.onUpdate}
                                >
                                    {props.buttonModify}
                                        <svg className="button-icon" viewBox="0 0 24 24">
                                            <path d={props.svgPath}/>
                                        </svg>
                                </button>

                                <button 
                                    type="button"
                                    className="delete-button"
                                    onClick={props.onDelete}
                                >
                                    {props.buttonDelete}
                                        <svg className="button-icon" viewBox="0 0 24 24">
                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                        </svg>
                                </button>
                            </div>
                            
                            
                        )}
                        
                    </div>
                </div>
            </div>
        </div>

    )
}