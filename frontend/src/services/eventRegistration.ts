import { db } from "../firebase";
import { addDoc , collection, doc, getDoc, updateDoc } from "firebase/firestore";


export const registerForEvent = async (eventId : string, userId :string) => {

    await addDoc(collection(db, "registration"), {
        eventId,
        userId
    })

    const event = await getDoc(doc(db, "event", eventId));
    
    if (event.exists()){

        let oldNumber :number = event.data().participantsNumber;
        oldNumber++;
        await updateDoc(doc(db , "event", eventId), {
            participantsNumber : oldNumber
        });
    }
}
