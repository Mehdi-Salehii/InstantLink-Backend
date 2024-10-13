import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const createUser = async (data: object) => {
  try {
    const docRef = await addDoc(collection(db, "users"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export { createUser };
