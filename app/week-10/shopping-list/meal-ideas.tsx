"use client";

import { useState, useEffect } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  );

  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  async function loadMealIdeas() {
    if (!ingredient) {
      setMeals([]);
      return;
    }

    // Remove emojis + special characters
    const cleanedIngredient = ingredient
      .replace(/[^a-zA-Z\s]/g, "")
      .trim()
      .toLowerCase();

    if (!cleanedIngredient) {
      setMeals([]);
      return;
    }

    const results = await fetchMealIdeas(cleanedIngredient);
    setMeals(results);
  }

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">
        Meal Ideas {ingredient && `for "${ingredient}"`}
      </h2>

      {meals.length === 0 ? (
        <p>No meal ideas found.</p>
      ) : (
        <ul className="space-y-3">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="flex items-center gap-4 bg-slate-700/70 border border-slate-600/50 px-4 py-3 rounded-lg text-slate-100 hover:bg-slate-700 transition"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />

              <p className="font-medium text-sm">{meal.strMeal}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
