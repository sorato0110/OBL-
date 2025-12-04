import React, { useState, useEffect } from 'react';
import { Guide } from './components/Guide';
import { GoalInput } from './components/GoalInput';
import { GoalList } from './components/GoalList';
import { AICoach } from './components/AICoach';
import { Goal } from './types';

const App: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    // Basic persistence
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (text: string) => {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      text,
      status: 'focus', // Default to focus (brain dump phase)
      createdAt: Date.now(),
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const toggleStatus = (id: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        return {
          ...goal,
          status: goal.status === 'focus' ? 'excluded' : 'focus'
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (id: string) => {
    // Using a subtle confirmation to prevent accidental deletes
    if (window.confirm('この目標を削除しますか？')) {
      setGoals(prev => prev.filter(g => g.id !== id));
    }
  };

  const focusGoals = goals.filter(g => g.status === 'focus');
  const excludedGoals = goals.filter(g => g.status === 'excluded');

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Goal Focus Strategy
          </h1>
          <p className="text-gray-500">
            あなたのエネルギーを一点集中させるための「棚卸し」ツール
          </p>
        </header>

        <main>
          <Guide />
          
          <GoalInput onAdd={addGoal} />
          
          <AICoach 
            focusGoals={focusGoals} 
            excludedGoals={excludedGoals} 
          />

          <GoalList 
            goals={goals} 
            onToggle={toggleStatus} 
            onDelete={deleteGoal} 
          />
        </main>
        
        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Goal Focus Strategy. Inspired by the 25/5 Rule.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;