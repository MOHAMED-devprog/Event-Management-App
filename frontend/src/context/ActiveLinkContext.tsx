import { createContext, useContext, useState, type ReactNode } from "react";

type ActiceLink = {
    activeLink : string;
    updateActiveLink : (link : string) => void;
}


const ActiveLinkContext = createContext<ActiceLink | undefined>(undefined);

export const ActiveLinkProvider = ({children} : {children : ReactNode}) => {

    const [activeLink, setActiveLink] = useState("/");

    const updateActiveLink = (event :string) => setActiveLink(event);


    return (
        <ActiveLinkContext.Provider value={{activeLink, updateActiveLink}}>
            {children}
        </ActiveLinkContext.Provider>
    )
}

export const useActiveLink = () => {
    const context = useContext(ActiveLinkContext);

    if(!context) throw new Error("useActiveLink should be used on SearchEventProvider");
    return context;
}