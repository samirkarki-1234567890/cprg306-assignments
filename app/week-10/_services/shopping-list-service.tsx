import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

/**
 * Interface for the Item object. 
 * Adjust these fields if your item has different properties.
 */
interface Item {
  name: string;
  category: string;
  quantity: number;
}

/**
 * Retrieves all items for a specific user from Firestore.
 * @param userId - The unique ID of the user.
 * @returns A promise that resolves to an array of items with their IDs.
 */
export const getItems = async (userId: string) => {
  const items: any[] = [];
  try {
    // Reference to the subcollection: users/{userId}/items
    const itemsReference = collection(db, "users", userId, "items");
    const q = query(itemsReference);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.error("Error in getItems: ", error);
  }
  return items;
};

/**
 * Adds a new item to a specific user's items subcollection.
 * @param userId - The unique ID of the user.
 * @param item - The item object to add.
 * @returns A promise that resolves to the ID of the newly created document.
 */
export const addItem = async (userId: string, item: Item) => {
  try {
    const itemsReference = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsReference, item);
    return docRef.id;
  } catch (error) {
    console.error("Error in addItem: ", error);
  }
};
