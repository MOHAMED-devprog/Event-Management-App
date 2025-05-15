import { createContext, useContext, useState, type ReactNode } from "react";

type RegitrationContextType = {
    registration : boolean;
    updateRegistration : (bool : boolean) => void;
}


const RegistrationContext = createContext<RegitrationContextType | undefined>(undefined);

export const RegistrationProvider = ({children}: {children : ReactNode}) => {

    const [registration, setRegistration] = useState(false);

    const updateRegistration = (bool : boolean) => setRegistration(bool);

    return(
        <RegistrationContext.Provider value={{registration, updateRegistration}}>
            {children}
        </RegistrationContext.Provider>
    )
}

export const useRegistration = () => {

    const context = useContext(RegistrationContext);
    if(!context) throw new Error("useRegistration should be used on RegistrationProvider");

    return context;
}