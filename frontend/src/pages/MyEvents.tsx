import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../services/getAllEvents";
import { type Event } from "../types/interfaces";
import "../styles/EventList.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";


export default function MyEvents() {

    const [data, setData] = useState<Event[] | null | undefined>(null);
    
    const {profile} = useProfile();
    const {login} = useLogin();

    const navigate = useNavigate();


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
    },[])


    return (
        <>
            <NavBar/>
            {!login ? (
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
                                date={event.date !== undefined? event.date.toDate().toLocaleDateString():Date.now()}
                                location={event.location}
                                id={event.id}
                                participants={event.participantsNumber}
                            /> 
                        ))}
                    </div>
                )}  
                </div>
            )}
            
            
            
            
        </>
    )


}