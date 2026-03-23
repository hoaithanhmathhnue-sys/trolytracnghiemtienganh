import { SavedQuiz, QuizQuestion, QuizSettings, DifficultyLevel, QuizHistory, AppSettings, AnalyticsData } from '../types';

const STORAGE_KEY = 'quizgen_library';
const HISTORY_KEY = 'quizgen_history';
const SETTINGS_KEY = 'quizgen_settings';

// Lấy tất cả quiz đã lưu
export const getQuizzes = (): SavedQuiz[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
};

// Lưu quiz mới
export const saveQuiz = (
    name: string,
    topic: string,
    questions: QuizQuestion[],
    settings: QuizSettings,
    difficultyLevel: DifficultyLevel
): SavedQuiz => {
    const quizzes = getQuizzes();

    const newQuiz: SavedQuiz = {
        id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        topic,
        questions,
        settings,
        difficultyLevel,
        createdAt: new Date().toISOString(),
        questionCount: questions.length
    };

    quizzes.unshift(newQuiz); // Thêm vào đầu danh sách
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));

    return newQuiz;
};

// Lấy quiz theo ID
export const getQuizById = (id: string): SavedQuiz | null => {
    const quizzes = getQuizzes();
    return quizzes.find(q => q.id === id) || null;
};

// Xóa quiz
export const deleteQuiz = (id: string): boolean => {
    try {
        const quizzes = getQuizzes();
        const filtered = quizzes.filter(q => q.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting quiz:', error);
        return false;
    }
};

// Cập nhật quiz
export const updateQuiz = (id: string, updates: Partial<SavedQuiz>): boolean => {
    try {
        const quizzes = getQuizzes();
        const index = quizzes.findIndex(q => q.id === id);
        if (index === -1) return false;

        quizzes[index] = { ...quizzes[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
        return true;
    } catch (error) {
        console.error('Error updating quiz:', error);
        return false;
    }
};

// Format ngày hiển thị
export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// ============ QUIZ HISTORY (Tự động lưu lịch sử) ============

export const getQuizHistory = (): QuizHistory[] => {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        if (!data) return [];
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading history:', error);
        return [];
    }
};

export const saveQuizToHistory = (
    topic: string,
    questions: QuizQuestion[],
    settings: QuizSettings,
    difficultyLevel: DifficultyLevel
): void => {
    const history = getQuizHistory();
    const newEntry: QuizHistory = {
        id: `history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        topic,
        questionCount: questions.length,
        difficultyLevel,
        createdAt: new Date().toISOString(),
        questions,
        settings
    };

    history.unshift(newEntry);

    // Giới hạn lịch sử tối đa 50 mục
    if (history.length > 50) {
        history.splice(50);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const clearQuizHistory = (): void => {
    localStorage.removeItem(HISTORY_KEY);
};

// ============ APP SETTINGS ============

export const getSettings = (): AppSettings => {
    try {
        const data = localStorage.getItem(SETTINGS_KEY);
        if (!data) {
            // Cài đặt mặc định
            return {
                defaultModel: 'gemini-2.0-flash-exp',
                defaultTimer: 0,
                defaultSound: true,
                defaultDifficulty: 'hon_hop'
            };
        }
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading settings:', error);
        return {
            defaultModel: 'gemini-2.0-flash-exp',
            defaultTimer: 0,
            defaultSound: true,
            defaultDifficulty: 'hon_hop'
        };
    }
};

export const saveSettings = (settings: AppSettings): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// ============ ANALYTICS ============

export const getAnalytics = (): AnalyticsData => {
    const quizzes = getQuizzes();
    const history = getQuizHistory();

    // Kết hợp cả library và history để có dữ liệu đầy đủ
    const allQuizzes = [...quizzes, ...history];

    // Tổng số quiz và câu hỏi
    const totalQuizzes = allQuizzes.length;
    const totalQuestions = allQuizzes.reduce((sum, q) => sum + q.questionCount, 0);

    // Phân bố theo mức độ
    const quizzesByDifficulty: Record<DifficultyLevel, number> = {
        nhan_biet: 0,
        thong_hieu: 0,
        van_dung: 0,
        van_dung_cao: 0,
        hon_hop: 0
    };

    allQuizzes.forEach(q => {
        quizzesByDifficulty[q.difficultyLevel]++;
    });

    // Phân bố theo ngày (7 ngày gần nhất)
    const quizzesByDate: Array<{ date: string; count: number }> = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];

        const count = allQuizzes.filter(q => {
            const quizDate = new Date(q.createdAt).toISOString().split('T')[0];
            return quizDate === dateString;
        }).length;

        quizzesByDate.push({
            date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
            count
        });
    }

    return {
        totalQuizzes,
        totalQuestions,
        quizzesByDifficulty,
        quizzesByDate
    };
};
