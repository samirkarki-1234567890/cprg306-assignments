"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

    const isValidName = /^[A-Za-z0-9\s]+$/.test(name.trim());

  const nameError =
    nameTouched && (name.trim().length < 2 || !isValidName)
      ? "Item name must be at least 2 letters and contain only letters"
      : "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim().length < 2) {
      setNameTouched(true);
      return;
    }

    alert(`Added\nItem: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  return (
    <div className="max-w-md">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="space-y-1">
          <input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            className={`w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 ${
               nameTouched && !name
                ? "border-red-400"
                : "border-gray-300"
            } ${
            nameTouched && name && /^\d+$/.test(name)
                ? "border-red-400"
                : "border-gray-300"
            } ${
            nameTouched && name && name.length <= 2
                ? "border-red-400"
                : "border-gray-300"
            }`}
            required
          />
          {nameTouched && !name &&  (
            <p className="text-red-500 text-sm mt-1">
              Name is required.
            </p>
          )
          }
          {nameTouched && name && /^\d+$/.test(name) && (
            <p className="text-red-500 text-sm mt-1">Name cannot be only numbers.</p>
          )}
          {nameTouched && name && name.length <= 2 && (
            <p className="text-red-500 text-sm mt-1">
              Name must be at least 2 characters long.
            </p>
          )}
        </div>

        <input
          type="number"
          min="1"
          max="99"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-md bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-800 active:scale-[0.99]"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
