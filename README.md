<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Chibi Flight Countdown ✈️💕</title>
    <style>
        :root {
            --pink-pastel: #FFD1DC;
            --blue-pastel: #AEC6CF;
            --bg-cream: #FFFDD0;
            --text-color: #6D5959;
            --flight-path-color: #B19FFB;
            --card-bg: rgba(255, 255, 255, 0.9);
            --notepad-bg: #FFFDF3;
        }

        /* Forces any backend theme-injected header to hide completely */
        header, .site-header, #projectkitty-header, [class*="header"] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        html, body {
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box;
            background-color: var(--bg-cream);
            -webkit-text-size-adjust: 100%;
            touch-action: manipulation;
        }

        body {
            font-family: 'Courier New', Courier, monospace;
            color: var(--text-color);
            overflow: hidden;
            /* Uses Dynamic Viewport Height to prevent Safari mobile address bar clipping shifts */
            height: 100dvh; 
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            /* Protects content from slipping under the Dynamic Island or the home indicator */
            padding-top: env(safe-area-inset-top, 20px);
            padding-bottom: env(safe-area-inset-bottom, 10px);
        }

        /* Main Arena scaling tailored for vertical mobile layouts */
        .sky-arena {
            position: relative;
            width: 95%;
            height: 40vh;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-bottom: 10px;
            z-index: 5;
        }

        .intro-banner {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            width: 100%;
        }

        .intro-text {
            font-size: 1.05rem;
            font-weight: bold;
            margin: 3px 0;
            padding: 0 10px;
        }

        .target-badge {
            font-size: 0.75rem;
            opacity: 0.8;
        }

        /* Responsive Character Containers scaled safely for the iPhone 15 frame */
        .actor-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 2;
            width: 28%; 
            max-width: 120px;
        }

        .kitty-image {
            width: 100%;
            height: auto;
            max-height: 85px;
            object-fit: contain;
            transition: filter 0.5s ease;
        }

        .airport-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .airport-image {
            width: 100%;
            height: auto;
            max-height: 100px;
            object-fit: contain;
        }

        .waiting-airplane {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3px;
            width: 100%;
        }

        .airplane-image-waiting {
            width: 90%;
            height: auto;
            max-height: 75px;
            object-fit: contain;
        }

        .status-pill {
            background: var(--pink-pastel);
            padding: 3px 6px;
            border-radius: 12px;
            font-size: 0.65rem;
            font-weight: bold;
            white-space: nowrap;
        }

        .flight-svg-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .flight-svg {
            width: 100%;
            height: 100%;
        }

        #moving-plane {
            position: absolute;
            width: 75px;
            height: 75px;
            transform: translate(-50%, -50%);
            display: none;
            object-fit: contain;
            z-index: 5;
        }

        /* Clean Mobile Notepad Container */
        .notepad-container {
            width: 85%;
            max-width: 400px;
            background: var(--notepad-bg);
            border: 2px solid #E8D3A7;
            border-radius: 14px;
            padding: 10px 14px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.03);
            z-index: 10;
            margin-bottom: 10px;
        }

        .notepad-header {
            font-size: 0.8rem;
            font-weight: bold;
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
            opacity: 0.8;
        }

        .notepad-textarea {
            width: 100%;
            height: 50px;
            background: transparent;
            border: none;
            resize: none;
            font-family: inherit;
            font-size: 0.85rem;
            color: var(--text-color);
            outline: none;
            padding: 0;
            box-sizing: border-box;
            line-height: 1.3;
            -webkit-appearance: none; /* Strips native iOS shadow overlays */
        }

        .word-counter {
            font-size: 0.7rem;
            font-weight: bold;
        }

        .word-limit-reached {
            color: #FF6B6B;
            animation: shake 0.2s ease-in-out;
        }

        /* Responsive Mobile Target Card */
        .countdown-container {
            text-align: center;
            margin-bottom: 15px;
            background: var(--card-bg);
            padding: 12px 25px;
            border-radius: 24px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.04);
            border: 2.5px solid var(--pink-pastel);
            width: 80%;
            max-width: 340px;
            min-width: 280px;
            z-index: 10;
            box-sizing: border-box;
        }

        .countdown-grid {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .timer-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .number-box {
            font-size: 2rem;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .unit-label {
            font-size: 0.7rem;
            opacity: 0.7;
            margin-top: 2px;
        }

        .divider {
            font-size: 1.8rem;
            font-weight: bold;
            margin-bottom: 14px;
        }

        .celebration-card h2 {
            margin: 4px 0;
            font-size: 1.25rem;
            color: #D87093;
        }

        /* Compact Time Machine Sandbox Area for Mobile */
        .time-machine-drawer {
            width: 100%;
            background: rgba(255, 255, 255, 0.85);
            border-top: 1.5px dashed var(--pink-pastel);
            padding: 8px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            z-index: 10;
        }

        .sandbox-label {
            font-size: 0.75rem;
            font-weight: bold;
            letter-spacing: 0.5px;
        }

        .sandbox-controls {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0 10px;
        }

        .sandbox-btn {
            background: white;
            border: 1px solid var(--text-color);
            padding: 4px 8px;
            border-radius: 6px;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.7rem;
        }

        .sandbox-btn.active {
            background: var(--text-color);
            color: white;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0) scale(1.05) scaleX(-1); }
            50% { transform: translateY(-6px) scale(1.05) scaleX(-1); }
        }
        .bouncing-kitty {
            animation: bounce 0.6s infinite ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
        }

        /* Specific CSS adjustment fallback targeting desktop screen layout proportions */
        @media (min-width: 600px) {
            .sky-arena { height: 50vh; margin-top: 6vh; }
            .intro-text { font-size: 1.2rem; }
            .target-badge { font-size: 0.85rem; }
            .actor-container { width: 160px; max-width: none; }
            .kitty-image { max-height: 110px; }
            .airport-image { max-height: 130px; }
            .airplane-image-waiting { max-height: 100px; }
            .status-pill { font-size: 0.75rem; padding: 4px 10px; }
            #moving-plane { width: 110px; height: 110px; }
            .notepad-container { padding: 12px 16px; margin-bottom: 15px; }
            .notepad-header { font-size: 0.85rem; }
            .notepad-textarea { height: 60px; font-size: 0.9rem; }
            .countdown-container { padding: 15px 40px; border-radius: 30px; width: auto; max-width: none; }
            .number-box { font-size: 2.8rem; }
            .unit-label { font-size: 0.8rem; }
            .divider { font-size: 2.5rem; margin-bottom: 22px; }
            .time-machine-drawer { padding: 10px 0; gap: 8px; }
            .sandbox-label { font-size: 0.8rem; }
            .sandbox-btn { font-size: 0.75rem; padding: 4px 10px; }
        }
    </style>
