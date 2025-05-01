import { Router, Request, Response, NextFunction } from 'express';
import { RecipeService } from '../services/recipe.service';

const router = Router();
const recipeService = new RecipeService();

router.get(
  '/recipes',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ingredient, country, category } = req.query;

      const filterCount = [ingredient, country, category].filter(
        Boolean
      ).length;
      if (filterCount > 1) {
        const error = new Error('Only one filter can be applied at a time');
        (error as any).status = 400;
        throw error;
      }

      const filters = {
        ingredient: typeof ingredient === 'string' ? ingredient : undefined,
        country: typeof country === 'string' ? country : undefined,
        category: typeof category === 'string' ? category : undefined,
      };

      const recipes = await recipeService.fetchRecipes(filters);
      res.json(recipes);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/recipes/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        const error = new Error('Invalid recipe ID');
        (error as any).status = 400;
        throw error;
      }

      const recipe = await recipeService.fetchRecipeById(id);
      if (!recipe.meals || recipe.meals.length === 0) {
        const error = new Error('Recipe not found');
        (error as any).status = 404;
        throw error;
      }

      res.json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
