"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  function handleAddItem(newItem: {
    name: string;
    quantity: number;
    category: string;
  }) {
    setItems([
      ...items,
      { ...newItem, id: Date.now().toString() },
    ]);
  }

  function handleItemSelect(item: ItemType) {
    const cleanedName = item.name
      .split(",")[0]
      .trim()
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g,
        ""
      )
      .trim();

    setSelectedItemName(cleanedName);
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Shopping List
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <NewItem onAddItem={handleAddItem} />

          <ItemList
            items={items}
            onItemSelect={handleItemSelect}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 shadow">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}