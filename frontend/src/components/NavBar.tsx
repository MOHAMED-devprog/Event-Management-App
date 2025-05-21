import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "../context/LoginContext";
import { useProfile } from "../context/ProfileContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useActiveLink } from "../context/ActiveLinkContext";

export default function NavBar() {

    const {activeLink, updateActiveLink} = useActiveLink();

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

                <svg className="hamburger-menu" viewBox="0 0 24 24">
                    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                
                <ul className="navbar-links">
                    <li onClick={() => updateActiveLink("/")}>
                        <Link    
                            to="/" 
                            className={`nav-link ${activeLink === '/' ? "active" : ""}`}                            
                        >
                            <svg className="nav-icon" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                            <span>Home</span>
                            
                        </Link>
                    </li>
                    <li onClick={() => updateActiveLink("/Event-form")}>
                        <Link 
                            to="/Event-form" 
                            className={`nav-link ${activeLink === '/Event-form' ? "active" : ""}`}  
                        >
                            <svg className="nav-icon" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                            <span>Create Event</span>
                            
                        </Link>
                    </li>
                    <li onClick={() => updateActiveLink("/MyRegistrations")}>
                        <Link 
                            to="/MyRegistrations" 
                            className={`nav-link ${activeLink === '/MyRegistrations' ? "active" : ""}`}
                        >
                            <svg className="nav-icon" viewBox="0 0 24 24">
                                <path d="M19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                                <path d="M12 12a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm0 3a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm3-3a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm0 3a1 1 0 1 0-1-1 1 1 0 0 0 1 1zm-6 0a1 1 0 1 0-1-1 1 1 0 0 0 1 1z"/>
                            </svg>
                            <span>My Registrations</span>
                            
                        </Link>
                    </li>
                    <li onClick={() => updateActiveLink("/MyEvents")}>
                        <Link 
                            to="/MyEvents" 
                            className={`nav-link ${activeLink === '/MyEvents' ? "active" : ""}`}                           
                        >
                            <svg className="nav-icon" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            <span>My Events</span>
                            
                        </Link>
                    </li>
                    <li>
                        <div className="nav-link" 
                            role="button" 
                            onClick={handleLogout}
                            style={{display : login ? "flex" : "none"}}
                        >
                            <svg className="logout-icon" viewBox="0 0 24 24">
                                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            <span>Sign Out</span>
                        </div>
                    </li>
                </ul>
                
                <div className="navbar-user">
                {login && profile? (
                    <div className="user-menu">
                        <div className="user-info-section">
                            <div className="user-avatar" style={{backgroundColor : "#3b82f6"}}>
                                <svg className="profile-icon" viewBox="0 0 24 24" fill="#3b82f6" stroke="currentColor">
                                    <circle cx="12" cy="7" r="4" strokeWidth="1.5"/>
                                    <path d="M5 21v-2a7 7 0 0 1 14 0v2" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
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
                        
                        <div className="user-menu-dropdown" role="button" onClick={handleLogout}>
                            <div className="dropdown-item">
                                <svg className="logout-icon" viewBox="0 0 24 24">
                                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
                                <span>Sign Out</span>
                            </div>
                        </div>

                        
                    </div>
                ) : (
                    <button onClick={() => navigate('/Connexion')} className="auth-button-nav">
                        <svg className="auth-icon-nav" viewBox="0 0 24 24">
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