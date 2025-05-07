

export default function NavBar() {

    return (
        <nav>
            <ul>
                <li>Home</li>
                <li>Create Event</li> 
                <li>My Registrations</li>
            </ul>

            <div className="InputContainer">
                
                <input className="search-bar" type="text" placeholder="Search..."/>
            </div>
            
            <div className="connexion">
                <button>Sign in</button>
            </div>
        </nav>
    )
}