import { useEffect, useState, type FormEvent } from "react";
import NavBar from "../components/NavBar";
import { updateEvent } from "../services/eventCreation";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../services/getAllEvents";
import { type Event } from "../types/interfaces";
import { Timestamp } from "firebase/firestore";

export default function EventForm() {


    const {eventId} = useParams<{eventId : string}>();
    const [data, setData] = useState<Event | null>(null);

    const  navigate = useNavigate();


    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");


    const handleFileChange = async () => {
        
        if (image) {
            const Image = new FormData();
            Image.append("image", image);

            const response = await fetch("http://localhost:3000/api/upload/images", {

                method: "POST",
                body: Image,

            });

            const data = await response.json();
            return data.url;
        }
        
    };



    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();
        let imageUrl = data?.imageUrl;

        if (data && image) {
            imageUrl = await handleFileChange();
            const prevImageUrl = new URL(data.imageUrl);
            const imageFileName = prevImageUrl.pathname.split('/').pop();
            
            await fetch(`http://localhost:3000/api/delete/${imageFileName}`,{
                method: "DELETE"
            });
        }

        
        if (eventId){
            const dateAndTime = Timestamp.fromDate(new Date(`${date}T${time}:00`));
            await updateEvent({title, description, dateAndTime, location, imageUrl}, eventId);

            navigate('/MyEvents');
        }
    }


    const fetchEventById = async () => {

        if (eventId) {
            const docs = await getEventById(eventId);
            if(docs) {
                setData(docs);   

                setTitle(docs.title);
                setDescription(docs.description);
                setDate(docs.date.toDate().toISOString().split('T')[0]);
                setTime(docs.date.toDate().toTimeString().split(":").slice(0,2).join(":"));
                setLocation(docs.location);
            }
        }
        
    }

    useEffect(() => {
        fetchEventById();
    },[])
    
    return (
        <>
            <NavBar />   
                <div className="event-form-page">

                    {data == null ? (

                        <div className="loading-wave">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>

                    ):(
                        
                    
                        <div className="event-form-container">
                            <div className="event-form-card">

                                <div className="form-header">
                                    <h2>Update Your Event</h2>
                                    <p>Fill and Modify the details below</p>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="event-form">
                                    <div className="form-group">
                                        <label htmlFor="title">Event Title</label>
                                        <div className="input-container">
                                            <input
                                                type="text"
                                                id="title"
                                                placeholder="title"
                                                required
                                                onChange={(e) => setTitle(e.target.value)}
                                                value={title}
                                            />
                                            <svg className="input-icon" viewBox="0 0 24 24">
                                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description">Event Description</label>
                                        <div className="textarea-container">
                                            <textarea
                                                id="description"
                                                placeholder="Describe your event in detail..."
                                                rows={5}
                                                required
                                                onChange={(e) => setDescription(e.target.value)}
                                                value={description}
                                            ></textarea>
                                            <svg className="textarea-icon" viewBox="0 0 24 24">
                                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    
                                    <div className="form-group">
                                        <label htmlFor="date">Event Date</label>
                                        <div className="input-container">
                                            <input
                                            type="date"
                                            id="date"
                                            required
                                            onChange={(e) => setDate(e.target.value)}
                                            value={date} 
                                            />
                                            <svg className="input-icon" viewBox="0 0 24 24">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="date">Event Time</label>
                                        <div className="input-container">
                                            <input
                                            type="time"
                                            id="time"
                                            required
                                            onChange={(e) => setTime(e.target.value)}
                                            value={time}
                                            />
                                            <svg className="input-icon" viewBox="0 0 24 24">
                                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="location">Location</label>
                                        <div className="input-container">
                                            <input
                                            type="text"
                                            id="location"
                                            placeholder="Address..."
                                            required
                                            onChange={(e) => setLocation(e.target.value)}
                                            value={location}
                                            />
                                            <svg className="input-icon" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                            </svg>
                                        </div>
                                    </div>
                            

                                    <div className="form-group">
                                        <label htmlFor="event_image">Event Image</label>
                                        <div className="file-upload-container">
                                            <input
                                                type="file"
                                                id="event_image"
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files?.[0] || image)}
                                            />
                                            <label htmlFor="event_image" className="file-upload-label">
                                                <svg className="upload-icon" viewBox="0 0 24 24">
                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                                </svg>
                                                <span>Choose an image</span>
                                                <span className="file-name">{image ? image.name : "No file selected"}</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="image-container-form">
                                        <img 
                                            src={data.imageUrl}
                                            width={600} 
                                            height={400} 
                                            style={{objectFit : "cover", borderRadius:"20px"}}/>
                                    </div>

                                    <div className="update-cancel-buttons">
                                        <button type="submit" className="update-button">
                                            Update
                                            <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">  
                                                <path d="M17.65 6.35A8 8 0 1 0 19.78 13h-2.09a6 6 0 1 1-1.41-6.36L14 11h7V4l-3.35 2.35z" fill="currentColor"/>
                                            </svg>
                                        </button>
                                        <button className="cancel-button" onClick={() => navigate('/MyEvents')}>
                                            Cancel
                                            <svg className="cancel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M5 5l14 14M5 19L19 5" strokeWidth="1" strokeLinecap="square"/>
                                            </svg>
                                        </button>      
                                    </div>

                                </form>
                            </div>
                        </div>

                    )}
                </div>
        </>

        
    )
}