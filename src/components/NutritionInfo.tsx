import React from 'react';
import { TrendingUp, Activity, Zap } from 'lucide-react';

interface NutritionInfoProps {
  nutrition: any;
}

export const NutritionInfo: React.FC<NutritionInfoProps> = ({ nutrition }) => {
  if (!nutrition?.nutrients) return null;

  const mainNutrients = nutrition.nutrients.slice(0, 4);
  const { caloricBreakdown } = nutrition;

  const getNutrientColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'calories': return 'text-orange-600 bg-orange-100';
      case 'protein': return 'text-blue-600 bg-blue-100';
      case 'fat': return 'text-purple-600 bg-purple-100';
      case 'carbohydrates': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBreakdownColor = (type: string) => {
    switch (type) {
      case 'protein': return 'bg-blue-500';
      case 'fat': return 'bg-purple-500';
      case 'carbs': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-gray-900">Nutrition Information</h3>
      </div>

      {/* Main Nutrients */}
      <div className="grid grid-cols-2 gap-4">
        {mainNutrients.map((nutrient: any, index: number) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getNutrientColor(nutrient.name)} mb-2`}>
              {nutrient.name === 'Calories' && <Zap className="h-6 w-6" />}
              {nutrient.name === 'Protein' && <TrendingUp className="h-6 w-6" />}
              {nutrient.name === 'Fat' && <Activity className="h-6 w-6" />}
              {nutrient.name === 'Carbohydrates' && <Activity className="h-6 w-6" />}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(nutrient.amount)}
              <span className="text-sm text-gray-500 ml-1">{nutrient.unit}</span>
            </div>
            <div className="text-sm text-gray-600">{nutrient.name}</div>
            <div className="text-xs text-gray-500">
              {nutrient.percentOfDailyNeeds}% DV
            </div>
          </div>
        ))}
      </div>

      {/* Caloric Breakdown */}
      {caloricBreakdown && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Caloric Breakdown</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Protein</span>
              <span className="font-medium">{Math.round(caloricBreakdown.percentProtein)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getBreakdownColor('protein')}`}
                style={{ width: `${caloricBreakdown.percentProtein}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Fat</span>
              <span className="font-medium">{Math.round(caloricBreakdown.percentFat)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getBreakdownColor('fat')}`}
                style={{ width: `${caloricBreakdown.percentFat}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Carbs</span>
              <span className="font-medium">{Math.round(caloricBreakdown.percentCarbs)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getBreakdownColor('carbs')}`}
                style={{ width: `${caloricBreakdown.percentCarbs}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};