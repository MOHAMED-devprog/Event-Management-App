import { createContext, useContext, useState, type ReactNode } from "react";

type SearchEvent = {
    eventSearch : string;
    updateSearchEvent : (event : string) => void;
}


const SearchEventContext = createContext<SearchEvent | undefined>(undefined);

export const SearchEventProvider = ({children} : {children : ReactNode}) => {

    const [eventSearch, setEventSearch] = useState("");

    const updateSearchEvent = (event :string) => setEventSearch(event);


    return (
        <SearchEventContext.Provider value={{eventSearch, updateSearchEvent}}>
            {children}
        </SearchEventContext.Provider>
    )
}

export const useSearchEvent = () => {
    const context = useContext(SearchEventContext);

    if(!context) throw new Error("useSearchEvent should be used on SearchEventProvider");
    return context;
}