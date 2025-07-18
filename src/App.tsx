import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeModal } from './components/RecipeModal';
import { searchRecipes, getRecipeDetails } from './services/api';

function App() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Load initial recipes
  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      const results = await searchRecipes({
        query,
        type: selectedCategory === 'all' ? undefined : selectedCategory
      });
      setRecipes(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setIsLoading(true);
    
    try {
      const results = await searchRecipes({
        query: searchQuery,
        type: category === 'all' ? undefined : category
      });
      setRecipes(results);
    } catch (error) {
      console.error('Error filtering recipes:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeClick = async (recipe: any) => {
    try {
      const detailedRecipe = await getRecipeDetails(recipe.id);
      setSelectedRecipe(detailedRecipe);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setSelectedRecipe(recipe);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Recipe Finder
              </h1>
              <p className="text-gray-600 text-sm">Discover delicious recipes by ingredient</p>
            </div>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Category Filter */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Filter by meal type</span>
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Results Count */}
        {!isLoading && recipes.length > 0 && (
          <div className="text-center">
            <p className="text-gray-600">
              Found <span className="font-semibold text-emerald-600">{recipes.length}</span> delicious recipes
              {searchQuery && (
                <span> for "<span className="font-medium">{searchQuery}</span>"</span>
              )}
            </p>
          </div>
        )}

        {/* Recipe Grid */}
        <RecipeGrid
          recipes={recipes}
          isLoading={isLoading}
          onRecipeClick={handleRecipeClick}
        />

        {/* API Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-emerald-900 mb-2">🎉 Connected to Spoonacular API</h3>
          <p className="text-emerald-700 text-sm">
            You're now getting real recipe data from Spoonacular! Search for ingredients to discover thousands of recipes with detailed nutritional information.
          </p>
        </div>
      </main>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;