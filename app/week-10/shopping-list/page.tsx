"use client";

import { useState, useEffect } from "react"; // Added useEffect
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context"; // Added for user.uid
import { getItems, addItem } from "../_services/shopping-list-service"; // Added services

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  // Initialize items as an empty array
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  // Access the current user
  const { user } = useUserAuth();

  // Load items from Firestore
  async function loadItems() {
    if (user) {
      const firebaseItems = await getItems(user.uid);
      setItems(firebaseItems);
    }
  }

  // Effect to load items when the user changes or component mounts
  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  // Handle adding a new item to Firestore and updating local state
  async function handleAddItem(newItem: {
    name: string;
    quantity: number;
    category: string;
  }) {
    if (user) {
      try {
        // 1. Add to Firestore and get the generated ID
        const newId = await addItem(user.uid, newItem);

        // 2. Explicitly cast newId as string to satisfy ItemType
        const itemWithId = { ...newItem, id: newId as string };

        // 3. Update the state list
        setItems((prevItems) => [...prevItems, itemWithId]);
      } catch (error) {
        console.error("Failed to add item:", error);
      }
    }
  }

  function handleItemSelect(item: ItemType) {
    const cleanedName = item.name
      .split(",")[0]
      .trim()
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, "")
      .trim();

    setSelectedItemName(cleanedName);
  }

  // Prevent rendering if user is not logged in (Optional but recommended)
  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <NewItem onAddItem={handleAddItem} />

          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 shadow">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
