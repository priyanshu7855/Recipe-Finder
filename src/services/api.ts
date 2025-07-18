const API_KEY = '5135dc9befe84333b1937c2bcc47c729';
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipes = async (filters: any): Promise<any[]> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      number: '12',
      addRecipeInformation: 'true',
      fillIngredients: 'true',
      addRecipeNutrition: 'true'
    });

    if (filters.query) {
      params.append('includeIngredients', filters.query);
    }

    if (filters.type && filters.type !== 'all') {
      params.append('type', filters.type);
    }

    const response = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    
    // Fallback to mock data if API fails
    const mockRecipes = [
      {
        id: 1,
        title: "Creamy Tuscan Chicken",
        image: "https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg",
        readyInMinutes: 30,
        servings: 4,
        summary: "A rich and creamy chicken dish with sun-dried tomatoes and spinach",
        dishTypes: ["dinner", "main course"],
        healthScore: 85,
        spoonacularScore: 92,
        nutrition: {
          nutrients: [
            { name: "Calories", amount: 420, unit: "kcal", percentOfDailyNeeds: 21 },
            { name: "Protein", amount: 35, unit: "g", percentOfDailyNeeds: 70 },
            { name: "Fat", amount: 28, unit: "g", percentOfDailyNeeds: 43 },
            { name: "Carbohydrates", amount: 8, unit: "g", percentOfDailyNeeds: 3 }
          ],
          caloricBreakdown: {
            percentProtein: 33,
            percentFat: 60,
            percentCarbs: 7
          }
        }
      },
      {
        id: 2,
        title: "Mediterranean Quinoa Bowl",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        readyInMinutes: 25,
        servings: 2,
        summary: "A healthy bowl packed with quinoa, fresh vegetables, and Mediterranean flavors",
        dishTypes: ["lunch", "main course"],
        healthScore: 95,
        spoonacularScore: 88,
        nutrition: {
          nutrients: [
            { name: "Calories", amount: 350, unit: "kcal", percentOfDailyNeeds: 18 },
            { name: "Protein", amount: 12, unit: "g", percentOfDailyNeeds: 24 },
            { name: "Fat", amount: 14, unit: "g", percentOfDailyNeeds: 22 },
            { name: "Carbohydrates", amount: 48, unit: "g", percentOfDailyNeeds: 16 }
          ],
          caloricBreakdown: {
            percentProtein: 14,
            percentFat: 36,
            percentCarbs: 50
          }
        }
      },
      {
        id: 3,
        title: "Blueberry Pancakes",
        image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
        readyInMinutes: 20,
        servings: 3,
        summary: "Fluffy pancakes bursting with fresh blueberries",
        dishTypes: ["breakfast", "brunch"],
        healthScore: 65,
        spoonacularScore: 85,
        nutrition: {
          nutrients: [
            { name: "Calories", amount: 280, unit: "kcal", percentOfDailyNeeds: 14 },
            { name: "Protein", amount: 8, unit: "g", percentOfDailyNeeds: 16 },
            { name: "Fat", amount: 6, unit: "g", percentOfDailyNeeds: 9 },
            { name: "Carbohydrates", amount: 52, unit: "g", percentOfDailyNeeds: 17 }
          ],
          caloricBreakdown: {
            percentProtein: 11,
            percentFat: 19,
            percentCarbs: 70
          }
        }
      }
    ];

    let filteredRecipes = [...mockRecipes];
    
    if (filters.query) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        recipe.summary.toLowerCase().includes(filters.query.toLowerCase())
      );
    }
    
    if (filters.type && filters.type !== 'all') {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.dishTypes.includes(filters.type)
      );
    }
    
    return filteredRecipes;
  }
};

