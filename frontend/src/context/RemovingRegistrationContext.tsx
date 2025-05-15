import { createContext, useContext, useState, type ReactNode } from "react";

type RemovingRegistrationContextType = {
    isRemoving : boolean;
    updateIsRemoving : (bool : boolean) => void;
}


const RemovingRegistrationContext = createContext<RemovingRegistrationContextType | undefined>(undefined);

export const RemovingRegistrationProvider = ({children}: {children : ReactNode}) => {

    const [isRemoving, setIsRemoving] = useState(false);

    const updateIsRemoving = (bool : boolean) => setIsRemoving(bool);

    return(
        <RemovingRegistrationContext.Provider value={{isRemoving, updateIsRemoving}}>
            {children}
        </RemovingRegistrationContext.Provider>
    )
}

export const useRemovingRegistration = () => {

    const context = useContext(RemovingRegistrationContext);

    if(!context) throw new Error("useRemovingRegistration should be used on RegistrationProvider");

    return context;
}