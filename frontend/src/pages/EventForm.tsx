import { useEffect, useState, type FormEvent } from "react";
import NavBar from "../components/NavBar";
import { createEvent } from "../services/eventCreation";
import { useProfile } from "../context/ProfileContext";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import { useActiveLink } from "../context/ActiveLinkContext";

export default function EventForm() {

    const {profile} = useProfile();
    const {login} = useLogin();
    const {activeLink, updateActiveLink} = useActiveLink();

    const  navigate = useNavigate();

    const participantsNumber :number = 0;

    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");


    const handleFileChange = async () => {
        
        if (image) {
            const Image = new FormData();
            Image.append("image", image);

            const response = await fetch("http://event-management-app-production.up.railway.app/api/upload/images", {

                method: "POST",
                body: Image,

            });

            const data = await response.json();
            return data;
        }
        
    };



    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();
        const imageData = await handleFileChange();
        const imageUrl = imageData.url;
        const imageId = imageData.image_id;

        const creatorId = profile?.id;
        const id :string = creatorId + "_" +imageUrl;

        if (creatorId){
            const date = Timestamp.fromDate(new Date(`${eventDate}T${time}`));
            await createEvent({id, title, description, date, location, imageUrl, imageId, creatorId, participantsNumber});
        }

        navigate('/MyEvents');
        updateActiveLink('/MyEvents');

    } 
    
    useEffect(() => {
        updateActiveLink('/Event-form');
    },[activeLink]);

    return (
        <>
            <NavBar />
            {!login ? (
                <div className="auth-required-container">

                    <div className="auth-required-card">
                        <svg className="auth-icon" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                            <path d="M12 6v8m0 4v0" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <h2 className="auth-title">Sign In Required</h2>
                        <p className="auth-subtitle">You need to be signed in to create new events</p>
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
            ):(    
                <div className="event-form-page">

            
                    <div className="event-form-container">
                        <div className="event-form-card">

                            <div className="form-header">
                                <h2>Create Your Event</h2>
                                <p>Fill in the details below to create a new event</p>
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
                                        onChange={(e) => setEventDate(e.target.value)}
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
                                            required
                                            onChange={(e) => setImage(e.target.files?.[0] || null)}
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

                               

                                <button type="submit" className="submit-button">
                                    Create Event
                                    <svg className="button-icon" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div> 


                </div>)}
        </>

        
    )
}


