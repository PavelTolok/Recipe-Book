import { useParams, Link } from 'react-router-dom';
import { useRecipe } from '../hooks/useRecipes';
import { DetailedMeal } from '../types/recipe.types';

const RecipeInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { recipe, categoryRecipes, loading, error } = useRecipe(id!);

  const renderIngredients = (meal: DetailedMeal) => {
    const ingredients: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof DetailedMeal];
      const measure = meal[`strMeasure${i}` as keyof DetailedMeal];
      if (ingredient && typeof ingredient === 'string' && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: typeof measure === 'string' ? measure : '',
        });
      }
    }
    return ingredients;
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe.meals || recipe.meals.length === 0)
    return <p className="text-center text-gray-600">Recipe not found.</p>;

  const meal = recipe.meals[0];

  return (
    <div className="py-6 flex flex-col lg:flex-row gap-8">
      {/* Main content */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {meal.strMeal}
            </h1>
            <Link
              to={`/?country=${encodeURIComponent(meal.strArea || '')}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {meal.strArea || 'Unknown Country'}
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Instructions
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {meal.strInstructions}
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Ingredients
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            {renderIngredients(meal).map((ingredient, index) => (
              <li key={index} className="mb-1">
                <Link
                  to={`/?ingredient=${encodeURIComponent(ingredient.name)}`}
                  className="text-blue-600 hover:underline"
                >
                  {ingredient.name}
                </Link>
                {ingredient.measure && ` - ${ingredient.measure}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-1/3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          More {meal.strCategory} Recipes
        </h2>
        <div className="space-y-4">
          {categoryRecipes.meals && categoryRecipes.meals.length > 0 ? (
            categoryRecipes.meals.map((recipe) => (
              <Link
                key={recipe.idMeal}
                to={`/recipe/${recipe.idMeal}`}
                className="block bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-200"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {recipe.strMeal}
                </h3>
              </Link>
            ))
          ) : (
            <p className="text-gray-600">No other recipes in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeInfoPage;
