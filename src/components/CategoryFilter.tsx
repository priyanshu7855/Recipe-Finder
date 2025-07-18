import React from 'react';
import { Sunrise, Sun, Moon, Utensils } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Recipes', icon: Utensils },
  { id: 'breakfast', name: 'Breakfast', icon: Sunrise },
  { id: 'lunch', name: 'Lunch', icon: Sun },
  { id: 'dinner', name: 'Dinner', icon: Moon },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              isActive
                ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};