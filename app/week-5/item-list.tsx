"use client";

import { useState } from "react";
import Item from "./item";
import items from "./items.json";

type ViewMode = "name" | "category" | "grouped";

export default function ItemList() {
  const [viewMode, setViewMode] = useState<ViewMode>("name");

  // Normal sorting (name / category)
  const sortedItems =
    viewMode !== "grouped"
      ? [...items].sort((a, b) =>
          a[viewMode].localeCompare(b[viewMode])
        )
      : [];

  // Grouped by category (Week 5 requirement)
  const groupedItems = items.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, typeof items>);

  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div className="p-4">
      {/* Buttons */}
      <div className="mb-4 flex gap-2 justify-center">
        <button
          onClick={() => setViewMode("name")}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
        >
          Sort by Name
        </button>

        <button
          onClick={() => setViewMode("category")}
          className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
        >
          Sort by Category
        </button>

        <button
          onClick={() => setViewMode("grouped")}
          className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600"
        >
          Group by Category
        </button>
      </div>

      {/* Normal List */}
      {viewMode !== "grouped" && (
        <ul className="space-y-2">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {/* Grouped View */}
      {viewMode === "grouped" && (
        <div className="max-w-2xl mx-auto space-y-8">
          {sortedCategories.map((category) => (
            <div key={category} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold capitalize mb-4 text-white border-b border-gray-600 pb-2">
                {category}
              </h2>
              <ul className="space-y-2">
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <li key={item.id} className="text-gray-200 text-lg pl-2">
                      • {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}