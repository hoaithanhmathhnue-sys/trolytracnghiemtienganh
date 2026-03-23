import React from 'react';
import { TrendingUp, Award, Calendar, BarChart3, PieChart } from 'lucide-react';
import { AnalyticsData, DIFFICULTY_LABELS } from '../types';

interface ReportsPageProps {
    analytics: AnalyticsData;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ analytics }) => {
    const { totalQuizzes, totalQuestions, quizzesByDifficulty, quizzesByDate } = analytics;

    // Tính toán max count cho chart
    const maxCount = Math.max(...quizzesByDate.map(d => d.count), 1);

    // Màu sắc cho từng mức độ
    const difficultyColors: Record<string, string> = {
        nhan_biet: 'bg-blue-500',
        thong_hieu: 'bg-green-500',
        van_dung: 'bg-yellow-500',
        van_dung_cao: 'bg-red-500',
        hon_hop: 'bg-purple-500'
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-900 mb-2">Báo Cáo Sử Dụng</h2>
                <p className="text-lg text-slate-500">Thống kê và phân tích hoạt động của bạn</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Quizzes */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <Award className="w-6 h-6" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-3xl font-black mb-1">{totalQuizzes}</div>
                    <div className="text-sm text-blue-100 font-medium">Tổng Bài Kiểm Tra</div>
                </div>

                {/* Total Questions */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-3xl font-black mb-1">{totalQuestions}</div>
                    <div className="text-sm text-green-100 font-medium">Tổng Câu Hỏi</div>
                </div>

                {/* Average Questions */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <PieChart className="w-6 h-6" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-3xl font-black mb-1">
                        {totalQuizzes > 0 ? Math.round(totalQuestions / totalQuizzes) : 0}
                    </div>
                    <div className="text-sm text-purple-100 font-medium">TB Câu/Bài</div>
                </div>

                {/* This Week */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-3xl font-black mb-1">
                        {quizzesByDate.reduce((sum, d) => sum + d.count, 0)}
                    </div>
                    <div className="text-sm text-orange-100 font-medium">7 Ngày Qua</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Bar Chart - Tần suất tạo quiz theo ngày */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Tần Suất Tạo Quiz (7 ngày)
                    </h3>
                    <div className="space-y-3">
                        {quizzesByDate.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="text-xs font-bold text-slate-500 w-16">{item.date}</div>
                                <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden relative">
                                    <div
                                        className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full rounded-full flex items-center justify-end px-3 transition-all duration-500"
                                        style={{ width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%` }}
                                    >
                                        {item.count > 0 && (
                                            <span className="text-xs font-bold text-white">{item.count}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pie Chart - Phân bố mức độ */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-primary" />
                        Phân Bố Theo Mức Độ
                    </h3>
                    <div className="space-y-4">
                        {(Object.keys(quizzesByDifficulty) as Array<keyof typeof quizzesByDifficulty>).map((level) => {
                            const count = quizzesByDifficulty[level];
                            const percentage = totalQuizzes > 0 ? (count / totalQuizzes) * 100 : 0;

                            return (
                                <div key={level}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${difficultyColors[level]}`}></div>
                                            <span className="text-sm font-bold text-slate-700">
                                                {DIFFICULTY_LABELS[level]}
                                            </span>
                                        </div>
                                        <div className="text-sm font-bold text-slate-900">
                                            {count} ({percentage.toFixed(0)}%)
                                        </div>
                                    </div>
                                    <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full ${difficultyColors[level]} transition-all duration-500`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Thông Tin Chi Tiết</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4">
                        <div className="font-bold text-slate-700 mb-1">Mức độ phổ biến nhất</div>
                        <div className="text-primary text-lg font-black">
                            {Object.entries(quizzesByDifficulty).reduce((prev, curr) =>
                                curr[1] > prev[1] ? curr : prev, ['hon_hop', 0])[0] !== undefined
                                ? DIFFICULTY_LABELS[Object.entries(quizzesByDifficulty).reduce((prev, curr) =>
                                    curr[1] > prev[1] ? curr : prev, ['hon_hop', 0])[0] as keyof typeof DIFFICULTY_LABELS]
                                : 'Chưa có dữ liệu'}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="font-bold text-slate-700 mb-1">Ngày tạo nhiều nhất</div>
                        <div className="text-primary text-lg font-black">
                            {quizzesByDate.reduce((prev, curr) =>
                                curr.count > prev.count ? curr : prev, { date: 'Chưa có', count: 0 }).date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
