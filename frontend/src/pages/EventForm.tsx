import NavBar from "../components/NavBar";

export default function EventForm() {

    
    return (
        <>
            <NavBar />
            <div className="event-form">

            <form>
                <label>Title</label>
                <input 
                    type ="text"
                    placeholder="Title"
                    name="title"
                    required
                />
                <label>Description</label>
                <input 
                    type ="text"
                    placeholder="Descrption"
                    name="description"
                    required
                />
                <label>Event date</label>
                <input 
                    type="date"
                    placeholder="DD/MM/YYYY"
                    name="date"
                    required
                />
                <label>Location</label>
                <input 
                    type="text"
                    placeholder="Location"
                    name="location"
                    required
                />
                <button type="submit">Create</button>
            </form>

            </div>
        </>

        
    )
}