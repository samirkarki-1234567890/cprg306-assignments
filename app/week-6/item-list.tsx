"use client";

import { useState } from "react";
import Item from "./item";

type SortMode = "name" | "category" | "group";

export default function ItemList({
  items,
}: {
  items: {
    id: string;
    name: string;
    quantity: number;
    category: string;
  }[];
}) {
  const [sortMode, setSortMode] = useState<SortMode>("name");

  //  Sort by Name
  const nameSorted = [...items].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  //  Sort by Category
  const categorySorted = [...items].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  // Group by Category
  const groupedItems = items.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, typeof items>);

  return (
    <div>
      
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => setSortMode("name")}
          className={`rounded px-3 py-1 text-white ${
            sortMode === "name"
              ? "bg-blue-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortMode("category")}
          className={`rounded px-3 py-1 text-white ${
            sortMode === "category"
              ? "bg-purple-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setSortMode("group")}
          className={`rounded px-3 py-1 text-white ${
            sortMode === "group"
              ? "bg-green-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          Group by Category
        </button>
      </div>

      {/* SORT BY NAME */}
      {sortMode === "name" && (
        <ul className="space-y-2">
          {nameSorted.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {/* SORT BY CATEGORY */}
      {sortMode === "category" && (
        <ul className="space-y-2">
          {categorySorted.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {/* GROUP BY CATEGORY */}
      {sortMode === "group" && (
        <div className="space-y-6">
          {Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category}>
                <h2 className="text-lg font-bold capitalize mb-2">
                  {category}
                </h2>

                <ul className="space-y-2">
                  {groupedItems[category]
                    .sort((a, b) =>
                      a.name.localeCompare(b.name)
                    )
                    .map((item) => (
                      <Item
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                      />
                    ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}