import { Link } from "react-router-dom";

export default function Footer(){
    
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-heading">Events</h3>
                    <p className="footer-text">Your premier event management platform</p>
                    <div className="social-links">
                        <a href="#" aria-label="Twitter">
                            <svg className="social-icon" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook">
                            <svg className="social-icon" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <svg className="social-icon" viewBox="0 0 24 24">
                                <path d="M12 2.16c3.2 0 3.58 0 4.85.07 3.17.14 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2 0 3.58-.07 4.85-.15 3.24-1.76 4.78-4.92 4.92-1.27.06-1.65.07-4.85.07-3.2 0-3.58 0-4.85-.07-3.17-.14-4.77-1.69-4.92-4.92-.06-1.27-.07-1.65-.07-4.85 0-3.2 0-3.58.07-4.85.15-3.23 1.76-4.78 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zm0-2.16c-3.27 0-3.68.01-4.96.07-4.1.19-6.18 2.28-6.37 6.37-.06 1.28-.07 1.69-.07 4.96s.01 3.68.07 4.96c.19 4.09 2.27 6.17 6.37 6.37 1.28.06 1.69.07 4.96.07s3.68-.01 4.96-.07c4.1-.19 6.18-2.28 6.37-6.37.06-1.28.07-1.69.07-4.96s-.01-3.68-.07-4.96c-.19-4.09-2.27-6.17-6.37-6.37-1.28-.06-1.69-.07-4.96-.07zm0 5.34c-3.13 0-5.66 2.53-5.66 5.66s2.53 5.66 5.66 5.66 5.66-2.53 5.66-5.66-2.53-5.66-5.66-5.66zm0 9.33c-2.02 0-3.66-1.64-3.66-3.66s1.64-3.66 3.66-3.66 3.66 1.64 3.66 3.66-1.64 3.66-3.66 3.66zm6.14-9.73c0 .73-.59 1.32-1.32 1.32s-1.32-.59-1.32-1.32.59-1.32 1.32-1.32 1.32.59 1.32 1.32z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/MyRegistrations">My Registrations</Link></li>
                        <li><Link to="/Event-form">Create Event</Link></li>
                        <li><Link to="/MyEvents">My Events</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Support</h4>
                    <ul className="footer-links">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Events. All rights reserved.</p>
            </div>
        </footer>
    )
}