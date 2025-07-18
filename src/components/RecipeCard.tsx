import React, { useState } from 'react';
import { Clock, Users, Heart, Star, TrendingUp } from 'lucide-react';

interface RecipeCardProps {
  recipe: any;
  onRecipeClick: (recipe: any) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onRecipeClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      onClick={() => onRecipeClick(recipe)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] bg-gray-100">
          <img
            src={recipe.image}
            alt={recipe.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Like button */}
        <button
          onClick={handleLikeClick}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
          />
        </button>
        
        {/* Health Score Badge */}
        {recipe.healthScore && (
          <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            {recipe.healthScore}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.summary?.replace(/<[^>]*>/g, '') || 'Delicious recipe to try at home'}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
          {recipe.spoonacularScore && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>{Math.round(recipe.spoonacularScore)}</span>
            </div>
          )}
        </div>
        
        {/* Nutrition Preview */}
        {recipe.nutrition?.nutrients && (
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
            {recipe.nutrition.nutrients.slice(0, 2).map((nutrient: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {Math.round(nutrient.amount)}
                  <span className="text-xs text-gray-500 ml-1">{nutrient.unit}</span>
                </div>
                <div className="text-xs text-gray-500">{nutrient.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};