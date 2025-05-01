import { get } from 'env-var';

export const config = {
  port: get('PORT').default('3001').asPortNumber(),
  mealDbApiUrl: get('MEALDB_API_URL').required().asUrlString(),
};