</head>
<body>

    <main class="sky-arena" id="arena">
        <div class="intro-banner">
            <p class="intro-text" id="status-text">Counting down to when we're together... 💕</p>
            <div class="target-badge">📅 Target Arrival: May 27, 2026 at 9:00 AM</div>
        </div>

        <div class="actor-container" style="margin-left: 2%;">
            <img id="female-kitty" class="kitty-image" src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/48c8bfcc-972b-40af-b3ac-fb014035ac04.png" alt="Female Kitty" style="transform: scaleX(-1);">
            <div class="airport-wrapper">
                <img class="airport-image" src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/80de626a-f746-4cb9-9c68-add1b5583100.png" alt="Airport">
                <div id="reunion-spot" style="position: absolute; top: 15px; display: none; width: 60%;">
                    <img class="kitty-image" src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/cd16e5f0-4f15-4014-80fa-0ae101cc4e1b.png" alt="Male Kitty Arrived">
                </div>
            </div>
        </div>

        <div class="flight-svg-container">
            <svg class="flight-svg">
                <path id="flightPath" d="" fill="none" stroke="var(--flight-path-color)" stroke-width="3" stroke-dasharray="6,8" stroke-linecap="round" />
            </svg>
        </div>
        
        <img id="moving-plane" src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/9f999e37-1eab-41cd-a3f8-5a1811b2a909.png" alt="Flying Airplane">

        <div class="actor-container" id="right-hangar" style="margin-right: 2%;">
            <img id="male-kitty" class="kitty-image" src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/cd16e5f0-4f15-4014-80fa-0ae101cc4e1b.png" alt="Male Kitty">
            <div class="waiting-airplane" id="static-plane-box">
                <img class="airplane-image-waiting" src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/9f999e37-1eab-41cd-a3f8-5a1811b2a909.png" alt="Grounded Airplane">
                <div class="status-pill">Boarding Soon</div>
            </div>
        </div>
    </main>

    <div class="notepad-container">
        <div class="notepad-header">
            <span>📝 Leave a Note:</span>
            <span class="word-counter" id="word-count-display">0 / 50 words</span>
        </div>
        <textarea class="notepad-textarea" id="note-input" placeholder="Type a sweet message here..."></textarea>
    </div>

    <div class="countdown-container" id="countdown-board">
        <div class="countdown-grid" id="timer-grid">
            <div class="timer-unit"><div class="number-box" id="d-val">00</div><span class="unit-label">Days</span></div>
            <span class="divider">:</span>
            <div class="timer-unit"><div class="number-box" id="h-val">00</div><span class="unit-label">Hours</span></div>
            <span class="divider">:</span>
            <div class="timer-unit"><div class="number-box" id="m-val">00</div><span class="unit-label">Minutes</span></div>
            <span class="divider">:</span>
            <div class="timer-unit"><div class="number-box" id="s-val">00</div><span class="unit-label">Seconds</span></div>
        </div>
        <div class="celebration-card" id="celebration-box" style="display: none;">
            <h2>✨ He's Here! We are Together! ✨</h2>
            <p>Arrived on May 27, 2026!</p>
        </div>
    </div>

    <footer class="time-machine-drawer">
        <div class="sandbox-label">🔄 Simulation Time Machine:</div>
        <div class="sandbox-controls">
            <button class="sandbox-btn active" onclick="switchMode('real', this)">Real Time</button>
            <button class="sandbox-btn" onclick="switchMode('waiting_sad', this)">Sad (30 Days Away)</button>
            <button class="sandbox-btn" onclick="switchMode('waiting_happy', this)">Happy (1 Hour Away)</button>
            <button class="sandbox-btn" onclick="switchMode('flight', this)">Flight Mode</button>
            <button class="sandbox-btn" onclick="switchMode('landed', this)">Landed</button>
        </div>
    </footer>

    <script>
        const DEPARTURE_TIME = new Date("2026-05-27T06:10:00").getTime();
        const ARRIVAL_TIME = new Date("2026-05-27T09:00:00").getTime();
        
        let currentMode = "real";

        const noteInput = document.getElementById('note-input');
        const wordCountDisplay = document.getElementById('word-count-display');

        if (localStorage.getItem('kitty_note')) {
            noteInput.value = localStorage.getItem('kitty_note');
            validateAndCountWords();
        }

        noteInput.addEventListener('input', validateAndCountWords);

        function validateAndCountWords(e) {
            let text = noteInput.value;
            let words = text.trim().split(/\s+/).filter(w => w.length > 0);
            let wordCount = words.length;

            if (wordCount > 50) {
                const dynamicRegex = new RegExp(`(?:\\s*\\S+\\s*){1,50}`);
                const trimmedText = text.match(dynamicRegex);
                noteInput.value = trimmedText ? trimmedText[0].trim() : text;
                words = noteInput.value.trim().split(/\s+/).filter(w => w.length > 0);
                wordCount = words.length;
                wordCountDisplay.classList.add('word-limit-reached');
            } else {
                wordCountDisplay.classList.remove('word-limit-reached');
            }

            wordCountDisplay.textContent = `${wordCount} / 50 words`;
            localStorage.setItem('kitty_note', noteInput.value);
        }

        function switchMode(mode, btn) {
            currentMode = mode;
            document.querySelectorAll('.sandbox-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateSystem();
        }

        function updateSystem() {
            let now = new Date().getTime();
            
            if (currentMode === "waiting_sad") now = DEPARTURE_TIME - (28 * 24 * 60 * 60 * 1000);
            else if (currentMode === "waiting_happy") now = DEPARTURE_TIME - (1 * 60 * 60 * 1000);
            else if (currentMode === "flight") now = DEPARTURE_TIME + (1.5 * 60 * 60 * 1000);
            else if (currentMode === "landed") now = ARRIVAL_TIME + 1000;

            const timeToDeparture = DEPARTURE_TIME - now;
            const timeToArrival = ARRIVAL_TIME - now;
            const isFlightMode = now >= DEPARTURE_TIME && now < ARRIVAL_TIME;
            const isLanded = now >= ARRIVAL_TIME;

            const maxSadWindow = 30 * 24 * 60 * 60 * 1000;
            let happiness = 1;
            if (timeToDeparture > 0) {
                happiness = timeToDeparture >= maxSadWindow ? 0 : 1 - (timeToDeparture / maxSadWindow);
            }

            const femaleKitty = document.getElementById('female-kitty');
            femaleKitty.style.filter = `grayscale(${Math.max(0, 1 - happiness)}) contrast(${0.9 + happiness * 0.1}) brightness(${0.95 + happiness * 0.05})`;

            const statusText = document.getElementById('status-text');
            const maleKitty = document.getElementById('male-kitty');
            const staticPlaneBox = document.getElementById('static-plane-box');
            const movingPlane = document.getElementById('moving-plane');
            const reunionSpot = document.getElementById('reunion-spot');
            const timerGrid = document.getElementById('timer-grid');
            const celebrationBox = document.getElementById('celebration-box');

            if (isLanded) {
                statusText.textContent = "The wait is over! Together at last! 💕";
                femaleKitty.classList.add('bouncing-kitty');
                maleKitty.style.display = "none";
                staticPlaneBox.style.display = "none";
                movingPlane.style.display = "none";
                reunionSpot.style.display = "block";
                timerGrid.style.display = "none";
                celebrationBox.style.display = "block";
            } else {
                femaleKitty.classList.remove('bouncing-kitty');
                reunionSpot.style.display = "none";
                timerGrid.style.display = "flex";
                celebrationBox.style.display = "none";

                if (isFlightMode) {
                    statusText.textContent = "He is in the air right now! ✈️ Heading home...";
                    maleKitty.style.display = "none";
                    staticPlaneBox.style.display = "none";
                    movingPlane.style.display = "block";
                    
                    const path = document.getElementById('flightPath');
                    const totalLength = path.getTotalLength();
                    const progress = (now - DEPARTURE_TIME) / (ARRIVAL_TIME - DEPARTURE_TIME);
                    
                    const pointLength = totalLength * (1 - progress);
                    const point = path.getPointAtLength(pointLength);
                    
                    movingPlane.style.left = `${point.x}px`;
                    movingPlane.style.top = `${point.y}px`;
                    movingPlane.style.transform = "translate(-50%, -50%) scaleX(-1)";
                } else {
                    statusText.textContent = "Counting down to when we're together... 💕";
                    maleKitty.style.display = "block";
                    staticPlaneBox.style.display = "flex";
                    movingPlane.style.display = "none";
                }
            }

            const totalSecondsRemaining = Math.max(0, Math.floor(timeToArrival / 1000));
            const d = Math.floor(totalSecondsRemaining / (24 * 3600));
            const h = Math.floor((totalSecondsRemaining % (24 * 3600)) / 3600);
            const m = Math.floor((totalSecondsRemaining % 3600) / 60);
            const s = totalSecondsRemaining % 60;

            document.getElementById('d-val').textContent = String(d).padStart(2, "0");
            document.getElementById('h-val').textContent = String(h).padStart(2, "0");
            document.getElementById('m-val').textContent = String(m).padStart(2, "0");
            document.getElementById('s-val').textContent = String(s).padStart(2, "0");
        }

        function buildArc() {
            const arena = document.getElementById('arena');
            const path = document.getElementById('flightPath');
            const w = arena.offsetWidth;
            const h = arena.offsetHeight;

            // Compute smart alignment coordinates to match mobile character widths
            const offset = window.innerWidth < 600 ? w * 0.14 : 140;
            const startX = offset; 
            const startY = h - (window.innerWidth < 600 ? 50 : 100);
            const endX = w - offset; 
            const endY = startY;
            const controlX = w / 2;
            const controlY = window.innerWidth < 600 ? 20 : 40; 

            path.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
            updateSystem();
        }

        window.addEventListener('resize', buildArc);
        buildArc();
        setInterval(updateSystem, 1000);
    </script>
</body>
</html>
