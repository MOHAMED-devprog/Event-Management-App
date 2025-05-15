import { useLogin } from "../context/LoginContext";
import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { getAllRegistrations } from "../services/getAllRegistrations";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import {  getEventById } from "../services/getAllEvents";
import { type Event } from "../types/interfaces";
import { useNavigate } from "react-router-dom";
import { useRemovingRegistration } from "../context/RemovingRegistrationContext";
import { deRegisterForEvent } from "../services/eventRegistration";

export default function MyReagistrations(){

    const [data, setData] = useState<string[] | null>(null);
    const [eventsData, setEventsData] = useState<Event[]>([]);
    const [noRegistrations, setNoRegistrations] = useState(false);
    const [isRmovingIds, setIsRemovingIds] = useState<string[]>([]);

    const {login} = useLogin(); 
    const {profile} = useProfile();


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

        if(profile?.id){
            setIsRemovingIds(prev => [...prev, id]);
            await new Promise(res => setTimeout(res, 400));
            await deRegisterForEvent(id, profile.id);

            setTimeout(() => setIsRemovingIds(prev => prev.filter(eventId => eventId !== id)), 700);
            fetchAllRegistrations();
        }
        
        
    }


    useEffect(() => {

        if (profile){
            fetchAllRegistrations();
        }

    },[]);



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
                <NavBar/>
                {!login ? (
                    <div className="home-page">
                        <div className="unavailable-message">
                            <h1>You have to sign in to consult Your events registration</h1>
                            <button onClick={() => navigate('/Connexion')}>Connexion</button>
                        </div>
                    </div>
                    
                ):(
                    <div className="home-page">
                        
                        {!data ? (

                            <div className="loading-wave">
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                                <div className="loading-bar"></div>
                            </div>

                        ): noRegistrations ? (

                            <div className="unavailable-message">
                                <h1>You haven't registred at any Event Yet...</h1>
                                <button onClick={() => navigate('/')}>Register to an Event</button>
                            </div>
                        ):(

                            <div className="events-container">
                                {eventsData.map((event, index) => (
                                    
                                    <EventCard key={index}
                                        img={event.imageUrl}
                                        title={event.title}
                                        description={event.description}
                                        date={event.date.toDate().toLocaleDateString()}
                                        location={event.location}
                                        id={event.id}
                                        participants={event.participantsNumber}
                                        buttonText={"de-registration"}
                                        svgPath="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                        onClick={() => handleRemoving(event.id)}
                                        isRemoving={isRmovingIds.includes(event.id)}
                                    
                                    />
                                ))}
                            </div>

                        )}  
                    </div>
                )}
                
                
                
                
            </>
        )
    
    
}