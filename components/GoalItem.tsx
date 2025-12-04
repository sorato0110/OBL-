import React from 'react';
import { ArrowRight, RotateCcw, X, Trash2 } from 'lucide-react';
import { Goal } from '../types';

interface GoalItemProps {
  goal: Goal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GoalItem: React.FC<GoalItemProps> = ({ goal, onToggle, onDelete }) => {
  const isFocus = goal.status === 'focus';

  return (
    <li
      className={`
        group flex items-center justify-between p-4 mb-3 rounded-lg border transition-all duration-200
        ${isFocus 
          ? 'bg-white border-gray-200 hover:shadow-md hover:border-blue-200' 
          : 'bg-white/60 border-red-100 hover:bg-white hover:shadow-sm'
        }
      `}
    >
      <span className={`font-medium text-gray-800 flex-1 mr-4 ${!isFocus ? 'text-gray-500 line-through decoration-red-200' : ''}`}>
        {goal.text}
      </span>
      
      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onToggle(goal.id)}
          className={`
            flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-colors
            ${isFocus
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
            }
          `}
        >
          {isFocus ? (
            <>
              除外する <ArrowRight className="w-3 h-3" />
            </>
          ) : (
            <>
              <RotateCcw className="w-3 h-3" /> 戻す
            </>
          )}
        </button>
        
        <button
          onClick={() => onDelete(goal.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          aria-label="削除"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};