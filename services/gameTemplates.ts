import { GameTheme } from '../types';

// Template cơ bản (hiện tại) - đã có trong constants.ts
// Template này sẽ được export riêng

// CSS cho từng theme
const THEME_CSS: Record<GameTheme, string> = {
    classic: `
        /* Theme Cơ Bản - Game Show */
        body { 
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 35%, #f093fb 60%, #f5576c 100%);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            color: white;
        }
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `,
    space: `
        /* Theme Space Defender */
        body { 
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            background: #000000;
            background-image: 
                radial-gradient(ellipse at center, #1a1a2e 0%, #000000 100%),
                url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg');
            background-size: cover;
            color: #00ffcc;
        }
        .game-card { 
            background: rgba(0, 255, 204, 0.1); 
            border: 2px solid #00ffcc;
            box-shadow: 0 0 30px rgba(0, 255, 204, 0.3);
        }
        .btn-game { 
            background: linear-gradient(145deg, #2d1b69 0%, #11998e 100%);
            border-color: #00ffcc;
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            color: #000000;
        }
        .btn-game:hover { box-shadow: 0 0 30px #00ffcc; }
        /* Stars animation */
        .stars { position: fixed; width: 100%; height: 100%; z-index: -1; }
        .stars::before {
            content: '';
            position: absolute;
            width: 2px; height: 2px;
            background: white;
            box-shadow: 
                50px 30px white, 100px 80px white, 150px 20px white,
                200px 120px white, 250px 60px white, 300px 150px white,
                400px 40px white, 450px 100px white, 500px 70px white;
            animation: twinkle 3s ease-in-out infinite;
        }
        @keyframes twinkle { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        /* Feedback area - màu chữ đen dễ đọc */
        #feedback-area {
            color: #000000 !important;
            background: rgba(255, 255, 255, 0.95) !important;
            border-color: #00ffcc !important;
        }
        #feedback-area * { color: #000000 !important; }
    `,
    quiz_show: `
        /* Theme Quiz Show - Ai Là Triệu Phú */
        body { 
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            background: radial-gradient(ellipse at center, #312e81 0%, #1e1b4b 50%, #000000 100%);
            color: #fbbf24;
        }
        .game-card { 
            background: linear-gradient(145deg, #312e81, #1e1b4b);
            border: 3px solid #f59e0b;
            box-shadow: 
                0 0 50px rgba(245, 158, 11, 0.3),
                inset 0 0 30px rgba(0, 0, 0, 0.5);
        }
        .btn-game {
            background: linear-gradient(145deg, #4c1d95, #7c3aed);
            border: 2px solid #fbbf24;
            clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            font-weight: 700;
        }
        .btn-game:hover {
            background: linear-gradient(145deg, #f59e0b, #fbbf24);
            color: #1e1b4b;
        }
        /* Spotlight effect */
        .spotlight {
            position: fixed;
            top: -50%; left: 50%; transform: translateX(-50%);
            width: 200%; height: 200%;
            background: radial-gradient(circle at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 50%);
            pointer-events: none; z-index: -1;
        }
    `,
    rpg: `
        /* Theme RPG Adventure */
        body { 
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            background: #271c19;
            background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
            color: #e7e5e4;
            border: 15px solid #574c44;
            box-sizing: border-box;
        }
        .game-card { 
            background: linear-gradient(145deg, #45322e, #271c19);
            border: 4px solid #8b7355;
            border-radius: 10px;
            box-shadow: inset 0 0 50px rgba(0,0,0,0.5);
        }
        .btn-game {
            background: linear-gradient(145deg, #8b4513, #a0522d);
            border: 3px solid #daa520;
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
        }
        .btn-game:hover {
            background: linear-gradient(145deg, #b8860b, #daa520);
            color: #271c19;
        }
        /* Health bar style */
        .health-bar {
            background: linear-gradient(90deg, #dc2626 var(--hp), #374151 var(--hp));
            border: 2px solid #991b1b;
        }
        .monster-icon { font-size: 5rem; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
    `,
    racing: `
        /* Theme Speed Racer */
        body { 
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            background: linear-gradient(180deg, #374151 0%, #1f2937 50%, #111827 100%);
            color: #f3f4f6;
        }
        .game-card { 
            background: linear-gradient(145deg, #f3f4f6, #d1d5db);
            color: #111827;
            border: 4px solid #dc2626;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        .btn-game {
            background: linear-gradient(145deg, #dc2626, #991b1b);
            border-bottom: 5px solid #7f1d1d;
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            font-weight: 700;
            font-style: italic;
            text-transform: uppercase;
        }
        .btn-game:hover {
            transform: translateY(-3px) skewX(-3deg);
            box-shadow: 0 10px 20px rgba(220, 38, 38, 0.4);
        }
        /* Racing stripes */
        .racing-stripes {
            position: fixed; bottom: 0; left: 0; right: 0; height: 100px;
            background: repeating-linear-gradient(
                90deg, #ffffff 0px, #ffffff 50px, #dc2626 50px, #dc2626 100px
            );
            opacity: 0.1; z-index: -1;
        }
        /* Speed meter */
        .speed-meter {
            font-size: 3rem; font-weight: bold;
            color: #22c55e;
            text-shadow: 0 0 20px #22c55e;
        }
    `,
    treasure: `
        /* Theme Treasure Hunt */
        body { 
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            background: linear-gradient(180deg, #0c4a6e 0%, #164e63 50%, #134e4a 100%);
            color: #fef3c7;
        }
        .game-card { 
            background: linear-gradient(145deg, #78350f, #451a03);
            border: 4px solid #f59e0b;
            border-radius: 20px;
            box-shadow: 
                inset 0 0 50px rgba(245, 158, 11, 0.2),
                0 10px 40px rgba(0,0,0,0.5);
        }
        .btn-game {
            background: linear-gradient(145deg, #f59e0b, #d97706);
            border: 3px solid #78350f;
            border-radius: 15px;
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif;
            font-weight: 600;
        }
        .btn-game:hover {
            background: linear-gradient(145deg, #fbbf24, #f59e0b);
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
        }
        /* Treasure chest animation */
        .treasure-icon { 
            font-size: 4rem; 
            animation: float 3s ease-in-out infinite;
        }
        @keyframes float { 
            0%,100% { transform: translateY(0); } 
            50% { transform: translateY(-10px); } 
        }
        /* Map background */
        .map-bg {
            position: fixed; inset: 0;
            background-image: url('https://www.transparenttextures.com/patterns/old-map.png');
            opacity: 0.1; z-index: -1;
        }
    `
};

