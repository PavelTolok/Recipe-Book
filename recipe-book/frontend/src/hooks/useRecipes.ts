import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { DetailedMealResponse, MealResponse } from '../types/recipe.types';

export const useRecipes = (initialFilters: {
  ingredient?: string;
  country?: string;
  category?: string;
}) => {
  const [recipes, setRecipes] = useState<MealResponse>({ meals: null });
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<MealResponse>('/recipes', {
          params: filters,
        });
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [filters]);

  return { recipes, filters, setFilters, loading, error };
};

export const useRecipe = (id: string) => {
  const [recipe, setRecipe] = useState<DetailedMealResponse>({ meals: null });
  const [categoryRecipes, setCategoryRecipes] = useState<MealResponse>({
    meals: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipeResponse = await api.get<DetailedMealResponse>(
          `/recipes/${id}`
        );
        setRecipe(recipeResponse.data);

        if (recipeResponse.data.meals?.[0]?.strCategory) {
          const categoryResponse = await api.get<MealResponse>(
            `/recipes?category=${encodeURIComponent(recipeResponse.data.meals[0].strCategory)}`
          );
          setCategoryRecipes(categoryResponse.data);
        }
      } catch (err) {
        setError('Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  return { recipe, categoryRecipes, loading, error };
};
