import { db } from "../firebase"
import {addDoc, collection, deleteDoc, doc, updateDoc} from "firebase/firestore"
import { type Event } from "../types/interfaces"

export const createEvent = async ({title, description, date, location, imageUrl, creatorId, participantsNumber} : Event) => {
    
    await addDoc(collection(db , "event"), {
        creatorId,
        date,
        description,
        imageUrl,
        location,
        participantsNumber,
        title 
    });

}

export const updateEvent = async ({title, description, dateAndTime, location, imageUrl} : any,
     eventId : string) => {

        await updateDoc(doc(db, "event", eventId), {
            dateAndTime,
            description,
            imageUrl,
            location,
            title 
        });
}

export const deleteEvent = async (eventId :string) => {

    await deleteDoc(doc(db, "event", eventId));
    
}