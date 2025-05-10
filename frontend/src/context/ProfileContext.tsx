
import { createContext, useContext, useState, type ReactNode } from "react";
import {type User} from "../types/interfaces";

interface ProfileType {
    profile : User | null;
    updateName : (user : User) => void;
}

const ProfileContext = createContext<ProfileType | undefined>(undefined);

export const ProfileProvider = ({children} : {children : ReactNode}) => {

    const [profile, setProfile] = useState<User | null>(null);

    const updateName = (user : User) => setProfile(user);

    return (
        <ProfileContext.Provider value={{profile, updateName}}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => {

    const context = useContext(ProfileContext);

    if(!context) throw new Error("useProfile doit être utilisé dans CompteurProvider");

    return context;
}