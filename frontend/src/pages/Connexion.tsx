
import { useEffect, useState, type FormEvent } from "react"
import { registerUser, loginUser } from "../services/auth";
import { useLogin} from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { type User } from "../types/interfaces";
import { useActiveLink } from "../context/ActiveLinkContext";

export default function Connexion(){

    const {switchLogin} = useLogin();
    const {updateActiveLink} = useActiveLink();
    const {updateName} = useProfile();

    const navigate = useNavigate();

    const [islogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorAuthentification, setErrorAuthentification] = useState("");

    const switchToggle = () => {
        setEmail("");
        setPassword("");
        setIsLogin(!islogin);
    }

    const handleSubmit = async (e : FormEvent) => {
        e.preventDefault();

        try {
            const id ="";
            const user : User | null = islogin ? await loginUser({id, email}, password) : await registerUser({id, username, email}, password);

            if (user){

                localStorage.setItem("currentUser",JSON.stringify(user));
                
                switchLogin(true);
                updateName(user);
                navigate('/');
            }
            setErrorAuthentification("");
        }catch (e){
            if (islogin)
                setErrorAuthentification('Invalid E-mail or Password !');
            else
                setErrorAuthentification('This E-mail is already used !');
        }
        
    }

    useEffect(() => {
        setErrorAuthentification("");
    },[islogin])


    return (
        <div className="auth-container">
            <button className="back-button" onClick={() => {navigate('/'); updateActiveLink('/');}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to home
            </button>

            <div className="auth-card">
                <div className="auth-header">
                    <h2>{islogin ? "Welcome Back" : "Create Account"}</h2>
                    <p>{islogin ? "Log in to your account" : "Get started with your account"}</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                {!islogin && (
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                )}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                {errorAuthentification && (
                    <div className="error-message">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        {errorAuthentification}
                    </div>
                )}

                    <button type="submit" className="submit-button">
                        {islogin ? "Log In" : "Sign Up"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>{islogin ? "Don't have an account?" : "Already have an account?"}</p>
                    <button onClick={switchToggle} className="toggle-button">
                        {islogin ? "Sign up here" : "Log in here"}
                    </button>
                </div>
            </div>
        </div>
    )
}