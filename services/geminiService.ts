import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, DifficultyLevel, DIFFICULTY_LABELS, SourceMode } from '../types';

const fileToPart = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve({
                inlineData: {
                    data: base64String,
                    mimeType: file.type,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Mô tả chi tiết các mức độ theo Bloom's Taxonomy
const DIFFICULTY_INSTRUCTIONS: Record<DifficultyLevel, string> = {
    nhan_biet: `
    MỨC ĐỘ: NHẬN BIẾT (Remember)
    - Câu hỏi yêu cầu nhớ lại, nhận diện thông tin cơ bản
    - Dạng: Định nghĩa là gì? Liệt kê các..., Đặc điểm nào sau đây...
    - Không cần suy luận, chỉ cần ghi nhớ
    - Đáp án thường có trong tài liệu nguyên văn`,

    thong_hieu: `
    MỨC ĐỘ: THÔNG HIỂU (Understand)  
    - Câu hỏi yêu cầu giải thích, so sánh, phân biệt khái niệm
    - Dạng: Giải thích tại sao..., So sánh A và B, Ý nghĩa của...
    - Cần hiểu bản chất, không chỉ ghi nhớ máy móc
    - Có thể diễn đạt bằng cách khác với tài liệu`,

    van_dung: `
    MỨC ĐỘ: VẬN DỤNG (Apply)
    - Câu hỏi yêu cầu áp dụng kiến thức vào tình huống cụ thể
    - Dạng: Áp dụng công thức để tính..., Trong trường hợp X thì...
    - Cần vận dụng lý thuyết để giải quyết vấn đề thực tế
    - Có thể có bài toán, tình huống giả định`,

    van_dung_cao: `
    MỨC ĐỘ: VẬN DỤNG CAO (Analyze/Evaluate/Create)
    - Câu hỏi yêu cầu phân tích, đánh giá, tổng hợp phức tạp
    - Dạng: Phân tích nguyên nhân..., Đánh giá ưu nhược điểm..., Đề xuất giải pháp...
    - Kết hợp nhiều kiến thức, tư duy phản biện
    - Tình huống phức tạp, nhiều bước giải`,

    hon_hop: `
    MỨC ĐỘ: HỖN HỢP (Mixed)
    - Kết hợp tất cả các mức độ: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao
    - Phân bố: 20% Nhận biết, 30% Thông hiểu, 30% Vận dụng, 20% Vận dụng cao
    - QUAN TRỌNG: Tạo câu hỏi theo THỨ TỰ TĂNG DẦN về mức độ:
      + Bắt đầu với các câu NHẬN BIẾT (nhan_biet)
      + Tiếp theo là THÔNG HIỂU (thong_hieu)
      + Sau đó là VẬN DỤNG (van_dung)
      + Cuối cùng là VẬN DỤNG CAO (van_dung_cao)
    - Đảm bảo đa dạng độ khó để đánh giá toàn diện`
};

// Danh sách models theo thứ tự ưu tiên (fallback)
const MODELS = [
    'gemini-3-flash-preview',   // Model mặc định
    'gemini-3-pro-preview',     // Dự phòng 1
    'gemini-2.5-flash'          // Dự phòng 2
];

// Số lần retry tối đa cho mỗi model
const MAX_RETRIES = 2;
// Delay giữa các lần retry (ms)
const RETRY_DELAY = 2000;

// Hàm delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Lấy API key từ localStorage
const getApiKey = (): string => {
    const key = localStorage.getItem('gemini_api_key');
    if (!key) {
        throw new Error('API key không tồn tại. Vui lòng cài đặt API key.');
    }
    return key;
};

// Hàm parse lỗi thân thiện
const parseErrorMessage = (error: any): string => {
    const message = error?.message || '';
    const statusCode = error?.status || error?.code || '';

    // Lỗi 503 - Model quá tải
    if (statusCode === 503 || message.includes('503') || message.toLowerCase().includes('overloaded') || message.toLowerCase().includes('unavailable')) {
        return '⚠️ Server AI đang quá tải. Đang thử lại với model khác...';
    }

    // Lỗi 429 - Rate limit
    if (statusCode === 429 || message.includes('429') || message.toLowerCase().includes('rate limit') || message.toLowerCase().includes('quota')) {
        return '⚠️ Đã vượt giới hạn request. Vui lòng đợi 1 phút rồi thử lại.';
    }

    // Lỗi 400 - Bad request
    if (statusCode === 400 || message.includes('400')) {
        return '❌ Yêu cầu không hợp lệ. Vui lòng kiểm tra nội dung đầu vào.';
    }

    // Lỗi API key
    if (message.toLowerCase().includes('api key') || message.toLowerCase().includes('invalid') || statusCode === 401 || statusCode === 403) {
        return '🔑 API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại.';
    }

    // Lỗi mạng
    if (message.toLowerCase().includes('network') || message.toLowerCase().includes('fetch')) {
        return '🌐 Lỗi kết nối mạng. Vui lòng kiểm tra internet.';
    }

    return message || 'Đã xảy ra lỗi không xác định.';
};

export const generateQuizData = async (
    topic: string,
    files: File[],
    count: number,
    difficultyLevel: DifficultyLevel = 'hon_hop',
    sourceMode: SourceMode = 'creative'
): Promise<QuizQuestion[]> => {
    // Schema definition for strict JSON output
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                id: { type: Type.INTEGER },
                type: { type: Type.STRING, enum: ["mcq", "tf", "short"] },
                topic: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Bắt buộc cho MCQ. 4 lựa chọn."
                },
                correct: {
                    type: Type.STRING,
                    description: "MCQ: Index (0-3). TF: 1 là Đúng, 0 là Sai. Short: Số hoặc phân số dạng string (VD: 5, 1/2, -3/5)."
                },
                explain: { type: Type.STRING },
                level: {
                    type: Type.STRING,
                    enum: ["nhan_biet", "thong_hieu", "van_dung", "van_dung_cao"],
                    description: "Mức độ của câu hỏi"
                }
            },
            required: ["id", "type", "topic", "question", "correct", "explain", "level"]
        }
    };

    const difficultyInstruction = DIFFICULTY_INSTRUCTIONS[difficultyLevel];
    const levelLabel = DIFFICULTY_LABELS[difficultyLevel];

    // Instruction dựa trên sourceMode
    const sourceModeInstruction = sourceMode === 'strict'
        ? `
    CHẾ ĐỘ: NGHIÊM NGẶT (Strict Mode)
    - BẮT BUỘC lấy CHÍNH XÁC câu hỏi, bài tập từ tài liệu được cung cấp.
    - KHÔNG ĐƯỢC tự ý thay đổi số liệu, bối cảnh, hoặc nội dung câu hỏi.
    - Giữ nguyên văn câu hỏi gốc từ tài liệu.
    - Chỉ format lại cho phù hợp với dạng trắc nghiệm/đúng sai/điền số.
    - Nếu tài liệu có sẵn đáp án, sử dụng đáp án đó.
    `
        : `
    CHẾ ĐỘ: SÁNG TẠO (Creative Mode)  
    - Có thể THAM KHẢO tài liệu như nguồn kiến thức cơ sở.
    - ĐƯỢC PHÉP thay đổi bối cảnh, số liệu, tình huống để tạo câu hỏi mới.
    - Khuyến khích sáng tạo các dạng câu hỏi đa dạng, thú vị.
    - Đảm bảo nội dung vẫn liên quan đến kiến thức trong tài liệu.
    - Có thể thêm các tình huống thực tế, ví dụ minh họa mới.
    `;

    const systemInstruction = `
    Bạn là Trợ lý Soạn Bài Giảng AI chuyên nghiệp.
    Nhiệm vụ: Tạo ${count} câu hỏi kiểm tra bài cũ bằng TIẾNG VIỆT dựa trên tài liệu cung cấp.
    
    ${difficultyInstruction}
    
    ${sourceModeInstruction}
    
    Yêu cầu quan trọng:
    1. Ngôn ngữ: 100% Tiếng Việt.
    2. Định dạng Toán học: Sử dụng LaTeX $$...$$ cho công thức.
    3. Đa dạng câu hỏi: Trắc nghiệm (mcq), Đúng/Sai (tf), Điền số (short).
    4. Giải thích (explain): Ngắn gọn, súc tích, bằng tiếng Việt.
    5. Mức độ đã chọn: ${levelLabel}
    6. Trường \"level\" trong mỗi câu hỏi phải ghi rõ mức độ thực tế của câu đó.
    7. Chỉ trả về JSON thuần theo schema.
    `;

    const parts = [];

    if (files.length > 0) {
        for (const file of files) {
            const part = await fileToPart(file);
            parts.push(part);
        }
        parts.push({ text: `Hãy phân tích tài liệu và tạo ${count} câu hỏi ${levelLabel} về chủ đề: ${topic || "Nội dung chính"}` });
    } else {
        parts.push({ text: `Hãy tạo ${count} câu hỏi ${levelLabel} về chủ đề: ${topic}` });
    }

    // Gọi API với cơ chế retry và fallback models
    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });

    let lastError: any = null;
    let rawData: any[] = [];

    // Thử từng model trong danh sách
    for (const model of MODELS) {
        // Thử retry với mỗi model
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                console.log(`Đang tạo câu hỏi với ${model} (lần ${attempt})...`);

                const response = await ai.models.generateContent({
                    model: model,
                    contents: { parts },
                    config: {
                        systemInstruction,
                        responseMimeType: "application/json",
                        responseSchema: schema,
                        temperature: 0.4,
                    }
                });

                rawData = JSON.parse(response.text || "[]");

                // Nếu thành công, thoát khỏi cả 2 vòng lặp
                if (rawData.length > 0) {
                    console.log(`✅ Tạo thành công ${rawData.length} câu hỏi với ${model}`);
                    // Sử dụng label để break khỏi cả 2 vòng lặp
                    lastError = null;
                    break;
                }
            } catch (error: any) {
                lastError = error;
                const errorMsg = parseErrorMessage(error);
                console.warn(`❌ Lỗi với ${model} (lần ${attempt}): ${errorMsg}`);

                // Nếu lỗi là API key không hợp lệ, không cần thử lại
                if (error?.status === 401 || error?.status === 403 ||
                    (error?.message && (error.message.includes('API key') || error.message.includes('Invalid')))) {
                    throw new Error('🔑 API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại trong Cài đặt.');
                }

                // Delay trước khi thử lại
                if (attempt < MAX_RETRIES) {
                    console.log(`⏳ Đợi ${RETRY_DELAY / 1000}s trước khi thử lại...`);
                    await delay(RETRY_DELAY);
                }
            }
        }

        // Nếu đã thành công, thoát khỏi vòng for models
        if (rawData.length > 0 && lastError === null) {
            break;
        }

        // Log chuyển model
        const modelIndex = MODELS.indexOf(model);
        if (modelIndex < MODELS.length - 1 && (rawData.length === 0 || lastError)) {
            console.log(`🔄 Chuyển sang model dự phòng: ${MODELS[modelIndex + 1]}`);
            await delay(1000); // Delay nhỏ khi chuyển model
        }
    }

    // Nếu tất cả models đều thất bại
    if (rawData.length === 0) {
        if (lastError) {
            const friendlyError = parseErrorMessage(lastError);
            throw new Error(`Không thể tạo câu hỏi sau nhiều lần thử. ${friendlyError}\n\n💡 Mẹo: Thử lại sau vài phút hoặc sử dụng API key khác.`);
        }
        throw new Error('Không thể tạo câu hỏi. Vui lòng thử lại sau.');
    }

    // Map data to match types strictly
    let questions = rawData.map((q: any) => {
        let cleanCorrect = q.correct;

        if (q.type === 'mcq') {
            // MCQ: chuyển về số index
            cleanCorrect = typeof q.correct === 'string' ? parseInt(q.correct) : q.correct;
        } else if (q.type === 'tf') {
            // TF: chuyển về boolean
            cleanCorrect = q.correct === '1' || q.correct === 1 || q.correct === true || q.correct === 'true';
        } else if (q.type === 'short') {
            // Short: giữ nguyên dạng string (hỗ trợ phân số)
            cleanCorrect = String(q.correct);
        }

        return {
            ...q,
            correct: cleanCorrect,
            level: q.level || difficultyLevel
        };
    });

    // Nếu là mức độ hỗn hợp, sắp xếp theo thứ tự tăng dần
    if (difficultyLevel === 'hon_hop') {
        const levelOrder: Record<DifficultyLevel, number> = {
            nhan_biet: 1,
            thong_hieu: 2,
            van_dung: 3,
            van_dung_cao: 4,
            hon_hop: 0 // không dùng trong sort
        };

        questions.sort((a, b) => {
            const orderA = levelOrder[a.level as DifficultyLevel] || 0;
            const orderB = levelOrder[b.level as DifficultyLevel] || 0;
            return orderA - orderB;
        });
    }

    return questions;
};
