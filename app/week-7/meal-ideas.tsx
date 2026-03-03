"use client";

import { useState, useEffect } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
  );

  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMealIdeas() {
      if (!ingredient) {
        setMeals([]);
        return;
      }

      setLoading(true);
      const results = await fetchMealIdeas(ingredient);
      setMeals(results);
      setLoading(false);
    }

    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-slate-100">
        Meal Ideas {ingredient && `for "${ingredient}"`}
      </h2>

      {loading && <p className="text-slate-300">Loading meals...</p>}

      {!loading && meals.length === 0 && (
        <p className="text-slate-400">No meal ideas found.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-200"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-40 object-cover"
            />

            <div className="p-3">
              <p className="text-slate-100 font-medium">
                {meal.strMeal}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}