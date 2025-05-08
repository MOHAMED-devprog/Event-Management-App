import NavBar from "../components/NavBar";


export default function EventForm() {

    
    return (
        <>
            <NavBar />
            <div className="event-form-page">
                <div className="event-form">
                    <h2>Create Your Event</h2> 
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                                type="text"
                                placeholder="Title"
                                name="title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                placeholder="Enter some details..."
                                className="description"
                                rows={5}
                                name="description"
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Event date</label>
                            <input 
                                type="date"
                                name="date"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input 
                                type="text"
                                placeholder="Location"
                                name="location"
                                required
                            />
                        </div>
                        
                        <button className="create-button" type="submit">Create</button>
                    </form>
                </div>

            </div>      
        </>

        
    )
}