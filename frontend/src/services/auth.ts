
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth"
import { setDoc , doc, getDoc } from "firebase/firestore"
import { type User } from "../types/interfaces"
import { useProfile } from "../context/ProfileContext"



export const registerUser = async ({username, email} : User, password : string) => {

    const userInfo = await createUserWithEmailAndPassword(auth, email, password);

    const userId =userInfo.user.uid;

    await setDoc(doc(db, "user", userId), {

        email,
        username
    });

    const user = await getDoc(doc(db, "user", userId));

    const userData = user.data();

    const profile : User = {
        id : userId,
        username : userData?.username,
        email : userData?.email,
    }

    return profile;
    
}

export const loginUser = async ({email} : User, password : string) => {

    const userInfo = await signInWithEmailAndPassword(auth, email, password);

    const user =  await getDoc(doc(db, "user" , userInfo.user.uid));

    if (user.exists()){

        const userData = user.data();

        const profile : User = {
            id : userInfo.user.uid,
            username : userData?.username,
            email : userData?.email,
        }

        return profile;
    }
    return null;
}