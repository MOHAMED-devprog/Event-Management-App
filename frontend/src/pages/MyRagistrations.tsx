import { useLogin } from "../context/LoginContext";
import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { getAllRegistrations } from "../services/getAllRegistrations";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import {  getEventById } from "../services/getAllEvents";
import { type Event } from "../types/interfaces";
import { useNavigate } from "react-router-dom";
import { deRegisterForEvent } from "../services/eventRegistration";
import  Swal  from "sweetalert2";
import '../styles/MyRegistrations.css'
import { useActiveLink } from "../context/ActiveLinkContext";
import Footer from "../components/Footer";

export default function MyReagistrations(){

    const [data, setData] = useState<string[] | null>(null);
    const [eventsData, setEventsData] = useState<Event[]>([]);
    const [noRegistrations, setNoRegistrations] = useState(false);
    const [isRmovingIds, setIsRemovingIds] = useState<string[]>([]);

    const {login} = useLogin(); 
    const {profile} = useProfile();
    const {activeLink, updateActiveLink} = useActiveLink();

    const navigate = useNavigate();


    const fetchAllRegistrations = async () => {

        if (profile?.id){
            const docs = await getAllRegistrations(profile.id);

            if (docs.length > 0)
                setData(docs);
            else
                setData([]);
            
        }

    }

    const fetchEventsByRegistrations = async () => {
        
        if (data){
            const eventPromises = data.map(id => getEventById(id));
            const resolvedPromises = await Promise.all(eventPromises); 
            const validEvents = resolvedPromises.filter(e => e !== null) as Event[];

            if (validEvents.length > 0)
                setEventsData(validEvents);
        }

              
        
    }


    const handleRemoving = async (id : string) => {

        Swal.fire({
            title : "Are You Sure !",
            text : "You want to cancel your registration from this event ?",
            showCancelButton : true,
            cancelButtonColor : "#3b82f6",
            confirmButtonColor : "#b93a3a",
            icon : "question",
            confirmButtonText : "Yes"

        }).then(async res => {

            if (res.isConfirmed){

                if(profile?.id){
                    setIsRemovingIds(prev => [...prev, id]);
                    await new Promise(res => setTimeout(res, 400));
                    await deRegisterForEvent(id, profile.id);

                    setTimeout(() => setIsRemovingIds(prev => prev.filter(eventId => eventId !== id)), 700);
                    fetchAllRegistrations();
                }
            }
        });
        
    }


    useEffect(() => {
        updateActiveLink('/MyRegistrations');

        if (profile){
            fetchAllRegistrations();
        }

    },[login, activeLink]);



    useEffect(() => {

        if(data && data.length > 0){
            fetchEventsByRegistrations();
            setNoRegistrations(false);
        }
        else {
            setNoRegistrations(true);
        }


    },[data]);

    return (

            <>
                <NavBar />
                {!login ? (
                    <div className="auth-required-container">
                        <div className="auth-message-card">
                            <svg className="auth-icon" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                            <h1 className="auth-title">Sign in to view your event registrations</h1>
                            <p className="auth-subtitle">Access your event dashboard by logging in</p>
                            <button 
                                className="auth-button"
                                onClick={() => navigate('/Connexion')}
                            >
                                Sign In
                                <svg className="button-icon" viewBox="0 0 24 24">
                                    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="events-management-container">
                        <header className="management-header">
                            <h1 className="management-title">Your Events Registrations</h1>
                            <p className="management-subtitle">
                                Welcome to your event dashboard! Here, you can view all the events you've registered for.
                            </p>
                        </header>

                        <div className="dashboard-container">
                            
                        {!data ? (
                            <div className="loading-container">
                                <div className="loading-wave">
                                    <div className="loading-bar"></div>
                                    <div className="loading-bar"></div>
                                    <div className="loading-bar"></div>
                                    <div className="loading-bar"></div>
                                </div>
                                <p className="loading-text">Loading your events...</p>
                            </div>
                        ) : noRegistrations ? (
                            <div className="empty-state-my-registrations">
                                <div className="empty-state-container">
                                    <svg className="empty-icon" viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/>
                                    </svg>
                                    <h1 className="empty-title">No Event Registrations Yet</h1>
                                    <p className="empty-subtitle">Get started by registering for an upcoming event</p>
                                    <button 
                                        className="primary-button"
                                        onClick={() => {navigate('/'); updateActiveLink('/');}}
                                    >
                                        Browse Events
                                        <svg className="button-icon" viewBox="0 0 24 24">
                                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="events-grid">
                                {eventsData.map((event, index) => (
                                    <EventCard 
                                        key={index}
                                        img={event.imageUrl}
                                        title={event.title}
                                        description={event.description}
                                        date={event.date.toDate().toISOString().split('T')[0]}
                                        time={event.date.toDate().toLocaleTimeString()}
                                        location={event.location}
                                        id={event.id}
                                        participants={event.participantsNumber}
                                        buttonText="Cancel Registration"
                                        svgPath="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                        onRemoveRegistration={() => handleRemoving(event.id)}
                                        isRemoving={isRmovingIds.includes(event.id)}
                                    />
                                ))}
                            </div>
                        )}
                        </div>
                    </div>
                )}
                <Footer/>
            </>
            
        )
    
    
}