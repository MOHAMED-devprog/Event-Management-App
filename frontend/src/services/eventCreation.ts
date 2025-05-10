import { db } from "../firebase"
import {addDoc, collection} from "firebase/firestore"
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