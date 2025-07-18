import React from 'react';
import { X, Clock, Users, Star, ChefHat } from 'lucide-react';
import { NutritionInfo } from './NutritionInfo';

interface RecipeModalProps {
  recipe: any;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, isOpen, onClose }) => {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        <div className="relative">
          {/* Header Image */}
          <div className="aspect-[21/9] bg-gray-100 relative overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-3">{recipe.title}</h1>
              <div className="flex items-center space-x-8 text-base">
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5" />
                  <span>{recipe.readyInMinutes} minutes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-5 w-5" />
                  <span>{recipe.servings} servings</span>
                </div>
                {recipe.spoonacularScore && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span>{Math.round(recipe.spoonacularScore)}/100</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Recipe Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Summary */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <ChefHat className="h-6 w-6 mr-3 text-emerald-600" />
                    About This Recipe
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {recipe.summary?.replace(/<[^>]*>/g, '') || 'A delicious recipe perfect for any occasion.'}
                  </p>
                </div>
                
                {/* Instructions */}
                {recipe.instructions && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">{recipe.instructions}</p>
                    </div>
                  </div>
                )}
                
                {/* Ingredients */}
                {recipe.extendedIngredients && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                    <ul className="space-y-3">
                      {recipe.extendedIngredients.map((ingredient: any, index: number) => (
                        <li key={index} className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0" />
                          <span className="text-gray-700 text-lg">{ingredient.original}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Nutrition Info */}
              <div className="lg:col-span-1">
                {recipe.nutrition && <NutritionInfo nutrition={recipe.nutrition} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};