// Config đặc biệt cho từng theme
const THEME_CONFIG: Record<GameTheme, { icon: string; title: string; startText: string; correctText: string; wrongText: string; endTitle: string }> = {
    classic: {
        icon: '🎓',
        title: 'Thử Thách Kiến Thức',
        startText: 'BẮT ĐẦU NGAY',
        correctText: 'CHÍNH XÁC!',
        wrongText: 'SAI RỒI...',
        endTitle: 'XUẤT SẮC!'
    },
    space: {
        icon: '🚀',
        title: 'SPACE DEFENDER',
        startText: 'KHỞI ĐỘNG PHI THUYỀN',
        correctText: 'MỤC TIÊU BỊ HẠ!',
        wrongText: 'TRƯỢT MỤC TIÊU!',
        endTitle: 'NHIỆM VỤ HOÀN THÀNH!'
    },
    quiz_show: {
        icon: '🏆',
        title: 'AI LÀ TRIỆU PHÚ',
        startText: 'BẮT ĐẦU TRÒ CHƠI',
        correctText: 'CHÍNH XÁC! ĐI TIẾP!',
        wrongText: 'TIẾC QUÁ...',
        endTitle: 'CHÚC MỪNG TRIỆU PHÚ!'
    },
    rpg: {
        icon: '⚔️',
        title: 'DŨNG SĨ DIỆT RỒNG',
        startText: 'BẮT ĐẦU HÀNH TRÌNH',
        correctText: 'TRÚNG ĐÒN! -50 HP',
        wrongText: 'QUÁI VẬT TẤN CÔNG!',
        endTitle: 'CHIẾN THẮNG VẺ VANG!'
    },
    racing: {
        icon: '🏎️',
        title: 'SPEED RACER',
        startText: 'XUẤT PHÁT!',
        correctText: 'TĂNG TỐC!',
        wrongText: 'MẤT TỐC ĐỘ!',
        endTitle: 'VỀ ĐÍCH!'
    },
    treasure: {
        icon: '💎',
        title: 'SĂN KHO BÁU',
        startText: 'BẮT ĐẦU TÌM KIẾM',
        correctText: 'TÌM THẤY VÀNG!',
        wrongText: 'BẪY RẬP!',
        endTitle: 'KHO BÁU ĐÃ MỞ!'
    }
};

