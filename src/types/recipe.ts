export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions?: string;
  extendedIngredients?: Ingredient[];
  nutrition?: Nutrition;
  dishTypes?: string[];
  diets?: string[];
  cuisines?: string[];
  spoonacularScore?: number;
  healthScore?: number;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
  image: string;
}

export interface Nutrition {
  nutrients: Nutrient[];
  properties: NutritionProperty[];
  flavonoids: Flavonoid[];
  ingredients: NutritionIngredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface NutritionProperty {
  name: string;
  amount: number;
  unit: string;
}

export interface Flavonoid {
  name: string;
  amount: number;
  unit: string;
}

export interface NutritionIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Nutrient[];
}

export interface CaloricBreakdown {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
}

export interface WeightPerServing {
  amount: number;
  unit: string;
}

export interface SearchFilters {
  query: string;
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  type?: string;
  maxReadyTime?: number;
  minCarbs?: number;
  maxCarbs?: number;
  minProtein?: number;
  maxProtein?: number;
  minCalories?: number;
  maxCalories?: number;
}

export interface AutocompleteIngredient {
  name: string;
  image: string;
}