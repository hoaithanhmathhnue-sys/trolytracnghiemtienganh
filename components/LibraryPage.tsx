import React, { useState } from 'react';
import { Download, Trash2, Eye, Calendar, Award, Search, Filter } from 'lucide-react';
import { SavedQuiz, DIFFICULTY_LABELS } from '../types';
import { formatDate } from '../services/storageService';
import QuizPreview from './QuizPreview';
import { HTML_TEMPLATE, EXPORT_FILENAME } from '../constants';

interface LibraryPageProps {
    savedQuizzes: SavedQuiz[];
    onDelete: (id: string) => void;
    onReload: (quiz: SavedQuiz) => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ savedQuizzes, onDelete, onReload }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuiz, setSelectedQuiz] = useState<SavedQuiz | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleDownloadQuiz = (quiz: SavedQuiz) => {
        const jsonString = JSON.stringify(quiz.questions);
        let finalHtml = HTML_TEMPLATE
            .replace('// {{DATA_PLACEHOLDER}}', jsonString)
            .replace('{{TIMER_SECONDS}}', String(quiz.settings.timerSeconds))
            .replace('{{ENABLE_SOUND}}', String(quiz.settings.enableSound));

        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${quiz.name}.html` || EXPORT_FILENAME;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const filteredQuizzes = savedQuizzes.filter(quiz =>
        quiz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-900 mb-2">Thư Viện Của Tôi</h2>
                <p className="text-lg text-slate-500">Quản lý tất cả các bài kiểm tra đã lưu</p>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
                <div className="flex gap-4 items-center">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm kiếm theo tên hoặc chủ đề..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Filter className="w-4 h-4" />
                        <span className="font-bold">{filteredQuizzes.length} kết quả</span>
                    </div>
                </div>
            </div>

            {/* Quiz Grid */}
            {filteredQuizzes.length === 0 ? (
                <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
                    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">
                        {searchTerm ? 'Không tìm thấy kết quả' : 'Chưa có quiz nào'}
                    </h3>
                    <p className="text-slate-500">
                        {searchTerm ? 'Thử từ khóa khác' : 'Tạo quiz mới và lưu vào thư viện'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                        >
                            {/* Quiz Header */}
                            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 border-b border-slate-100">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="bg-primary/10 px-2 py-1 rounded-md">
                                        <span className="text-xs font-bold text-primary uppercase">
                                            {DIFFICULTY_LABELS[quiz.difficultyLevel]}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <Calendar className="w-3 h-3" />
                                        <span className="text-xs">{formatDate(quiz.createdAt).split(',')[0]}</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg line-clamp-2 mb-1">
                                    {quiz.name}
                                </h3>
                                <p className="text-sm text-slate-600 line-clamp-1">{quiz.topic}</p>
                            </div>

                            {/* Quiz Stats */}
                            <div className="p-4 space-y-3">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-slate-50 rounded-lg p-2">
                                        <div className="text-slate-500 text-xs">Câu hỏi</div>
                                        <div className="font-bold text-slate-900">{quiz.questionCount}</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-2">
                                        <div className="text-slate-500 text-xs">Thời gian</div>
                                        <div className="font-bold text-slate-900">
                                            {quiz.settings.enableTimer
                                                ? `${Math.floor(quiz.settings.timerSeconds / 60)}p`
                                                : 'Không giới hạn'}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => {
                                            setSelectedQuiz(quiz);
                                            setShowPreview(true);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-bold text-sm transition-all"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Xem
                                    </button>
                                    <button
                                        onClick={() => handleDownloadQuiz(quiz)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg font-bold text-sm transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Tải
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm(`Xóa "${quiz.name}"?`)) {
                                                onDelete(quiz.id);
                                            }
                                        }}
                                        className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold text-sm transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Preview Modal */}
            {showPreview && selectedQuiz && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">{selectedQuiz.name}</h3>
                                <p className="text-sm text-slate-500">{selectedQuiz.topic}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowPreview(false);
                                    setSelectedQuiz(null);
                                }}
                                className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
                            <QuizPreview questions={selectedQuiz.questions} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LibraryPage;