export const getIngredientAutocomplete = async (query: string): Promise<any[]> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      query: query,
      number: '6',
      metaInformation: 'false'
    });

    const response = await fetch(`${BASE_URL}/food/ingredients/autocomplete?${params}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.map((item: any) => ({
      name: item.name,
      image: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`
    }));
  } catch (error) {
    console.error('Error fetching ingredient autocomplete:', error);
    
    // Fallback to mock data
    const mockIngredients = [
      { name: 'chicken', image: 'chicken.jpg' },
      { name: 'tomato', image: 'tomato.jpg' },
      { name: 'onion', image: 'onion.jpg' },
      { name: 'garlic', image: 'garlic.jpg' },
      { name: 'spinach', image: 'spinach.jpg' },
      { name: 'salmon', image: 'salmon.jpg' },
      { name: 'avocado', image: 'avocado.jpg' },
      { name: 'quinoa', image: 'quinoa.jpg' },
      { name: 'blueberry', image: 'blueberry.jpg' },
      { name: 'asparagus', image: 'asparagus.jpg' }
    ];

    return mockIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);
  }
};

export const getRecipeDetails = async (id: number): Promise<any> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      includeNutrition: 'true'
    });

    const response = await fetch(`${BASE_URL}/recipes/${id}/information?${params}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Format the instructions from the API response
    let instructions = '';
    if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
      instructions = data.analyzedInstructions[0].steps
        .map((step: any, index: number) => `${index + 1}. ${step.step}`)
        .join('\n\n');
    } else if (data.instructions) {
      instructions = data.instructions.replace(/<[^>]*>/g, '');
    }

    return {
      ...data,
      instructions: instructions || "1. Prepare all ingredients\n2. Follow the cooking method as described\n3. Cook until done\n4. Serve hot and enjoy!"
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    
    // Fallback to enhanced mock data
    const mockRecipes: any = {
      1: {
        id: 1,
        title: "Creamy Tuscan Chicken",
        image: "https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg",
        readyInMinutes: 30,
        servings: 4,
        summary: "A rich and creamy chicken dish with sun-dried tomatoes and spinach that brings the flavors of Tuscany to your dinner table.",
        instructions: "1. Season chicken breasts with salt, pepper, and Italian herbs\n2. Heat olive oil in a large skillet over medium-high heat\n3. Cook chicken until golden brown and cooked through, about 6-7 minutes per side\n4. Remove chicken and set aside\n5. In the same pan, sauté garlic until fragrant\n6. Add sun-dried tomatoes and cook for 2 minutes\n7. Pour in heavy cream and bring to a simmer\n8. Add spinach and let it wilt\n9. Return chicken to the pan and simmer for 5 minutes\n10. Serve hot with pasta or rice",
        extendedIngredients: [
          { id: 1, name: "Chicken breasts", amount: 4, unit: "pieces", original: "4 boneless, skinless chicken breasts", image: "chicken-breast.jpg" },
          { id: 2, name: "Heavy cream", amount: 1, unit: "cup", original: "1 cup heavy cream", image: "heavy-cream.jpg" },
          { id: 3, name: "Sun-dried tomatoes", amount: 0.5, unit: "cup", original: "1/2 cup sun-dried tomatoes, chopped", image: "sundried-tomatoes.jpg" },
          { id: 4, name: "Fresh spinach", amount: 2, unit: "cups", original: "2 cups fresh spinach", image: "spinach.jpg" },
          { id: 5, name: "Garlic", amount: 3, unit: "cloves", original: "3 cloves garlic, minced", image: "garlic.jpg" }
        ],
        nutrition: {
          nutrients: [
            { name: "Calories", amount: 420, unit: "kcal", percentOfDailyNeeds: 21 },
            { name: "Protein", amount: 35, unit: "g", percentOfDailyNeeds: 70 },
            { name: "Fat", amount: 28, unit: "g", percentOfDailyNeeds: 43 },
            { name: "Carbohydrates", amount: 8, unit: "g", percentOfDailyNeeds: 3 }
          ],
          caloricBreakdown: {
            percentProtein: 33,
            percentFat: 60,
            percentCarbs: 7
          }
        }
      }
    };

    return mockRecipes[id] || mockRecipes[1];
  }
};