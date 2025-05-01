import axios from 'axios';
import { config } from '../utils/api';
import { MealResponse, DetailedMealResponse } from '../types/recipe.types';

export class RecipeService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = config.mealDbApiUrl;
  }

  async fetchRecipes(filters: {
    ingredient?: string;
    country?: string;
    category?: string;
  }): Promise<MealResponse> {
    try {
      let url = `${this.apiUrl}/search.php?s=`;

      if (filters.ingredient) {
        url = `${this.apiUrl}/filter.php?i=${encodeURIComponent(filters.ingredient)}`;
      } else if (filters.country) {
        url = `${this.apiUrl}/filter.php?a=${encodeURIComponent(filters.country)}`;
      } else if (filters.category) {
        url = `${this.apiUrl}/filter.php?c=${encodeURIComponent(filters.category)}`;
      }

      const response = await axios.get<MealResponse>(url);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch recipes');
    }
  }

  async fetchRecipeById(id: string): Promise<DetailedMealResponse> {
    try {
      const response = await axios.get<DetailedMealResponse>(
        `${this.apiUrl}/lookup.php?i=${encodeURIComponent(id)}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch recipe details');
    }
  }
}
