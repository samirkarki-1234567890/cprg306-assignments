"use client";

import { useState } from "react";
import Item from "./item";

type SortMode = "name" | "category" | "group";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ItemList({
  items,
  onItemSelect,
}: {
  items: ItemType[];
  onItemSelect: (item: ItemType) => void;
}) {
  const [sortMode, setSortMode] = useState<SortMode>("name");

  const nameSorted = [...items].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const categorySorted = [...items].sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  const groupedItems = items.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, ItemType[]>);

  return (
    <div className="w-full">
      {/* Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setSortMode("name")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            sortMode === "name"
              ? "bg-blue-600 text-white shadow"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortMode("category")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            sortMode === "category"
              ? "bg-purple-600 text-white shadow"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setSortMode("group")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            sortMode === "group"
              ? "bg-green-600 text-white shadow"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
        >
          Group by Category
        </button>
      </div>

      {/* SORT BY NAME */}
      {sortMode === "name" && (
        <ul className="space-y-3">
          {nameSorted.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)}
            />
          ))}
        </ul>
      )}

      {/* SORT BY CATEGORY */}
      {sortMode === "category" && (
        <ul className="space-y-3">
          {categorySorted.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)}
            />
          ))}
        </ul>
      )}

      {/* GROUP BY CATEGORY */}
      {sortMode === "group" && (
        <div className="space-y-8">
          {Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div
                key={category}
                className="p-4 rounded-xl border border-slate-700 bg-slate-800"
              >
                <h2 className="text-lg font-semibold capitalize mb-3 text-slate-200">
                  {category}
                </h2>

                <ul className="space-y-3">
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
                        onSelect={() => onItemSelect(item)}
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