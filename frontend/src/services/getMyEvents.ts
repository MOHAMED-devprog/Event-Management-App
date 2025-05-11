import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { type Event, type User } from "../types/interfaces";


export const getAllEvents = async (currentUser : User) => {

    const data = await getDocs(collection(db, 'event'));

    const documents = data.docs;

    let docs : Event [] = [];

    documents.forEach(event => {

        if (event.data().creator_id === currentUser.id){

            const newEvent : Event = {
                id : event.id,
                title : event.data().title,
                description : event.data().description,
                date : event.data().date,
                location : event.data().location,
                imageUrl : event.data().imageUrl,
                creatorId : event.data().creator_id,
                participantsNumber : event.data().participantsNumber
            }

            docs.push(newEvent);
        }
    });
    
    return docs;

}