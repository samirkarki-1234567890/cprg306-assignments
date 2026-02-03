"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    alert(
      `Item: ${name}\nQuantity: ${quantity}\nCategory: ${category}`
    );

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm p-4 border rounded-lg space-y-3"
    >
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        min="1"
        max="99"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        className="w-full border p-2 rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
        <option value="meat">Meat</option>
        <option value="frozen foods">Frozen Foods</option>
        <option value="canned goods">Canned Goods</option>
        <option value="dry goods">Dry Goods</option>
        <option value="beverages">Beverages</option>
        <option value="snacks">Snacks</option>
        <option value="household">Household</option>
        <option value="other">Other</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Item
      </button>
    </form>
  );
}
