"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [sortBy, setSortBy] = useState("name");

  function handleAddItem(newItem: {
    name: string;
    quantity: number;
    category: string;
  }) {
    setItems([...items, { ...newItem, id: Date.now().toString() }]);
  }

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6 ml-55">Shopping List</h1>

      <NewItem onAddItem={handleAddItem} />
    
      <ItemList items={items} />
    </main>
  );
}