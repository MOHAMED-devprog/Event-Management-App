import { db } from "../../../backend/firebase";
import { addDoc , collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";


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

export const deRegisterForEvent = async (eventId : string, userId : string) => {

    const data = await getDocs(collection(db, "registration"));

    if (!data.empty){

        const documents = data.docs;
        documents.forEach(async reg => {

            if (reg.data().userId === userId && reg.data().eventId === eventId){
                const refrence = reg.ref;
                await deleteDoc(refrence);

                const event = await getDoc(doc(db, "event", eventId));
    
                if (event.exists()){

                    let oldNumber :number = event.data().participantsNumber;
                    oldNumber--;
                    await updateDoc(doc(db , "event", eventId), {
                        participantsNumber : oldNumber
                    });
                }

                return;
            }
        });

    }

}
