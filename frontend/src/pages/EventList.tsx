import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { getAllEvents } from "../services/getAllEvents";
import { type Event } from "../types/interfaces";
import "../styles/EventList.css"
import { useSearchEvent } from "../context/SearchEventContext";
import { getAllRegistrations } from "../services/getAllRegistrations";
import { useProfile } from "../context/ProfileContext";





export default function EventList(){

    const [eventData, setEventData] = useState<Event[]>([]);
    const [registrationData, setRegistrationData] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [noEvents, setNoEvents] = useState(false);

    const {eventSearch} = useSearchEvent(); 
    const {profile} = useProfile();



    //recovering Events by the creatorId and the title.
    const fetchAllEvents = async(creatorId:string, title:string) => {
            const docs = await getAllEvents(creatorId, title);
            
            if (docs.length > 0)
            {
                console.log(docs);
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
        if (profile?.id)
            fetchAllRegistrations(profile.id);
        else 
            setRegistrationData([]);
    },[profile]);

    

    return (
        <>
            <NavBar/>
            <div className="home-page">
                
                    {loading ? (
                        <div className="loading-wave">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    ): noEvents ? (

                        <h1 className="unavailable-message">
                            There is no events for the moment, maybe they will be later...
                        </h1>

                    ):(

                        <div className="events-container">
                            {eventData.map((event, index) => {
                                const isRegistred = registrationData.includes(event.id);
                                const isOwner = profile === null ? null: profile.id === event.creatorId;

                                return (
                                <EventCard key={index}
                                    img={event.imageUrl==="" ? null:event.imageUrl}
                                    title={event.title}
                                    description={event.description}
                                    date={event.date.toDate().toISOString().split('T')[0]}
                                    location={event.location}
                                    id={event.id}
                                    participants={event.participantsNumber}
                                    registred={isRegistred}
                                    svgPath="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z"
                                    buttonText={isRegistred ? "" : "Register now" }
                                    owner={isOwner}
                                /> )
                            })}
                        </div>
                    )} 
            </div>
            
            
        </>
    )
}

