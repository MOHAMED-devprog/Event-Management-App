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





export default function MyEvents() {

    const [data, setData] = useState<Event[] | null | undefined>(null);
    const [isRemovingIds, setIsRemovingIds] = useState<string[]>([]);

    const {profile} = useProfile();
    const {login} = useLogin();

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
                                const imageUrl = new URL(eventDeleted.imageUrl);
                                const pathname = imageUrl.pathname;
                                const imageFileName = pathname.substring(pathname.lastIndexOf('/') + 1);
                
                                await fetch(`http://localhost:3000/api/delete/${imageFileName}`,{
                                    method : "DELETE"
                                });
                                
                                await deleteEvent(eventId);
                                setTimeout(() => setIsRemovingIds(prev => prev.filter(e => e !== eventId)), 700);
                                fetchMyEvents();
                                navigate('/MyEvents');
                
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
            if (docs.length === 0){
                setData(undefined);
            }
            else{
                setData(docs);
            }
        }
        else {
            setData(undefined);
        }
    }

    
    useEffect(() => {
        fetchMyEvents();
    },[]);


    return (
        <>
            <NavBar/>
            {!login? (
                <div className="home-page">
                    <div className="unavailable-message">
                        <h1>You have to sign in to explore the events that tou have created</h1>
                        <button onClick={() => navigate('/Connexion')}>Connexion</button>
                    </div>
                </div>
                
            ):(
                <div className="home-page">
                {!data? (
                    data === null ? (
                        <div className="loading-wave">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    ):(
                        <div className="unavailable-message">
                            <h1>You haven't created any Events Yet...</h1>
                            <button onClick={() => navigate('/Event-form')}>Create an Event</button>
                        </div>
                    )
                    
                ):(
                    <div className="events-container">
                        {data.map((event, index) => (
                            <EventCard key={index}
                                img={event.imageUrl==="" ? null:event.imageUrl}
                                title={event.title}
                                description={event.description}
                                date={event.date.toDate().toISOString().split('T')[0]}
                                time={event.date.toDate().toLocaleTimeString()}
                                location={event.location}
                                id={event.id}
                                participants={event.participantsNumber}
                                isRemoving={isRemovingIds.includes(event.id)}
                                buttonModify={"Modify"}
                                buttonDelete={"Delete"}
                                svgPath="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                updateAndDelete={true}
                                onUpdate={() => handleUpdateEvent(event.id)}
                                onDelete={() => handleDeleteEvent(event.id)}
                            /> 
                        ))}
                    </div>
                )}  
                </div>
            )}
            
            
            
            
        </>
    )


}