// Function để tạo HTML template dựa trên theme
export const getGameTemplate = (theme: GameTheme): string => {
    const css = THEME_CSS[theme];
    const config = THEME_CONFIG[theme];

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    
    <!-- MathJax Configuration -->
    <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
        processEscapes: true
      },
      options: {
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
      },
      chtml: {
        scale: 1.1
      }
    };
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&family=Open+Sans:wght@400;600;700&family=Roboto:wght@400;500;700&family=Source+Sans+Pro:wght@400;600;700&family=Merriweather:wght@400;700&family=Lora:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        ${css}
        
        /* Common Styles */
        body {
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .game-card {
            backdrop-filter: blur(10px);
        }
        
        .btn-game {
            transition: all 0.2s ease;
            cursor: pointer;
            padding: 1.5rem 2rem;
            border-radius: 15px;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .btn-game:active {
            transform: scale(0.95);
        }
        
        .shake { animation: shake 0.5s; }
        @keyframes shake { 
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            75% { transform: translateX(-10px); }
        }
        
        .combo-text { 
            animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        }
        @keyframes popIn { 
            0% { opacity: 0; transform: scale(0.5); } 
            100% { opacity: 1; transform: scale(1); } 
        }
        
        .question-text {
            font-size: 1.8rem;
            line-height: 1.5;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        @media (min-width: 768px) {
            .question-text { font-size: 2.2rem; }
        }
        
        mjx-container { font-size: 120% !important; }
        
        .glass-panel {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
    </style>
</head>
<body class="flex flex-col items-center justify-center p-4">
    
    <!-- Theme-specific decorations -->
    <div class="stars"></div>
    <div class="spotlight"></div>
    <div class="racing-stripes"></div>
    <div class="map-bg"></div>

    <!-- Main Container -->
    <div id="game-screen" class="w-full max-w-5xl flex flex-col items-center">
        
        <!-- Top Bar -->
        <div class="w-full flex justify-between items-center mb-6 px-4 py-3 glass-panel rounded-2xl">
            <div class="flex items-center gap-4">
                <div class="text-3xl font-bold text-yellow-400">
                    <i class="fas fa-star"></i> <span id="score">0</span>
                </div>
                <div id="combo-display" class="hidden text-xl font-bold text-orange-500 combo-text">
                    COMBO x<span id="combo-count">1</span> 🔥
                </div>
            </div>
            <div id="timer-container" class="text-2xl font-mono font-bold hidden">
                <i class="fas fa-clock mr-2"></i><span id="timer-display">00:00</span>
            </div>
            <div class="text-xl">
                Câu <span id="current-q">1</span>/<span id="total-q">0</span>
            </div>
        </div>

        <!-- Question Card -->
        <div class="game-card w-full rounded-3xl p-8 md:p-12 relative">
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-bold shadow-lg text-4xl">
                ${config.icon}
            </div>
            
            <div class="text-center mb-4 text-lg opacity-70" id="q-topic"></div>
            
            <h2 class="question-text text-center font-bold mb-8" id="q-text">
                Đang tải dữ liệu...
            </h2>
            
            <div id="options-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Options injected here -->
            </div>
            
            <!-- Feedback -->
            <div id="feedback-area" class="hidden mt-6 p-4 rounded-xl text-center text-xl font-bold"></div>
        </div>
        
        <!-- Action Buttons -->
        <div id="action-buttons" class="hidden mt-6 flex gap-4">
            <button onclick="nextQuestion()" class="btn-game px-8 py-4 text-xl">
                TIẾP THEO <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
    </div>

    <!-- Start Screen -->
    <div id="start-screen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
        <div class="text-8xl mb-6">${config.icon}</div>
        <h1 class="text-4xl md:text-6xl font-black mb-8 text-center animate-pulse">${config.title}</h1>
        <div class="glass-panel p-6 rounded-xl mb-8 max-w-lg text-center">
            <p class="text-xl mb-2">Số câu hỏi: <span id="total-questions" class="font-bold text-yellow-300">0</span></p>
            <p class="opacity-70">Sẵn sàng chinh phục thử thách chưa?</p>
        </div>
        <button onclick="startGame()" class="btn-game px-10 py-4 text-2xl animate-bounce">
            ${config.startText} 🚀
        </button>
    </div>

    <!-- Result Screen -->
    <div id="result-screen" class="hidden fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
        <div id="confetti-container" class="absolute inset-0 overflow-hidden pointer-events-none"></div>
        <div class="relative z-10 text-center">
            <div class="text-8xl mb-4">🏆</div>
            <h1 id="result-title" class="text-5xl md:text-7xl font-black mb-4">${config.endTitle}</h1>
            <div class="text-4xl md:text-6xl font-bold mb-8">
                <span id="final-score">0</span>/<span id="total-score-max">0</span>
            </div>
            <div class="glass-panel p-6 rounded-2xl max-w-md mx-auto mb-8">
                <div class="flex justify-between mb-2">
                    <span>Tỷ lệ đúng:</span>
                    <span id="result-percent" class="font-bold text-green-400">0%</span>
                </div>
                <div class="flex justify-between">
                    <span>Đánh giá:</span>
                    <span id="result-msg" class="font-bold text-yellow-400">Tốt lắm!</span>
                </div>
            </div>
            <div class="flex gap-4 justify-center">
                <button onclick="location.reload()" class="btn-game px-8 py-3">
                    <i class="fas fa-redo mr-2"></i> CHƠI LẠI
                </button>
            </div>
        </div>
    </div>

    <script>
        // QUIZ DATA (injected by app)
        const quizData = {{DATA_PLACEHOLDER}};
        
        // Settings
        const TIMER_SECONDS = {{TIMER_SECONDS}};
        const ENABLE_SOUND = {{ENABLE_SOUND}};
        const THEME_CONFIG = ${JSON.stringify(config)};

        let currentIdx = 0;
        let score = 0;
        let combo = 0;
        let timerInterval = null;
        let timeLeft = TIMER_SECONDS;
        
        const btnClasses = ['bg-green-600 hover:bg-green-500 border-green-400', 'bg-yellow-600 hover:bg-yellow-500 border-yellow-400', 'bg-red-600 hover:bg-red-500 border-red-400', 'bg-purple-600 hover:bg-purple-500 border-purple-400'];
        const btnLabels = ['A', 'B', 'C', 'D'];

        // Sound Synthesizer
        function playSound(type) {
            if (!ENABLE_SOUND) return;
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                gainNode.gain.value = 0.1;
                
                if (type === 'correct') {
                    oscillator.frequency.value = 800;
                    oscillator.start();
                    oscillator.stop(audioCtx.currentTime + 0.2);
                } else if (type === 'wrong') {
                    oscillator.frequency.value = 200;
                    oscillator.type = 'sawtooth';
                    oscillator.start();
                    oscillator.stop(audioCtx.currentTime + 0.3);
                } else if (type === 'win') {
                    [523, 659, 784].forEach((freq, i) => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);
                        osc.frequency.value = freq;
                        gain.gain.value = 0.1;
                        osc.start(audioCtx.currentTime + i * 0.15);
                        osc.stop(audioCtx.currentTime + i * 0.15 + 0.15);
                    });
                }
            } catch (e) {}
        }

        function init() {
            document.getElementById('total-q').innerText = quizData.length;
            document.getElementById('total-questions').innerText = quizData.length;
            
            if (TIMER_SECONDS > 0) {
                document.getElementById('timer-container').classList.remove('hidden');
                updateTimerDisplay();
            }
        }

        function startGame() {
            document.getElementById('start-screen').classList.add('hidden');
            
            if (TIMER_SECONDS > 0) {
                timerInterval = setInterval(() => {
                    timeLeft--;
                    updateTimerDisplay();
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        showResults();
                    }
                }, 1000);
            }
            
            renderQuestion();
        }

        function updateTimerDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer-display').innerText = 
                \`\${String(minutes).padStart(2, '0')}:\${String(seconds).padStart(2, '0')}\`;
            
            if (timeLeft <= 10 && timeLeft > 0) {
                document.getElementById('timer-display').classList.add('text-red-400', 'animate-pulse');
            }
        }

        function renderQuestion() {
            const q = quizData[currentIdx];
            document.getElementById('current-q').innerText = currentIdx + 1;
            document.getElementById('q-topic').innerText = q.topic || '';
            document.getElementById('q-text').innerHTML = q.question;
            document.getElementById('feedback-area').classList.add('hidden');
            document.getElementById('action-buttons').classList.add('hidden');
            
            const container = document.getElementById('options-container');
            container.innerHTML = '';

            if (q.type === 'mcq') {
                q.options.forEach((opt, idx) => {
                    const btnClass = btnClasses[idx % 4];
                    const label = btnLabels[idx % 4];
                    const btn = document.createElement('button');
                    btn.className = \`btn-game \${btnClass} text-white text-left flex items-center gap-4 border-2\`;
                    btn.innerHTML = \`
                        <div class="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center text-2xl font-black">\${label}</div>
                        <div class="flex-1">\${opt}</div>
                    \`;
                    btn.onclick = () => handleAnswer(idx, btn, 'mcq');
                    container.appendChild(btn);
                });
            } else if (q.type === 'tf') {
                container.innerHTML = \`
                    <button onclick="handleAnswer(true, this, 'tf')" class="btn-game bg-green-600 hover:bg-green-500 text-white text-2xl">
                        <i class="fas fa-check mr-2"></i> ĐÚNG
                    </button>
                    <button onclick="handleAnswer(false, this, 'tf')" class="btn-game bg-red-600 hover:bg-red-500 text-white text-2xl">
                        <i class="fas fa-times mr-2"></i> SAI
                    </button>
                \`;
            } else if (q.type === 'short') {
                container.className = 'flex flex-col gap-4 max-w-md mx-auto';
                container.innerHTML = \`
                    <input type="text" id="short-input" class="p-4 text-3xl text-center bg-black/20 border-2 border-white/30 rounded-xl outline-none focus:border-blue-500" placeholder="Nhập đáp án..." autocomplete="off">
                    <p class="text-sm text-white/70 mt-1">💡 Hỗ trợ: Số (5), phân số (1/3), mũ (x^2), văn bản</p>
                    <button onclick="handleShortAnswer()" class="btn-game bg-blue-600 hover:bg-blue-500 text-white">XÁC NHẬN</button>
                \`;
                // Cho phép nhấn Enter để submit
                setTimeout(() => {
                    const shortInput = document.getElementById('short-input');
                    if (shortInput) {
                        shortInput.addEventListener('keypress', (e) => {
                            if (e.key === 'Enter') handleShortAnswer();
                        });
                    }
                }, 100);
            }

            if (window.MathJax) {
                window.MathJax.typesetPromise([document.getElementById('q-text'), container]).catch(err => {});
            }
        }

        // Hàm chuẩn hóa đáp án để so sánh
        function normalizeAnswer(str) {
            if (str === null || str === undefined) return '';
            str = String(str).trim().toLowerCase();
            str = str.replace(/\\s+/g, ' ');
            str = str.replace(/[–—]/g, '-');
            return str;
        }

        // Hàm parse phân số và số thông thường
        function parseFraction(str) {
            if (!str) return NaN;
            str = String(str).trim();
            if (str === '') return NaN;
            
            if (str.indexOf('/') !== -1) {
                const parts = str.split('/');
                if (parts.length === 2) {
                    const numerator = parseFloat(parts[0]);
                    const denominator = parseFloat(parts[1]);
                    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                        return numerator / denominator;
                    }
                }
                return NaN;
            }
            
            return parseFloat(str);
        }

        // Hàm so sánh đáp án (hỗ trợ số, phân số, mũ, văn bản)
        function compareAnswer(userAnswer, correctAnswer) {
            const userStr = normalizeAnswer(userAnswer);
            const correctStr = normalizeAnswer(correctAnswer);
            
            if (userStr === correctStr) return true;
            
            const userNum = parseFraction(userAnswer);
            const correctNum = parseFraction(String(correctAnswer));
            
            if (!isNaN(userNum) && !isNaN(correctNum)) {
                return Math.abs(userNum - correctNum) < 0.0001;
            }
            
            return false;
        }

        // Xử lý câu trả lời ngắn
        function handleShortAnswer() {
            const input = document.getElementById('short-input');
            if (!input) return;
            const userInput = input.value.trim();
            
            if (!userInput) {
                alert('Vui lòng nhập đáp án!');
                return;
            }
            
            handleAnswer(userInput, input, 'short');
        }

        function handleAnswer(userAns, btnElement, type) {
            const q = quizData[currentIdx];
            let isCorrect = false;

            if (type === 'short') {
                isCorrect = compareAnswer(userAns, q.correct);
            } else if (type === 'tf') {
                isCorrect = (userAns === q.correct);
            } else {
                isCorrect = (userAns === q.correct);
            }

            const feedback = document.getElementById('feedback-area');
            feedback.classList.remove('hidden');
            
            if (isCorrect) {
                score++;
                combo++;
                document.getElementById('score').innerText = score;
                feedback.innerHTML = \`<i class="fas fa-check-circle text-green-600"></i> \${THEME_CONFIG.correctText}<br><small class="text-gray-700">\${q.explain || ''}</small>\`;
                feedback.className = "mt-6 p-4 rounded-xl text-center text-xl font-bold bg-white/95 text-black border-2 border-green-500";
                playSound('correct');
                
                if (typeof confetti !== 'undefined') {
                    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                }
                
                if (combo > 1) {
                    document.getElementById('combo-display').classList.remove('hidden');
                    document.getElementById('combo-count').innerText = combo;
                }
            } else {
                combo = 0;
                document.getElementById('combo-display').classList.add('hidden');
                document.getElementById('game-screen').classList.add('shake');
                setTimeout(() => document.getElementById('game-screen').classList.remove('shake'), 500);
                
                feedback.innerHTML = \`<i class="fas fa-times-circle text-red-600"></i> \${THEME_CONFIG.wrongText}<br><small>Đáp án: \${getCorrectAnswer(q)}</small><br><small class="text-gray-700">\${q.explain || ''}</small>\`;
                feedback.className = "mt-6 p-4 rounded-xl text-center text-xl font-bold bg-white/95 text-black border-2 border-red-500";
                playSound('wrong');
            }

            // Render MathJax cho phần giải thích
            if (window.MathJax) {
                window.MathJax.typesetPromise([feedback]).catch(err => {});
            }

            document.getElementById('action-buttons').classList.remove('hidden');
        }

        function getCorrectAnswer(q) {
            if (q.type === 'mcq') return q.options[q.correct];
            if (q.type === 'tf') return q.correct ? 'Đúng' : 'Sai';
            return q.correct;
        }

        function nextQuestion() {
            if (currentIdx < quizData.length - 1) {
                currentIdx++;
                renderQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            document.getElementById('game-screen').classList.add('hidden');
            const resultScreen = document.getElementById('result-screen');
            resultScreen.classList.remove('hidden');

            const total = quizData.length;
            const percent = Math.round((score / total) * 100);
            
            document.getElementById('final-score').innerText = score;
            document.getElementById('total-score-max').innerText = total;
            document.getElementById('result-percent').innerText = percent + "%";

            const msgEl = document.getElementById('result-msg');
            if (percent === 100) {
                msgEl.innerText = "Hoàn hảo! Không sai câu nào!";
            } else if (percent >= 80) {
                msgEl.innerText = "Xuất sắc! Tiếp tục phát huy!";
            } else if (percent >= 50) {
                msgEl.innerText = "Tốt lắm! Cố gắng hơn nhé!";
            } else {
                msgEl.innerText = "Cần ôn luyện thêm!";
            }

            playSound('win');
            if (typeof confetti !== 'undefined') {
                confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            }
        }

        // Kiểm tra dữ liệu trước khi init
        if (quizData && quizData.length > 0) {
            init();
        } else {
            console.error('Không có dữ liệu câu hỏi!');
            document.getElementById('q-text').innerText = 'Lỗi: Không tải được dữ liệu câu hỏi. Vui lòng thử lại.';
        }
    </script>
</body>
</html>`;
};

export { THEME_CSS, THEME_CONFIG };
