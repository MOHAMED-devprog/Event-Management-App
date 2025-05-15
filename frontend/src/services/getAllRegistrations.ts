import { db } from "../../frontend/src/firebase";
import {  collection, getDocs } from "firebase/firestore";

export const getAllRegistrations = async (userId :string) => {

    const data = await getDocs(collection(db, "registration"));

    const docs = data.docs;

    let documents : string[] = [];

    docs.forEach(async reg => {
        if (reg.data().userId === userId){
            documents.push(reg.data().eventId);
        }
    })

    
    return documents;

}