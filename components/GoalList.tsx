import React from 'react';
import { Goal } from '../types';
import { GoalItem } from './GoalItem';
import { Flame, Trash2, AlertTriangle } from 'lucide-react';

interface GoalListProps {
  goals: Goal[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GoalList: React.FC<GoalListProps> = ({ goals, onToggle, onDelete }) => {
  const focusGoals = goals.filter((g) => g.status === 'focus');
  const excludedGoals = goals.filter((g) => g.status === 'excluded');

  const isOverLimit = focusGoals.length > 2;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Focus Column */}
      <div className={`
        relative rounded-xl border-2 transition-colors duration-300 flex flex-col
        ${isOverLimit ? 'bg-white border-red-200 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'bg-white border-gray-100 shadow-sm'}
      `}>
        <div className="p-6 border-b border-gray-100 bg-white rounded-t-xl z-10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Flame className={`w-6 h-6 ${isOverLimit ? 'text-red-500 animate-pulse' : 'text-orange-500'}`} />
                集中する目標リスト
              </h2>
              {isOverLimit && (
                <div className="flex items-center gap-1 text-xs text-red-500 font-bold mt-1 bg-red-50 px-2 py-1 rounded w-fit">
                  <AlertTriangle className="w-3 h-3" />
                  目標は1〜2個に絞りましょう
                </div>
              )}
            </div>
            <span className={`
              px-3 py-1 rounded-full text-sm font-bold
              ${isOverLimit ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}
            `}>
              {focusGoals.length}
            </span>
          </div>
          <p className="text-sm text-gray-500">あなたの全エネルギーを注ぐべき最重要項目です。</p>
        </div>
        
        <div className="p-4 flex-1 bg-gray-50/50 rounded-b-xl min-h-[300px]">
          {focusGoals.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
              <p>まだ目標がありません</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {focusGoals.map(goal => (
                <GoalItem key={goal.id} goal={goal} onToggle={onToggle} onDelete={onDelete} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Exclusion Column */}
      <div className="rounded-xl bg-red-50/50 border-2 border-red-100 shadow-inner flex flex-col">
        <div className="p-6 border-b border-red-100/50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-red-800 flex items-center gap-2">
              <Trash2 className="w-6 h-6 text-red-700" />
              除外リスト
            </h2>
            <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
              {excludedGoals.length}
            </span>
          </div>
          <p className="text-sm text-red-600/80 font-medium">
            「良いアイデア」だが「今やるべきではない」もの。これらを完全に無視することで、集中リストの成功率が上がります。
          </p>
        </div>

        <div className="p-4 flex-1 min-h-[300px]">
          {excludedGoals.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-red-300 text-sm">
              <p>除外された項目はありません</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {excludedGoals.map(goal => (
                <GoalItem key={goal.id} goal={goal} onToggle={onToggle} onDelete={onDelete} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};