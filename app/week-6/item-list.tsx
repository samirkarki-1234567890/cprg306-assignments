"use client";

import { useState } from "react";
import Item from "./item";

type SortBy = "name" | "category";

export default function ItemList({ items }: {
  items: {
    id: string;
    name: string;
    quantity: number;
    category: string;
  }[];
}) {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  const sortedItems = [...items].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSortBy("name")}
          className="rounded bg-blue-500 px-3 py-1 text-white"
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className="rounded bg-green-500 px-3 py-1 text-white"
        >
          Sort by Category
        </button>
      </div>

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
    </div>
  );
}