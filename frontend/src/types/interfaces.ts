import type { Timestamp } from "firebase/firestore"

interface User {
    id : string,
    username? : string,
    email : string,
}

interface Event {
    id : string,
    title : string,
    description : string,
    date : Timestamp,
    location : string,
    imageId : string,
    imageUrl : string,
    creatorId : string,
    participantsNumber : number,
}

export { type User,type Event};
