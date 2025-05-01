import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import { Meal } from '../types/recipe.types';

const RecipeListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilters = {
    ingredient: searchParams.get('ingredient') || undefined,
    country: searchParams.get('country') || undefined,
    category: searchParams.get('category') || undefined,
  };
  const { recipes, filters, setFilters, loading, error } =
    useRecipes(initialFilters);

  const [ingredientInput, setIngredientInput] = useState(
    filters.ingredient || ''
  );
  const [countryInput, setCountryInput] = useState(filters.country || '');
  const [categoryInput, setCategoryInput] = useState(filters.category || '');

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters: typeof filters = {};
    if (ingredientInput) newFilters.ingredient = ingredientInput;
    if (countryInput) newFilters.country = countryInput;
    if (categoryInput) newFilters.category = categoryInput;

    setFilters(newFilters);
    setSearchParams(newFilters);
  };

  const renderTitle = () => {
    if (filters.ingredient) return `Recipes with ${filters.ingredient}`;
    if (filters.country) return `Recipes from ${filters.country}`;
    if (filters.category) return `${filters.category} Recipes`;
    return 'All Recipes';
  };

  return (
    <div className="py-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        {renderTitle()}
      </h1>

      <form
        onSubmit={handleFilterSubmit}
        className="mb-8 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Filter by ingredient (e.g., chicken_breast)"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Filter by country (e.g., Canadian)"
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Filter by category (e.g., Seafood)"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Apply Filters
        </button>
      </form>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && recipes.meals && recipes.meals.length === 0 && (
        <p className="text-center text-gray-600">No recipes found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.meals?.map((recipe: Meal) => (
          <Link
            key={recipe.idMeal}
            to={`/recipe/${recipe.idMeal}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-200"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {recipe.strMeal}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeListPage;
