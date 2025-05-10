import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getAllEvents } from "../services/getAllEvents";
import { type Event } from "../types/interfaces";
import "../styles/EventList.css"


export default function EventList(){

    const [data, setData] = useState<Event[] | null | undefined>(null);
    

    
    const fetchAllEvents = async() => {
            const docs = await getAllEvents();
            
            if (docs.length === 0)
                setData(undefined);
            else
                setData(docs);
    }

    useEffect(() => {
        fetchAllEvents();
    }, []);

    

    return (
        <>
            <NavBar/>
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
                        <h1 className="unavailable-message">
                            There is no events for the moment, maybe they will be later...
                        </h1>
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
            
            
        </>
    )
}