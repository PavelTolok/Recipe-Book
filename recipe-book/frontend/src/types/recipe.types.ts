export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  [key: string]: any;
}

export interface MealResponse {
  meals: Meal[] | null;
}

export interface DetailedMeal extends Meal {
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
}

export interface DetailedMealResponse {
  meals: DetailedMeal[] | null;
}
