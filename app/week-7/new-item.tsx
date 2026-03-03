"use client";

import { useState } from "react";

export default function NewItem({
  onAddItem,
}: {
  onAddItem: (item: {
    name: string;
    quantity: number;
    category: string;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newItem = {
      name,
      quantity,
      category,
    };

    onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 p-5 rounded-xl bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-100">
        Add New Item
      </h2>

      <input
        className="w-full bg-slate-600/40 border border-slate-500/50 text-slate-100 placeholder-slate-400 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="w-full bg-slate-600/40 border border-slate-500/50 text-slate-100 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="number"
        min="1"
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
      />

      <select
        className="w-full bg-slate-600/40 border border-slate-500/50 text-slate-100 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
        <option value="meat">Meat</option>
        <option value="canned goods">Canned Goods</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
      >
        Add Item
      </button>
    </form>
  );
}