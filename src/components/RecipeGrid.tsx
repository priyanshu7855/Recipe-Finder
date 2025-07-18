import React from 'react';
import { RecipeCard } from './RecipeCard';

interface RecipeGridProps {
  recipes: any[];
  isLoading: boolean;
  onRecipeClick: (recipe: any) => void;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  isLoading,
  onRecipeClick
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
              <div className="flex justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try searching for different ingredients or adjusting your filters to discover new recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onRecipeClick={onRecipeClick}
        />
      ))}
    </div>
  );
};