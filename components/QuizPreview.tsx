import React from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, AlertCircle, Hash, HelpCircle, FileText, Sparkles } from 'lucide-react';

interface QuizPreviewProps {
  questions: QuizQuestion[];
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ questions }) => {
  if (questions.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded text-primary">
                <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wide">Quiz Preview</h3>
        </div>
        <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 bg-teal-50 px-3 py-1.5 rounded-full text-xs font-bold text-primary border border-teal-100">
                <Sparkles className="w-3 h-3" />
                {questions.length} Questions Generated
            </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative group hover:border-primary/50 transition-colors">
             <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                <span className="material-symbols-outlined text-xl">drag_indicator</span>
             </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="size-8 bg-primary text-white text-xs font-bold flex items-center justify-center rounded-full shadow-lg shadow-teal-600/20">
                    {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-bold py-1 px-3 uppercase tracking-wider">
                    {q.type === 'mcq' && "Multiple Choice"}
                    {q.type === 'tf' && "True / False"}
                    {q.type === 'short' && "Short Answer"}
                </span>
                <span className="text-xs text-slate-400 font-medium italic">Topic: {q.topic}</span>
              </div>
            </div>

            <div className="space-y-4 ml-12">
              <div>
                <h4 className="text-slate-800 font-medium text-lg leading-relaxed">{q.question}</h4>
              </div>

              {/* MCQ Options */}
              {q.type === 'mcq' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    {q.options?.map((opt, i) => (
                        <div key={i} className={`relative flex items-center p-3 rounded-lg border-2 transition-all ${i === q.correct ? 'border-primary bg-teal-50/50' : 'border-slate-100 bg-white'}`}>
                            <div className={`size-6 rounded flex items-center justify-center text-xs font-bold mr-3 ${i === q.correct ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                                {String.fromCharCode(65 + i)}
                            </div>
                            <span className={`text-sm ${i === q.correct ? 'font-semibold text-primary-dark' : 'text-slate-600'}`}>{opt}</span>
                            {i === q.correct && <span className="material-symbols-outlined absolute right-3 text-primary text-lg">check_circle</span>}
                        </div>
                    ))}
                </div>
              )}

              {/* TF Options */}
              {q.type === 'tf' && (
                  <div className="flex gap-4 mt-3">
                      <div className={`flex-1 py-3 px-4 rounded-lg border-2 text-center text-sm font-bold ${q.correct === true ? 'border-primary bg-teal-50 text-primary' : 'border-slate-200 text-slate-400 opacity-50'}`}>True</div>
                      <div className={`flex-1 py-3 px-4 rounded-lg border-2 text-center text-sm font-bold ${q.correct === false ? 'border-primary bg-teal-50 text-primary' : 'border-slate-200 text-slate-400 opacity-50'}`}>False</div>
                  </div>
              )}

              {/* Short Answer */}
              {q.type === 'short' && (
                  <div className="mt-3">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-bold">
                          <Hash className="w-4 h-4"/> Correct Answer: {String(q.correct)}
                      </div>
                  </div>
              )}
              
              <div className="pt-4 mt-2 border-t border-slate-50">
                <div className="flex gap-2 text-slate-500 text-sm italic items-start">
                    <span className="material-symbols-outlined text-lg text-amber-400">lightbulb</span>
                    <span>{q.explain}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPreview;