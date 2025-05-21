import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getAllEvents } from "../services/getAllEvents";
import { type Event } from "../types/interfaces";
import "../styles/EventList.css"
import { getAllRegistrations } from "../services/getAllRegistrations";
import { useProfile } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useActiveLink } from "../context/ActiveLinkContext";




export default function EventList(){

    const [eventData, setEventData] = useState<Event[]>([]);
    const [registrationData, setRegistrationData] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [noEvents, setNoEvents] = useState(false);
    const [eventSearch, setSearchEvent] = useState(""); 

    const {profile} = useProfile();
    const {activeLink, updateActiveLink} = useActiveLink();
    const navigate = useNavigate();


    //recovering Events by the creatorId and the title.
    const fetchAllEvents = async(creatorId:string, title:string) => {
            const docs = await getAllEvents(creatorId, title);
            
            if (docs.length > 0)
            {
                setEventData(docs);
                setNoEvents(false);
            }else{
                setNoEvents(true);
            }
            setLoading(false);
    }


    //recovering the registrations for Events by the current user. 
    const fetchAllRegistrations = async(userId : string) => {
        const docs = await getAllRegistrations(userId);

        if (docs.length > 0)
            setRegistrationData(docs);
        
    }



    useEffect(() => {  
        
        if (eventSearch !== ""){
            fetchAllEvents("", eventSearch);
        }else
            fetchAllEvents("", "");


    }, [eventSearch]);


    useEffect(() => {
        updateActiveLink('/');

        if (profile?.id)
            fetchAllRegistrations(profile.id);
        else 
            setRegistrationData([]);
    },[profile, activeLink]);

    

    return (
        <>
            <NavBar />
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Discover Exciting Events Near You</h1>
                    <p className="page-subtitle">Find and join amazing events in your area</p>
                    
                    <div className="search-container">
                        <svg className="search-icon" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        <input 
                            className="search-input" 
                            type="text" 
                            placeholder="Search events..." 
                            aria-label="Search events"
                            onChange={(e) => setSearchEvent(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <main className="page-content">
                {loading ? (
                <div className="loading-container">
                    <div className="loading-wave">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>
                </div>
                ) : noEvents ? (
                <div className="empty-state">
                    <svg className="empty-icon" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    <h2>No events available at the moment</h2>
                    <p>Check back later or create your own event</p>
                    <button className="primary-button" onClick={() => {navigate('/Event-form'); updateActiveLink('/Event-form');}}>
                        Create Event
                    </button>
                </div>
                ) : (
                <div className="events-grid">
                    {eventData.map((event, index) => {
                    const isRegistred = registrationData.includes(event.id);
                    const isOwner = profile?.id === event.creatorId;

                    return (
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
                            registred={isRegistred}
                            svgPath="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z"
                            buttonText={isRegistred ? "" : "Register Now"}
                            owner={isOwner}
                            />
                    )
                    })}
                </div>
                )}
            </main>
        </>
    )
}

