
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { type Event } from "../types/interfaces";


export const getAllEvents = async (creatorId? : string, title?: string) => {

    const data = await getDocs(collection(db, 'event'));

    const documents = data.docs;

    let docs : Event [] = [];

    if (creatorId !== ""){

        //get Events that the current User created

        documents.forEach(event => {

    
            if (event.data().creatorId === creatorId){

                const newEvent : Event = {
                    id : event.id,
                    title : event.data().title,
                    description : event.data().description,
                    date : event.data().date,
                    location : event.data().location,
                    imageUrl : event.data().imageUrl,
                    creatorId : event.data().creatorId,
                    participantsNumber : event.data().participantsNumber
                }

                docs.push(newEvent);
            }
        });

    }else if (title){

        //get Events by title

        documents.forEach(event => {

            const searchedTitle : string = event.data().title;
            if (searchedTitle.toLocaleLowerCase().startsWith(title.toLocaleLowerCase())){

                const newEvent : Event = {
                    id : event.id,
                    title : event.data().title,
                    description : event.data().description,
                    date : event.data().date,
                    location : event.data().location,
                    imageUrl : event.data().imageUrl,
                    creatorId : event.data().creatorId,
                    participantsNumber : event.data().participantsNumber
                }

                docs.push(newEvent);
            }
        });

    }
    
    else {

        //get all the events

        documents.forEach(event => {

            if (event.data().creator_id !== ""){

                    const newEvent : Event = {
                        id : event.id,
                        title : event.data().title,
                        description : event.data().description,
                        date : event.data().date,
                        location : event.data().location,
                        imageUrl : event.data().imageUrl,
                        creatorId : event.data().creatorId,
                        participantsNumber : event.data().participantsNumber
                    }

                    docs.push(newEvent);
                }
        });
    }


    
    return docs;

}


export const getEventById = async (eventId : string) => {

    const event = await getDoc(doc(db, 'event', eventId));
    
    if (event.exists()){

        const eventRegistred : Event = {
            id : event.id,
            title : event.data().title,
            description : event.data().description,
            date : event.data().date,
            location : event.data().location,
            imageUrl : event.data().imageUrl,
            creatorId : event.data().creatorId,
            participantsNumber : event.data().participantsNumber
        }

        return eventRegistred;
    }

    
    return null;
    
}