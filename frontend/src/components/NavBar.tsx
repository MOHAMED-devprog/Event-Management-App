import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "../context/LoginContext";
import { useProfile } from "../context/ProfileContext";
import { useSearchEvent } from "../context/SearchEventContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function NavBar() {

    //profile state :
    /*
      * updating the profile state after sign in
      * using the current profile for updating the user section in the navigation bar
    */
    const {profile, updateName} = useProfile();


    //login state :
    /*
      * updating the user menu after sign in or sign out
    */
    const {login, switchLogin} = useLogin();


    //updateSearchedEvent setter for the eventSearch state :
    /*
      * updating the state for filtering the Event list For the giving input title
    */
    const {updateSearchEvent} = useSearchEvent();
 
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem("currentUser");
        updateName(null);
        switchLogin(false);
    }
    
    
    return (

        <nav className="navbar">
            <div className="navbar-container">

                <div className="navbar-brand">
                    <Link to="/" className="logo">Events</Link>
                </div>
                
                <div className="navbar-search">
                    <div className="search-container">
                        <svg className="search-icon" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        <input 
                            className="search-input" 
                            type="text" 
                            placeholder="Search events..." 
                            aria-label="Search events"
                            onChange={(e) => updateSearchEvent(e.target.value)}
                        />
                    </div>
                </div>
                
                <ul className="navbar-links">
                    <li>
                        <Link to="/" className="nav-link">
                            <svg className="nav-icon" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Event-form" className="nav-link">
                            <svg className="nav-icon" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                            <span>Create Event</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/MyRegistrations" className="nav-link">
                            <svg className="nav-icon" viewBox="0 0 24 24">
                                <path d="M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                                <path d="M12 12a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm0 3a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm3-3a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm0 3a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm-6 0a1 1 0 1 0-1-1 1 1 0 0 0 1 1z"/>
                            </svg>
                            <span>My Registrations</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/MyEvents" className="nav-link">
                            <svg className="nav-icon" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            <span>My Events</span>
                        </Link>
                    </li>
                </ul>
                
                <div className="navbar-user">
                {login && profile? (
                    <div className="user-menu">
                        <div className="user-info-section">
                            <div className="user-avatar">
                            {profile?.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-info">
                                <span className="username">{profile.username}</span>
                                <span className="user-status">
                                <span className="status-dot"></span>
                                Online
                                </span>
                            </div>
                            <svg className="dropdown-icon" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </div>
                        
                        <div className="user-menu-dropdown" onClick={handleLogout}>
                            <div className="dropdown-item">
                            <svg className="logout-icon" viewBox="0 0 24 24">
                                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            <span>Sign Out</span>
                            </div>
                        </div>

                        
                    </div>
                ) : (
                    <button onClick={() => navigate('/Connexion')} className="auth-button">
                    <svg className="auth-icon" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span>Sign In</span>
                    </button>
                )}
                </div>
            </div>
        </nav>

    )
}