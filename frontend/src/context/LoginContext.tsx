import { createContext, useContext, useState, type ReactNode} from "react";

type loginContextType = {
    login : boolean;
    switchLogin : () => void;
}

const loginContext = createContext<loginContextType | undefined>(undefined);

export const LoginProvider = ({children} : {children : ReactNode}) => {

    const [login, setLogin] = useState(false);

    const switchLogin = () => setLogin(!login);

    return (
        <loginContext.Provider value={{login, switchLogin}}>
            {children}
        </loginContext.Provider>
    )
}

export const useLogin = () => {

    const context = useContext(loginContext);

    if (!context) throw new Error("useLogin doit être utilisé dans CompteurProvider");
    return context;
}