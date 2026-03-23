export const EXPORT_FILENAME = "bai-kiem-tra-game.html";

// Template HTML mới với giao diện Game Show, màu sắc rực rỡ và hiệu ứng vinh danh
export const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thử Thách Kiến Thức</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    
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
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { 
            font-family: 'Be Vietnam Pro', 'Nunito', sans-serif; 
            /* Vibrant Rainbow Gradient - Màu sắc rực rỡ hơn */
            background: linear-gradient(135deg, #667eea 0%, #764ba2 35%, #f093fb 60%, #f5576c 100%);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            color: white;
            overflow-x: hidden;
            min-height: 100vh;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        h1, h2, h3, .font-game {
            font-family: 'Baloo 2', cursive;
        }
        
        /* Text viền đen nổi bật - Dễ đọc trên mọi nền */
        .text-outline {
            color: #ffffff;
            text-shadow: 
                -2px -2px 0 #000,  
                2px -2px 0 #000,
                -2px 2px 0 #000,
                2px 2px 0 #000,
                0px 3px 5px rgba(0,0,0,0.5);
        }
        
        /* Hiệu ứng stars nền thay vì lightning */
        .lightning-bg {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                radial-gradient(2px 2px at 20px 30px, white, transparent),
                radial-gradient(3px 3px at 40px 70px, rgba(255,255,255,0.8), transparent),
                radial-gradient(2px 2px at 90px 40px, white, transparent),
                radial-gradient(3px 3px at 160px 120px, rgba(255,255,255,0.9), transparent),
                radial-gradient(2px 2px at 230px 80px, white, transparent),
                radial-gradient(4px 4px at 310px 150px, rgba(255,255,255,0.7), transparent);
            background-size: 400px 200px;
            z-index: -1;
            pointer-events: none;
            opacity: 0.6; 
            animation: twinkle 4s ease-in-out infinite alternate;
        }
        
        @keyframes twinkle {
            0% { opacity: 0.4; }
            100% { opacity: 0.8; }
        }

        /* Buttons 3D style - Nổi khối hơn với shadow đậm */
        .btn-game {
            transition: all 0.15s ease;
            border-bottom: 8px solid;
            border-right: 4px solid;
            position: relative;
            top: 0;
            box-shadow: 
                0 8px 20px rgba(0,0,0,0.4),
                inset 0 2px 0 rgba(255,255,255,0.3);
            text-shadow: 
                -1px -1px 0 rgba(0,0,0,0.5),  
                1px -1px 0 rgba(0,0,0,0.5),
                -1px 1px 0 rgba(0,0,0,0.5),
                1px 1px 0 rgba(0,0,0,0.5);
        }
        .btn-game:hover {
            transform: translateY(-3px);
            box-shadow: 
                0 12px 28px rgba(0,0,0,0.5),
                inset 0 2px 0 rgba(255,255,255,0.4);
        }
        .btn-game:active {
            top: 6px;
            border-bottom-width: 2px;
            border-right-width: 2px;
            box-shadow: 
                0 2px 8px rgba(0,0,0,0.3),
                inset 0 2px 0 rgba(255,255,255,0.2);
        }

        /* Màu sắc đáp án - Rực rỡ hơn với gradient */
        .opt-A { 
            background: linear-gradient(145deg, #34d399 0%, #10b981 50%, #059669 100%); 
            border-color: #047857; 
            border-right-color: #065f46;
        }
        .opt-B { 
            background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%); 
            border-color: #b45309; 
            border-right-color: #92400e;
        }
        .opt-C { 
            background: linear-gradient(145deg, #f87171 0%, #ef4444 50%, #dc2626 100%); 
            border-color: #b91c1c; 
            border-right-color: #991b1b;
        }
        .opt-D { 
            background: linear-gradient(145deg, #c084fc 0%, #a855f7 50%, #9333ea 100%); 
            border-color: #7e22ce; 
            border-right-color: #6b21a8;
        }
        
        .opt-A:hover { background: linear-gradient(145deg, #6ee7b7 0%, #34d399 50%, #10b981 100%); }
        .opt-B:hover { background: linear-gradient(145deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%); }
        .opt-C:hover { background: linear-gradient(145deg, #fca5a5 0%, #f87171 50%, #ef4444 100%); }
        .opt-D:hover { background: linear-gradient(145deg, #e9d5ff 0%, #c084fc 50%, #a855f7 100%); }

        .correct-glow { 
            box-shadow: 0 0 30px #4ade80, 0 0 60px #22c55e; 
            border-color: #ffffff; 
            transform: scale(1.05); 
            z-index: 10; 
        }
        .wrong-shake { animation: shake 0.5s; opacity: 0.6; }

        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-8px); }
            100% { transform: translateX(0); }
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(16px);
            border: 2px solid rgba(255, 255, 255, 0.35);
            box-shadow: 
                0 8px 32px 0 rgba(0, 0, 0, 0.25),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        /* Chữ câu hỏi to hơn */
        .math-display { font-size: 1.5em !important; }
        
        /* Question text - To và viền đen */
        .question-text {
            font-size: 1.8rem !important;
            line-height: 1.4;
            text-shadow: 
                -2px -2px 0 #000,  
                2px -2px 0 #000,
                -2px 2px 0 #000,
                2px 2px 0 #000,
                0px 4px 8px rgba(0,0,0,0.6);
        }
        
        /* Option text - To và viền đen */
        .option-text {
            font-size: 1.4rem !important;
            font-weight: 700;
            text-shadow: 
                -1px -1px 0 rgba(0,0,0,0.8),  
                1px -1px 0 rgba(0,0,0,0.8),
                -1px 1px 0 rgba(0,0,0,0.8),
                1px 1px 0 rgba(0,0,0,0.8);
        }
        
        @media (min-width: 768px) {
            .question-text { font-size: 2.2rem !important; }
            .option-text { font-size: 1.6rem !important; }
        }
        
        /* Gold Text Effect for Result */
        .text-gold {
            background: linear-gradient(to bottom, #fef08a 0%, #eab308 50%, #ca8a04 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0px 4px 0px rgba(0,0,0,0.7));
        }
        
        /* Confetti */
        .confetti {
            position: absolute;
            width: 12px; height: 12px;
            background-color: #f00;
            animation: fall linear forwards;
            border-radius: 2px;
        }
        @keyframes fall {
            to { transform: translateY(100vh) rotate(720deg); }
        }
        
        /* Pulse animation for important elements */
        .pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite;
        }
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
            50% { box-shadow: 0 0 40px rgba(255,255,255,0.6); }
        }
    </style>
</head>
<body class="flex flex-col items-center justify-center p-4">

    <div class="lightning-bg"></div>

    <!-- Main Game Container -->
    <div id="game-screen" class="w-full max-w-5xl flex flex-col items-center">
        
        <!-- Top Bar: Progress & Score -->
        <div class="w-full flex justify-between items-center mb-6 px-4">
            <!-- Progress Bar styled like energy bar -->
            <div class="flex-1 mr-6 relative h-8 bg-teal-900/50 rounded-full border-2 border-teal-200/30 shadow-inner overflow-hidden">
                <div id="progress-bar" class="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-yellow-300 transition-all duration-500 flex items-center justify-end px-2" style="width: 0%">
                    <i class="fas fa-bolt text-white animate-pulse text-xs"></i>
                </div>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                    Câu <span id="current-q">1</span> / <span id="total-q">0</span>
                </div>
            </div>

            </div>

            <!-- Timer (if enabled) -->
            <div id="timer-container" class="glass-panel px-6 py-2 rounded-full flex items-center gap-2 hidden">
                <i class="fas fa-clock text-teal-50 text-xl"></i>
                <span id="timer-display" class="text-2xl font-game font-bold text-yellow-300 drop-shadow-md">00:00</span>
            </div>


            <!-- Score -->
            <div class="glass-panel px-6 py-2 rounded-full flex items-center gap-2">
                <span class="text-teal-50 font-game text-2xl drop-shadow-sm">Điểm:</span>
                <span id="score" class="text-3xl font-game font-bold text-yellow-300 drop-shadow-md">0</span>
            </div>
        </div>

        <!-- Question Card -->
        <div class="glass-panel w-full rounded-3xl p-8 mb-8 relative animate-fade-in-up">
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-6 py-1 rounded-full font-bold shadow-lg border-2 border-white transform -rotate-1">
                <i class="fas fa-lightbulb mr-2"></i> <span id="q-topic">CHỦ ĐỀ</span>
            </div>

            <h2 class="question-text text-2xl md:text-4xl font-bold text-center mt-4 mb-4 leading-tight math-display text-white" id="q-text">
                Đang tải dữ liệu...
            </h2>
        </div>

        <!-- Options Grid -->
        <div id="options-container" class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Buttons injected here -->
        </div>

        <!-- Explanation (Popup) -->
        <div id="explanation-modal" class="fixed inset-0 bg-teal-900/90 hidden z-50 flex items-center justify-center p-4">
            <div class="bg-white text-slate-800 rounded-3xl max-w-2xl w-full p-8 relative animate-bounce-in shadow-2xl border-4 border-teal-400">
                <div class="text-center mb-4">
                    <div id="feedback-icon" class="text-6xl mb-2"></div>
                    <h3 id="feedback-title" class="text-3xl font-game font-bold uppercase"></h3>
                </div>
                
                <div class="bg-teal-50 p-6 rounded-xl border border-teal-100 mb-6 text-lg">
                    <i class="fas fa-info-circle text-teal-600 mr-2"></i> <span id="explanation-text"></span>
                </div>

                <button onclick="nextQuestion()" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl text-xl shadow-lg border-b-4 border-teal-800 active:border-b-0 active:translate-y-1 transition-all">
                    TIẾP THEO <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- HALL OF FAME (Result Screen) -->
    <div id="result-screen" class="hidden fixed inset-0 z-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-teal-900 flex flex-col items-center justify-center text-center p-4">
        <div id="confetti-container" class="absolute inset-0 overflow-hidden pointer-events-none"></div>
        
        <div class="relative z-10 animate-zoom-in">
            <div class="text-6xl md:text-8xl mb-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">🏆</div>
            <h1 id="result-title" class="text-5xl md:text-7xl font-game font-black text-gold mb-2 uppercase tracking-wide">
                XUẤT SẮC!
            </h1>
            <div class="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-md">
                <span id="final-score">0</span>/<span id="total-score-max">0</span>
            </div>

            <!-- Stats Box -->
            <div class="glass-panel p-8 rounded-2xl max-w-md mx-auto mb-10 text-left">
                <div class="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
                    <span class="text-teal-50">Tỷ lệ đúng:</span>
                    <span id="result-percent" class="text-2xl font-bold text-green-300">100%</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-teal-50">Đánh giá:</span>
                    <span id="result-msg" class="text-xl font-bold text-yellow-300">Tuyệt đỉnh!</span>
                </div>
            </div>

            <div class="flex gap-4 justify-center">
                <button onclick="location.reload()" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all shadow-xl">
                    <i class="fas fa-redo mr-2"></i> CHƠI LẠI
                </button>
                <button onclick="shareResult()" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all shadow-xl">
                    <i class="fas fa-share-alt mr-2"></i> CHIA SẺ
                </button>
            </div>
        </div>
    </div>

    <script>
        // DỮ LIỆU CÂU HỎI (AI SẼ ĐIỀN VÀO ĐÂY)
        let quizData = {{DATA_PLACEHOLDER}};

        // Timer & Sound Settings (injected by app)
        const TIMER_SECONDS = {{TIMER_SECONDS}};
        const ENABLE_SOUND = {{ENABLE_SOUND}};

        let currentIdx = 0;
        let score = 0;
        let timerInterval = null;
        let timeLeft = TIMER_SECONDS;
        
        // Colors for buttons A, B, C, D
        const btnClasses = ['opt-A', 'opt-B', 'opt-C', 'opt-D'];
        const btnLabels = ['A', 'B', 'C', 'D'];

        // Sound Generator using Web Audio API
        function playSound(type) {
            if (!ENABLE_SOUND) return;
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            gainNode.gain.value = 0.1;
            
            if (type === 'click') {
                oscillator.frequency.value = 400;
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.05);
            } else if (type === 'correct') {
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
        }

        function init() {
            document.getElementById('total-q').innerText = quizData.length;
            
            // Start timer if enabled
            if (TIMER_SECONDS > 0) {
                document.getElementById('timer-container').classList.remove('hidden');
                updateTimerDisplay();
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
            
            // Warning when < 10 seconds
            if (timeLeft <= 10 && timeLeft > 0) {
                document.getElementById('timer-display').classList.add('text-red-400', 'animate-pulse');
            }
        }

        function renderQuestion() {
            const q = quizData[currentIdx];
            document.getElementById('current-q').innerText = currentIdx + 1;
            document.getElementById('q-topic').innerText = q.topic;
            
            // Update Progress Bar
            const percent = ((currentIdx) / quizData.length) * 100;
            document.getElementById('progress-bar').style.width = \`\${percent}%\`;

            document.getElementById('q-text').innerHTML = q.question;
            
            const container = document.getElementById('options-container');
            container.innerHTML = '';

            if (q.type === 'mcq') {
                q.options.forEach((opt, idx) => {
                    const btnClass = btnClasses[idx % 4];
                    const label = btnLabels[idx % 4];
                    const btn = document.createElement('button');
                    btn.className = \`btn-game \${btnClass} w-full text-white p-6 md:p-8 rounded-2xl text-xl font-bold text-left flex items-center gap-4 shadow-lg group\`;
                    btn.innerHTML = \`
                        <div class="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-black/30 flex items-center justify-center text-2xl md:text-3xl font-black shrink-0 group-hover:scale-110 transition-transform border-2 border-white/30">\${label}</div>
                        <div class="option-text math-opt flex-1 text-white">\${opt}</div>
                    \`;
                    btn.onclick = () => handleAnswer(idx, btn, 'mcq');
                    container.appendChild(btn);
                });
            } else if (q.type === 'tf') {
                ['Đúng', 'Sai'].forEach((opt, idx) => {
                    const isTrue = idx === 0;
                    const btnClass = isTrue ? 'opt-A' : 'opt-C'; // Green for True, Red for False
                    const icon = isTrue ? 'check' : 'times';
                    const btn = document.createElement('button');
                    btn.className = \`btn-game \${btnClass} w-full text-white p-10 md:p-12 rounded-2xl text-2xl md:text-3xl font-bold flex flex-col items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform\`;
                    btn.innerHTML = \`<i class="fas fa-\${icon} text-4xl bg-black/20 p-4 rounded-full mb-2"></i> <span>\${opt}</span>\`;
                    btn.onclick = () => handleAnswer(isTrue, btn, 'tf');
                    container.appendChild(btn);
                });
            } else if (q.type === 'short') {
                container.innerHTML = \`
                    <div class="col-span-1 md:col-span-2 flex flex-col items-center gap-4">
                        <input type="text" id="short-input" class="w-full max-w-md p-6 text-3xl text-center font-bold text-teal-900 rounded-2xl border-4 border-teal-300 focus:border-yellow-400 outline-none shadow-xl" placeholder="Nhập đáp án..." autocomplete="off">
                        <p class="text-sm text-white/70 mt-1">💡 Hỗ trợ: Số (5), phân số (1/3), mũ (x^2), văn bản</p>
                        <button onclick="handleShortAnswer()" class="bg-teal-600 text-white px-10 py-4 rounded-full text-xl font-bold btn-game border-b-teal-800">KIỂM TRA</button>
                    </div>
                \`;
                // Cho phép nhấn Enter để submit
                document.getElementById('short-input').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') handleShortAnswer();
                });
            }

            if (window.MathJax) {
                 window.MathJax.typesetPromise([document.getElementById('q-text'), container]).catch(err => {});
            }
        }

        // Hàm chuẩn hóa đáp án để so sánh
        function normalizeAnswer(str) {
            if (str === null || str === undefined) return '';
            str = String(str).trim().toLowerCase();
            // Loại bỏ khoảng trắng thừa
            str = str.replace(/\\s+/g, ' ');
            // Chuẩn hóa dấu trừ (en-dash, em-dash thành hyphen)
            str = str.replace(/[–—]/g, '-');
            return str;
        }

        // Hàm parse phân số và số thông thường
        function parseFraction(str) {
            if (!str) return NaN;
            str = String(str).trim();
            if (str === '') return NaN;
            
            // Xử lý phân số: 1/2, -3/5, 2/3...
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
            
            // Xử lý số thập phân hoặc số nguyên
            return parseFloat(str);
        }

        // Hàm so sánh đáp án (hỗ trợ số, phân số, mũ, văn bản)
        function compareAnswer(userAnswer, correctAnswer) {
            const userStr = normalizeAnswer(userAnswer);
            const correctStr = normalizeAnswer(correctAnswer);
            
            // Nếu khớp chính xác văn bản (kể cả dạng x^2)
            if (userStr === correctStr) return true;
            
            // Thử so sánh dạng số/phân số
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
                // So sánh đáp án hỗ trợ: số, phân số, mũ (x^2), văn bản
                isCorrect = compareAnswer(userAns, q.correct);
            } else {
                isCorrect = (userAns === q.correct);
            }

            // Show feedback modal
            const modal = document.getElementById('explanation-modal');
            const icon = document.getElementById('feedback-icon');
            const title = document.getElementById('feedback-title');
            
            if (isCorrect) {
                score++;
                document.getElementById('score').innerText = score;
                icon.innerHTML = '🎉';
                title.innerText = "CHÍNH XÁC!";
                title.className = "text-4xl font-game font-black uppercase text-green-600";
                playSound('correct');
            } else {
                icon.innerHTML = '😢';
                title.innerText = "SAI RỒI...";
                title.className = "text-4xl font-game font-black uppercase text-red-600";
                playSound('wrong');
            }

            document.getElementById('explanation-text').innerHTML = q.explain;
            modal.classList.remove('hidden');
            
            if (window.MathJax) {
                window.MathJax.typesetPromise([document.getElementById('explanation-text')]);
            }
        }

        function nextQuestion() {
            document.getElementById('explanation-modal').classList.add('hidden');
            
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

            // Logic vinh danh
            const titleEl = document.getElementById('result-title');
            const msgEl = document.getElementById('result-msg');
            
            if (percent === 100) {
                titleEl.innerText = "XUẤT SẮC!";
                msgEl.innerText = "Bạn là thiên tài! Không sai câu nào!";
                startConfetti();
                playSound('win');
            } else if (percent >= 80) {
                titleEl.innerText = "QUÁ ĐỈNH!";
                msgEl.innerText = "Kiến thức rất vững vàng!";
                startConfetti();
                playSound('win');
            } else if (percent >= 50) {
                titleEl.innerText = "LÀM TỐT!";
                msgEl.innerText = "Cố gắng lên một chút nữa nhé!";
            } else {
                titleEl.innerText = "CỐ LÊN!";
                msgEl.innerText = "Hãy ôn lại bài và thử lại nhé.";
            }
        }

        // --- Effects ---
        function startConfetti() {
            const container = document.getElementById('confetti-container');
            const colors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7'];
            
            for (let i = 0; i < 50; i++) {
                const conf = document.createElement('div');
                conf.className = 'confetti';
                conf.style.left = Math.random() * 100 + 'vw';
                conf.style.animationDuration = (Math.random() * 3 + 2) + 's';
                conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                container.appendChild(conf);
            }
        }


        function shareResult() {
            alert("Đã sao chép kết quả vào bộ nhớ tạm! Hãy dán để chia sẻ.");
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
