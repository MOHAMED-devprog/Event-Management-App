
import { useState } from "react"


export default function Connexion(){

    const [login, setLogin] = useState(true);

    const switchToggle = () => setLogin(!login);



    return (
        <div className="page-container">
            <div className="form-container">
                <h2>{login ? "Login" : "Sign in"}</h2>

                <form action="#">
                    {!login && 
                        <>  
                            <label>Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                required
                            /><br></br>
                        </>
                    }

                    <label>E-mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="xyz@example.com"
                        required 
                    /><br></br>
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        required
                        minLength={8}
                    /><br></br>
                    <button type="submit">{login ? "Login" : "Submit"}</button>
                </form>
                <div className="toggle-section">
                    <p>{login ? "Don't have an account ?" : "Already Have one ?"}</p>
                    <button onClick={switchToggle}>{login ? "Sign up" : "Login"}</button>
                </div>
                    
                
            </div>
        </div>    
    )
}