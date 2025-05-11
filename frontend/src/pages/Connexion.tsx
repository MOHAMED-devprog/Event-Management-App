
import { useState, type FormEvent } from "react"
import { registerUser, loginUser } from "../services/auth";
import { useLogin} from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { type User } from "../types/interfaces";

export default function Connexion(){

    const {switchLogin} = useLogin();

    const {updateName} = useProfile();

    const navigate = useNavigate();

    const [islogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorAuthentification, setErrorAuthentification] = useState("");

    const switchToggle = () => setIsLogin(!islogin);

    const handleSubmit = async (e : FormEvent) => {
        e.preventDefault();

        try {

            const user : User | null = islogin ? await loginUser({email}, password) : await registerUser({username, email}, password);

            if (user){

                localStorage.setItem("currentUser",JSON.stringify(user));
                
                switchLogin(true);
                updateName(user);
                navigate('/');
            }
            setErrorAuthentification("");
        }catch (e){
            setErrorAuthentification('Invalid E-mail or Password !');
            console.log("error creating user : "+ e);
        }
        
    }


    return (
        <div className="page-container">

            <button className="back-home" onClick={() => navigate('/')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <span>Back</span>
            </button>

            <div className="form-container">
                <h2>{islogin ? "Login" : "Sign in"}</h2>

                <form onSubmit={handleSubmit}>
                    {!islogin && 
                        <>  
                            <label>Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            /><br></br>
                        </>
                    }

                    <label>E-mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="xyz@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    /><br></br>
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br></br>
                    <span className="authentification-error">{errorAuthentification}</span>
                    <button type="submit">
                        {islogin ? "Login" : "Submit"}
                    </button>
                </form>
                <div className="toggle-section">
                    <p>{islogin ? "Don't have an account ?" : "Already Have one ?"}</p>
                    <button onClick={switchToggle}>{islogin ? "Sign up" : "Login"}</button>
                </div>
                    
                
            </div>
        </div>    
    )
}