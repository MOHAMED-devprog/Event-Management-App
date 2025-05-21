import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import { getAllEvents, getEventById } from "../services/getAllEvents";
import { type Event } from "../types/interfaces";
import "../styles/EventList.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import { deleteEvent } from "../services/eventCreation";
import '../styles/MyEvents.css'
import Swal from 'sweetalert2'
import { useActiveLink } from "../context/ActiveLinkContext";
import Footer from "../components/Footer";





export default function MyEvents() {

    const [data, setData] = useState<Event[] | null>(null);
    const [isRemovingIds, setIsRemovingIds] = useState<string[]>([]);

    const {profile} = useProfile();
    const {login} = useLogin();
    const {activeLink, updateActiveLink} = useActiveLink();

    const navigate = useNavigate();


    const handleUpdateEvent = (eventId : string) => {
        navigate(`/MyEvents/EditEvent/${eventId}`);
    }


    const handleDeleteEvent = async  (eventId : string) => {  

             Swal.fire({
                title: 'Are you sure?',
                text: "This action can't be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#3b82f6',
                confirmButtonText: 'Delete'

                }).then(async (result) => {

                    if (result.isConfirmed) {
                        
                        const eventDeleted = await getEventById(eventId);
                        if (eventDeleted) {
                            
                            try {
                                setIsRemovingIds(prev => [...prev, eventId]);
                                
                                const imageFileName = eventDeleted.imageId;
                
                                await fetch("https://event-management-app-production.up.railway.app/api/delete",{
                                    method : "DELETE",

                                    headers : {
                                        "Content-Type" : "application/json"
                                    },

                                    body : JSON.stringify({
                                        public_id : imageFileName,
                                    }),
                                });
                                
                                await deleteEvent(eventId);
                                setTimeout(() => setIsRemovingIds(prev => prev.filter(e => e !== eventId)), 700);
                                fetchMyEvents();
                                navigate('/MyEvents');
                                updateActiveLink('/MyEvents');
                
                            }catch(err){
                                console.log('error deleting image : ' + err);
                            }
                
                        }
                    }
            });         
        }

    const fetchMyEvents = async() => {

        if (profile){
            const docs = await getAllEvents(profile.id);
            setData(docs);
        }
        else {
            setData(null);
        }
    }

    
    useEffect(() => {
        updateActiveLink('/MyEvents');
        fetchMyEvents();
    },[login, activeLink]);


    return (
        <>
            <NavBar />
            {!login ? (
                <div className="auth-required-container">
                    <div className="auth-prompt">
                        <svg className="auth-icon" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        <h1 className="auth-title">Sign In to Manage Your Events</h1>
                        <p className="auth-subtitle">Access your created events by logging into your account</p>
                        <button className="auth-button" onClick={() => navigate('/Connexion')}>
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
                        <h1 className="management-title">Your Events</h1>
                        <p className="management-subtitle">View, update, or delete your created events</p>
                    </header>

                <div className="content-area">
                    {!data ? (
                    
                        <div className="loading-state">
                            <div className="loading-wave">
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                            </div>
                            <p>Loading your events...</p>
                        </div>
                    ) : data.length === 0 ?(
                        <div className="empty-state">
                            <svg className="empty-icon" viewBox="0 0 24 24">
                                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
                            </svg>
                            <h2>No Events Created Yet</h2>
                            <p>Get started by creating your first event</p>
                            <button className="create-button" onClick={() => {navigate('/Event-form'); updateActiveLink('/Event-form')}}>
                                Create Event
                                <svg className="button-icon" viewBox="0 0 24 24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                </svg>
                            </button>
                        </div>

                    ) : (
                    <div className="events-grid">
                        {data.map((event, index) => (
                        <EventCard
                            key={index}
                            img={event.imageUrl || null}
                            title={event.title}
                            description={event.description}
                            date={event.date.toDate().toISOString().split('T')[0]}
                            time={event.date.toDate().toLocaleTimeString()}
                            location={event.location}
                            id={event.id}
                            participants={event.participantsNumber}
                            isRemoving={isRemovingIds.includes(event.id)}
                            buttonModify="Edit"
                            buttonDelete="Delete"
                            svgPath="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            updateAndDelete={true}
                            onUpdate={() => handleUpdateEvent(event.id)}
                            onDelete={() => handleDeleteEvent(event.id)}
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