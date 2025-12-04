import React from 'react';
import { BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Guide: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        ステップ1：目標を「棚卸し」し、「除外リスト」を作成
      </h1>
      <div className="space-y-3 text-gray-700">
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-blue-100 p-1 rounded text-blue-600">
            <span className="font-bold text-sm">1</span>
          </div>
          <p>
            <strong>書き出す：</strong> 仕事、プライベート、学習など、思いつく限りの目標やタスクを入力して追加してください。
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-blue-100 p-1 rounded text-blue-600">
            <span className="font-bold text-sm">2</span>
          </div>
          <p>
            <strong>絞り込む：</strong> 「今のリソースでは無理」「優先度が低い」ものは
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-semibold mx-1 text-sm border border-blue-100">除外する</span>
            ボタンを押してください。
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 bg-blue-100 p-1 rounded text-blue-600">
            <span className="font-bold text-sm">3</span>
          </div>
          <p>
            <strong>フォーカス：</strong> 本当に取り組むべき
            <span className="bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded-md font-semibold mx-1 border border-yellow-200">1つか2つの重要な目標</span>
            だけを左側に残しましょう。
          </p>
        </div>
      </div>
    </div>
  );
};