import React, { useState, useRef, useEffect } from 'react';
import {
    PlusCircle,
    Library,
    BarChart3,
    Settings as SettingsIcon,
    LifeBuoy,
    Upload,
    FileText,
    Sparkles,
    Loader2,
    Download,
    Trash2,
    Search,
    Clock,
    Volume2,
    VolumeX,
    BookOpen,
    X,
    Save,
    Gamepad2
} from 'lucide-react';
import { generateQuizData } from './services/geminiService';
import { QuizQuestion, GenerationStatus, DifficultyLevel, DIFFICULTY_LABELS, SavedQuiz, PageType, AppSettings, AnalyticsData, GameTheme, GAME_THEME_LABELS, SourceMode, SOURCE_MODE_LABELS } from './types';
import { HTML_TEMPLATE, EXPORT_FILENAME } from './constants';
import { getGameTemplate } from './services/gameTemplates';
import QuizPreview from './components/QuizPreview';
import LibraryPage from './components/LibraryPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import SupportPage from './components/SupportPage';
import * as storageService from './services/storageService';

const App: React.FC = () => {
    // State
    const [topic, setTopic] = useState('');
    const [questionCount, setQuestionCount] = useState(10);
    const [files, setFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<GenerationStatus>('idle');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [errorMsg, setErrorMsg] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Page navigation
    const [currentPage, setCurrentPage] = useState<PageType>('create');

    // Quiz settings
    const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('hon_hop');
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [enableSound, setEnableSound] = useState(true);
    const [gameTheme, setGameTheme] = useState<GameTheme>('classic');
    const [sourceMode, setSourceMode] = useState<SourceMode>('creative'); // Chế độ lấy câu hỏi

    // Library & History
    const [savedQuizzes, setSavedQuizzes] = useState<SavedQuiz[]>([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [quizName, setQuizName] = useState('');

    // API Key & Settings
    const [apiKey, setApiKey] = useState('');
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const [appSettings, setAppSettings] = useState<AppSettings>(storageService.getSettings());

    // Analytics
    const [analytics, setAnalytics] = useState<AnalyticsData>(storageService.getAnalytics());

    // Load data on mount
    useEffect(() => {
        setSavedQuizzes(storageService.getQuizzes());
        const settings = storageService.getSettings();
        setAppSettings(settings);

        // Apply default settings
        setDifficultyLevel(settings.defaultDifficulty);
        setTimerMinutes(settings.defaultTimer);
        setEnableSound(settings.defaultSound);

        // Check API key
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) {
            setApiKey(savedKey);
        } else {
            setShowApiKeyModal(true); // Hiển thị modal bắt buộc nhập key
        }
    }, []);

    // Refresh analytics when page changes to reports
    useEffect(() => {
        if (currentPage === 'reports') {
            setAnalytics(storageService.getAnalytics());
        }
    }, [currentPage]);

    // Handlers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const removeFile = (idx: number) => {
        setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    const handleGenerate = async () => {
        if (!topic && files.length === 0) {
            setErrorMsg("Vui lòng nhập chủ đề hoặc tải lên tài liệu.");
            return;
        }

        setErrorMsg('');
        setStatus('generating');
        setQuestions([]);

        try {
            const data = await generateQuizData(topic, files, questionCount, difficultyLevel, sourceMode);
            setQuestions(data);
            setStatus('success');

            // Tự động lưu vào lịch sử
            const settings = { enableTimer: timerMinutes > 0, timerSeconds: timerMinutes * 60, enableSound };
            storageService.saveQuizToHistory(topic || 'Không có chủ đề', data, settings, difficultyLevel);
            setAnalytics(storageService.getAnalytics()); // Cập nhật analytics
        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || "Không thể tạo câu hỏi. Vui lòng thử lại.");
            setStatus('error');
        }
    };

    const handleSaveToLibrary = () => {
        if (!quizName.trim()) {
            alert('Vui lòng nhập tên bài kiểm tra');
            return;
        }
        const settings = { enableTimer: timerMinutes > 0, timerSeconds: timerMinutes * 60, enableSound };
        storageService.saveQuiz(quizName, topic || 'Không có chủ đề', questions, settings, difficultyLevel);
        setSavedQuizzes(storageService.getQuizzes());
        setAnalytics(storageService.getAnalytics());
        setShowSaveModal(false);
        setQuizName('');
        alert('Đã lưu vào thư viện!');
    };

    const handleDownload = () => {
        const jsonString = JSON.stringify(questions);

        // Chọn template dựa trên gameTheme
        let finalHtml: string;
        if (gameTheme === 'classic') {
            // Sử dụng template cơ bản hiện tại
            finalHtml = HTML_TEMPLATE
                .replace('{{DATA_PLACEHOLDER}}', jsonString)
                .replace('{{TIMER_SECONDS}}', String(timerMinutes * 60))
                .replace('{{ENABLE_SOUND}}', String(enableSound));
        } else {
            // Sử dụng game template mới
            finalHtml = getGameTemplate(gameTheme)
                .replace('{{DATA_PLACEHOLDER}}', jsonString)
                .replace('{{TIMER_SECONDS}}', String(timerMinutes * 60))
                .replace('{{ENABLE_SOUND}}', String(enableSound));
        }

        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quiz-${gameTheme}-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDeleteQuiz = (id: string) => {
        storageService.deleteQuiz(id);
        setSavedQuizzes(storageService.getQuizzes());
        setAnalytics(storageService.getAnalytics());
    };

    const handleSaveSettings = (settings: AppSettings) => {
        storageService.saveSettings(settings);
        setAppSettings(settings);
        // Áp dụng cài đặt mặc định
        setDifficultyLevel(settings.defaultDifficulty);
        setTimerMinutes(settings.defaultTimer);
        setEnableSound(settings.defaultSound);
    };

    const handleSaveApiKey = (key: string) => {
        localStorage.setItem('gemini_api_key', key.trim());
        setApiKey(key.trim());
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background-light font-display text-slate-800">

            {/* Sidebar */}
            <aside className="w-64 flex flex-col border-r border-slate-200 bg-white hidden md:flex">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary rounded-lg p-2 text-white shadow-lg shadow-teal-600/20">
                            <span className="material-symbols-outlined text-2xl">school</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight text-slate-900">English QuizGen AI</h1>
                            <p className="text-xs text-slate-500 font-medium">For HS Teachers / Dành cho GV THPT</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <button
                            onClick={() => setCurrentPage('create')}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all ${currentPage === 'create'
                                ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent'
                                }`}
                        >
                            <PlusCircle size={20} />
                            <span>Create / Tạo mới</span>
                        </button>
                        <button
                            onClick={() => setCurrentPage('library')}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all ${currentPage === 'library'
                                ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent'
                                }`}
                        >
                            <Library size={20} />
                            <span>Library / Thư viện</span>
                        </button>
                        <button
                            onClick={() => setCurrentPage('reports')}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all ${currentPage === 'reports'
                                ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent'
                                }`}
                        >
                            <BarChart3 size={20} />
                            <span>Reports / Báo cáo</span>
                        </button>
                        <div className="my-4 border-t border-slate-100"></div>
                        <button
                            onClick={() => setCurrentPage('settings')}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all ${currentPage === 'settings'
                                ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent'
                                }`}
                        >
                            <SettingsIcon size={20} />
                            <span>Settings / Cài đặt</span>
                        </button>
                        <button
                            onClick={() => setCurrentPage('support')}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all ${currentPage === 'support'
                                ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent'
                                }`}
                        >
                            <LifeBuoy size={20} />
                            <span>Support / Hỗ trợ</span>
                        </button>
                    </nav>
                </div>

            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-slate-50/50">
                {/* Render page theo currentPage */}
                {currentPage === 'library' && (
                    <LibraryPage
                        savedQuizzes={savedQuizzes}
                        onDelete={handleDeleteQuiz}
                        onReload={(quiz) => {
                            setTopic(quiz.topic);
                            setQuestions(quiz.questions);
                            setDifficultyLevel(quiz.difficultyLevel);
                            setTimerMinutes(quiz.settings.enableTimer ? quiz.settings.timerSeconds / 60 : 0);
                            setEnableSound(quiz.settings.enableSound);
                            setStatus('success');
                            setCurrentPage('create');
                        }}
                    />
                )}

                {currentPage === 'reports' && (
                    <ReportsPage analytics={analytics} />
                )}

                {currentPage === 'settings' && (
                    <SettingsPage
                        settings={appSettings}
                        apiKey={apiKey}
                        onSaveSettings={handleSaveSettings}
                        onSaveApiKey={handleSaveApiKey}
                    />
                )}

                {currentPage === 'support' && (
                    <SupportPage />
                )}

                {/* Create Quiz Page */}
                {currentPage === 'create' && (
                    <div className="max-w-6xl mx-auto px-6 py-8 md:px-10 md:py-10">
                        {/* Header */}
                        <div className="flex justify-between items-end mb-10">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Welcome, Teacher! <span className="text-2xl font-semibold text-slate-400">/ Xin chào, Thầy/Cô!</span></h2>
                                <p className="text-lg text-slate-500 leading-relaxed font-sans">
                                    Transform your English teaching materials into interactive quiz games instantly.<br/>
                                    <span className="text-base text-slate-400">Tạo trò chơi trắc nghiệm tiếng Anh tương tác từ tài liệu bài giảng.</span>
                                </p>
                            </div>
                            {/* API Key Settings Button */}
                            <button
                                onClick={() => setShowApiKeyModal(true)}
                                className="flex flex-col items-end gap-1"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm">
                                    <SettingsIcon className="w-5 h-5 text-blue-600" />
                                    <span className="font-bold text-slate-700">API Key</span>
                                    {apiKey && (
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    )}
                                </div>
                                <a
                                    href="https://aistudio.google.com/apikey"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-red-500 hover:text-red-600 hover:underline font-semibold"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Get API key to use the app / Lấy API key →
                                </a>
                            </button>
                        </div>

                        {/* Generator Section (Split View) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                            {/* LEFT: Input Configuration */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative flex flex-col p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">

                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="size-12 bg-teal-50 rounded-full flex items-center justify-center">
                                                <Sparkles className="text-primary w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">Create New Quiz <span className="text-sm font-normal text-slate-400">/ Tạo bài mới</span></h3>
                                                <p className="text-sm text-slate-500">AI-powered English content extraction / Trích xuất bằng AI</p>
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            {/* Topic Input */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Topic / Chủ đề</label>
                                                <input
                                                    type="text"
                                                    value={topic}
                                                    onChange={(e) => setTopic(e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans"
                                                    placeholder="E.g: Present Perfect Tense, Reported Speech, Unit 3 - Global Success 11..."
                                                />
                                            </div>

                                            {/* Question Count */}
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Questions / Số câu</label>
                                                    <span className="text-xs font-bold text-primary bg-teal-50 px-2 py-0.5 rounded">{questionCount} Questions</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="1" max="20"
                                                    value={questionCount}
                                                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>

                                            {/* File Upload Area */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Source Materials / Tài liệu nguồn</label>

                                                {files.length > 0 && (
                                                    <div className="space-y-2 mb-3">
                                                        {files.map((f, i) => (
                                                            <div key={i} className="flex items-center justify-between bg-teal-50 border border-teal-100 p-2.5 rounded-lg text-sm text-teal-900">
                                                                <div className="flex items-center gap-2 truncate">
                                                                    <FileText className="w-4 h-4 text-primary" />
                                                                    <span className="truncate max-w-[150px]">{f.name}</span>
                                                                </div>
                                                                <button onClick={() => removeFile(i)} className="text-teal-400 hover:text-red-500 transition-colors">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-teal-50/50 transition-all group/upload"
                                                >
                                                    <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf,.txt,.md" />
                                                    <div className="bg-slate-100 p-3 rounded-full mb-3 group-hover/upload:scale-110 transition-transform">
                                                        <Upload className="w-6 h-6 text-slate-400 group-hover/upload:text-primary" />
                                                    </div>
                                                    <p className="text-sm font-bold text-slate-600 mb-1">Click to upload / Nhấn tải tài liệu lên</p>
                                                    <p className="text-xs text-slate-400">PDF, TXT, Images (Max 10MB)</p>
                                                </div>

                                                {/* Chế độ lấy câu hỏi - chỉ hiển thị khi có file */}
                                                {files.length > 0 && (
                                                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Source Mode / Chế độ lấy câu hỏi</p>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setSourceMode('strict')}
                                                                className={`p-3 rounded-lg border-2 transition-all text-left ${sourceMode === 'strict'
                                                                        ? 'border-blue-500 bg-blue-50 shadow-md'
                                                                        : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-lg">📋</span>
                                                                    <span className={`text-sm font-bold ${sourceMode === 'strict' ? 'text-blue-700' : 'text-slate-700'}`}>
                                                                        Strict / Nghiêm ngặt
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-slate-500">Exact from document / Chính xác từ tài liệu</p>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setSourceMode('creative')}
                                                                className={`p-3 rounded-lg border-2 transition-all text-left ${sourceMode === 'creative'
                                                                        ? 'border-purple-500 bg-purple-50 shadow-md'
                                                                        : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-lg">✨</span>
                                                                    <span className={`text-sm font-bold ${sourceMode === 'creative' ? 'text-purple-700' : 'text-slate-700'}`}>
                                                                        Creative / Sáng tạo
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-slate-500">Change context & data / Thay đổi bối cảnh</p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mức độ câu hỏi */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Difficulty Level / Mức độ câu hỏi</label>
                                                <select
                                                    value={difficultyLevel}
                                                    onChange={(e) => setDifficultyLevel(e.target.value as DifficultyLevel)}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans"
                                                >
                                                    <option value="nhan_biet">📘 Recognition / Nhận biết</option>
                                                    <option value="thong_hieu">📗 Comprehension / Thông hiểu</option>
                                                    <option value="van_dung">📙 Application / Vận dụng</option>
                                                    <option value="van_dung_cao">📕 Advanced Application / Vận dụng cao</option>
                                                    <option value="hon_hop">🌈 Mixed Levels / Hỗn hợp</option>
                                                </select>
                                            </div>

                                            {/* Giao diện Game */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                    <Gamepad2 className="w-3 h-3 inline mr-1" />
                                                    Game Theme / Giao diện Game
                                                </label>
                                                <select
                                                    value={gameTheme}
                                                    onChange={(e) => setGameTheme(e.target.value as GameTheme)}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-sans"
                                                >
                                                    <option value="classic">🎯 Classic Game Show / Cơ bản</option>
                                                    <option value="space">🚀 Space Defender / Bắn Phi Thuyền</option>
                                                    <option value="quiz_show">🏆 Who Wants to Be a Millionaire / Ai Là Triệu Phú</option>
                                                    <option value="rpg">⚔️ RPG Adventure / Dũng Sĩ Diệt Rồng</option>
                                                    <option value="racing">🏎️ Speed Racer / Đua Xe Tốc Độ</option>
                                                    <option value="treasure">💎 Treasure Hunt / Săn Kho Báu</option>
                                                </select>
                                                <p className="text-xs text-slate-400 mt-1">Select theme for HTML export / Chọn giao diện xuất file</p>
                                            </div>

                                            {/* Timer và Sound settings */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                        <Clock className="w-3 h-3 inline mr-1" />
                                                        Timer (min) / Thời gian
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="60"
                                                        value={timerMinutes}
                                                        onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                                        placeholder="0 = No limit"
                                                    />
                                                    <p className="text-xs text-slate-400 mt-1">0 = No limit / Không giới hạn</p>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                                        {enableSound ? <Volume2 className="w-3 h-3 inline mr-1" /> : <VolumeX className="w-3 h-3 inline mr-1" />}
                                                        Sound / Âm thanh
                                                    </label>
                                                    <button
                                                        onClick={() => setEnableSound(!enableSound)}
                                                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${enableSound
                                                            ? 'bg-teal-100 text-teal-700 border-2 border-teal-300'
                                                            : 'bg-slate-100 text-slate-500 border-2 border-slate-300'
                                                            }`}
                                                    >
                                                        {enableSound ? '🔊 On / Bật' : '🔇 Off / Tắt'}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <button
                                                onClick={handleGenerate}
                                                disabled={status === 'generating'}
                                                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-teal-600/20 hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {status === 'generating' ? (
                                                    <>
                                                        <Loader2 className="animate-spin w-5 h-5" />
                                                        Generating... / Đang xử lý...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-5 h-5" />
                                                        Generate AI Quiz / Tạo câu hỏi AI
                                                    </>
                                                )}
                                            </button>

                                            {errorMsg && (
                                                <p className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100 text-center font-bold">
                                                    {errorMsg}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Download Action (Visible only on success) */}
                                {status === 'success' && questions.length > 0 && (
                                    <div className="bg-green-50 border border-green-200 p-4 rounded-xl animate-in fade-in slide-in-from-top-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="bg-green-100 p-2 rounded-lg text-green-700">
                                                <span className="material-symbols-outlined">check_circle</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-green-900 text-sm">Ready to export / Sẵn sàng xuất file</h4>
                                                <p className="text-xs text-green-700">HTML file ready for offline use / File HTML sẵn sàng dùng offline.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setShowSaveModal(true)}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save to Library / Lưu
                                            </button>
                                            <button
                                                onClick={handleDownload}
                                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download App / Tải về
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* RIGHT: Content Area / Preview */}
                            <div className="lg:col-span-7 h-full flex flex-col">
                                {status === 'success' && questions.length > 0 ? (
                                    <div className="h-full min-h-[600px] animate-in slide-in-from-right-8 duration-500">
                                        <QuizPreview questions={questions} />
                                    </div>
                                ) : (
                                    // Empty State / Recent Quizzes Placeholder
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-slate-900">Recent Quizzes <span className="text-base font-normal text-slate-400">/ Bài gần đây</span></h3>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                                <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary w-48 transition-all" />
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-8 text-center">
                                            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Sparkles className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-700 mb-2">Create your first English quiz! <span className="text-base font-normal text-slate-400">/ Tạo bài kiểm tra đầu tiên</span></h4>
                                            <p className="text-sm text-slate-500 mb-4">
                                                Enter a topic or upload materials, then click "Generate AI Quiz"<br/><span className="text-slate-400">Nhập chủ đề hoặc tải tài liệu, rồi nhấn "Generate AI Quiz"</span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}


            </main>

            {/* Save to Library Modal */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <BookOpen className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Lưu vào Thư viện</h3>
                            </div>
                            <button onClick={() => setShowSaveModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Tên bài kiểm tra</label>
                                <input
                                    type="text"
                                    value={quizName}
                                    onChange={(e) => setQuizName(e.target.value)}
                                    placeholder="Ví dụ: Kiểm tra 15 phút - Sinh học"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all"
                                    autoFocus
                                />
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Số câu:</span>
                                    <span className="font-bold text-slate-900">{questions.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Mức độ:</span>
                                    <span className="font-bold text-slate-900">{DIFFICULTY_LABELS[difficultyLevel]}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Thời gian:</span>
                                    <span className="font-bold text-slate-900">{timerMinutes > 0 ? `${timerMinutes} phút` : 'Không giới hạn'}</span>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowSaveModal(false)}
                                    className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSaveToLibrary}
                                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30"
                                >
                                    Lưu ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* API Key Modal */}
            {showApiKeyModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5 text-white">
                            <h3 className="text-2xl font-bold">🔑 Cài Đặt API Key</h3>
                            <p className="text-blue-100 text-sm mt-1">Nhập Google Gemini API Key để sử dụng ứng dụng</p>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Input */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">API Key của bạn</label>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Nhập API key tại đây..."
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all font-mono text-sm"
                                    autoFocus
                                />
                            </div>

                            {/* Instructions */}
                            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-3">
                                <p className="text-sm font-bold text-amber-900">📖 Hướng dẫn lấy API Key:</p>
                                <div className="space-y-2">
                                    <a
                                        href="https://aistudio.google.com/apikey"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold bg-blue-50 px-3 py-2 rounded-lg"
                                    >
                                        <span className="text-lg">1️⃣</span>
                                        Truy cập Google AI Studio để lấy API Key
                                    </a>
                                    <a
                                        href="https://tinyurl.com/hdsdpmTHT"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-semibold bg-green-50 px-3 py-2 rounded-lg"
                                    >
                                        <span className="text-lg">📺</span>
                                        Xem video hướng dẫn chi tiết
                                    </a>
                                </div>
                                <p className="text-xs text-amber-700">⚠️ API Key miễn phí, nhưng có giới hạn quota (hết quota sẽ tự động chuyển model dự phòng)</p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                {apiKey && (
                                    <button
                                        onClick={() => setShowApiKeyModal(false)}
                                        className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
                                    >
                                        Hủy
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (apiKey.trim()) {
                                            localStorage.setItem('gemini_api_key', apiKey.trim());
                                            setShowApiKeyModal(false);
                                            alert('✅ Đã lưu API Key thành công!');
                                        } else {
                                            alert('❌ Vui lòng nhập API Key!');
                                        }
                                    }}
                                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30"
                                >
                                    Lưu API Key
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
