<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

        body {
            margin: 0;
            padding: 0;
            font-family: 'Courier New', Courier, monospace;
            background-color: var(--bg-cream);
            color: var(--text-color);
            overflow: hidden;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }

        /* Main Stage View */
        .sky-arena {
            position: relative;
            width: 95%;
            height: 50vh;
            margin-top: 3vh;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-bottom: 20px;
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
            font-size: 1.2rem;
            font-weight: bold;
            margin: 5px 0;
        }

        .target-badge {
            font-size: 0.85rem;
            opacity: 0.8;
        }

        /* Characters and Anchors */
        .actor-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 2;
            width: 160px;
        }

        .kitty-image {
            width: 110px;
            height: 110px;
            object-fit: contain;
            transition: filter 0.5s ease;
        }

        .airport-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .airport-image {
            width: 130px;
            height: 130px;
            object-fit: contain;
        }

        .waiting-airplane {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }

        .airplane-image-waiting {
            width: 100px;
            height: 100px;
            object-fit: contain;
        }

        .status-pill {
            background: var(--pink-pastel);
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: bold;
        }

        /* SVG Flight Curve Canvas */
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
            width: 110px;
            height: 110px;
            transform: translate(-50%, -50%);
            display: none;
            object-fit: contain;
            z-index: 5;
        }

        /* Interactive Notepad Container */
        .notepad-container {
            width: 80%;
            max-width: 450px;
            background: var(--notepad-bg);
            border: 2px solid #E8D3A7;
            border-radius: 16px;
            padding: 12px 16px;
            box-shadow: 0 6px 12px rgba(0,0,0,0.03);
            z-index: 10;
            margin-bottom: 15px;
        }

        .notepad-header {
            font-size: 0.85rem;
            font-weight: bold;
            margin-bottom: 6px;
            display: flex;
            justify-content: space-between;
            opacity: 0.8;
        }

        .notepad-textarea {
            width: 100%;
            height: 60px;
            background: transparent;
            border: none;
            resize: none;
            font-family: inherit;
            font-size: 0.9rem;
            color: var(--text-color);
            outline: none;
            padding: 0;
            box-sizing: border-box;
            line-height: 1.4;
        }

        .word-counter {
            font-size: 0.75rem;
            font-weight: bold;
        }

        .word-limit-reached {
            color: #FF6B6B;
            animation: shake 0.2s ease-in-out;
        }

        /* Lower Center Countdown Structure */
        .countdown-container {
            text-align: center;
            margin-bottom: 3vh;
            background: var(--card-bg);
            padding: 15px 40px;
            border-radius: 30px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.04);
            border: 3px solid var(--pink-pastel);
            min-width: 320px;
            z-index: 10;
        }

        .countdown-grid {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }

        .timer-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .number-box {
            font-size: 2.8rem;
            font-weight: bold;
            letter-spacing: 2px;
        }

        .unit-label {
            font-size: 0.8rem;
            opacity: 0.7;
            margin-top: 4px;
        }

        .divider {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 22px;
        }

        .celebration-card h2 {
            margin: 5px 0;
            font-size: 1.5rem;
            color: #D87093;
        }

        /* Interactive Time Machine Sandbox Drawer */
        .time-machine-drawer {
            width: 100%;
            background: rgba(255, 255, 255, 0.7);
            border-top: 2px dashed var(--pink-pastel);
            padding: 10px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            z-index: 10;
        }

        .sandbox-label {
            font-size: 0.8rem;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .sandbox-controls {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .sandbox-btn {
            background: white;
            border: 1px solid var(--text-color);
            padding: 4px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.75rem;
        }

        .sandbox-btn.active {
            background: var(--text-color);
            color: white;
        }

        /* Dynamic Animations */
        @keyframes bounce {
            0%, 100% { transform: translateY(0) scale(1.05) scaleX(-1); }
            50% { transform: translateY(-10px) scale(1.05) scaleX(-1); }
        }
        .bouncing-kitty {
            animation: bounce 0.6s infinite ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
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
                <div id="reunion-spot" style="position: absolute; top: 20px; display: none;">
                    <img class="kitty-image" src="https://assets.floot.app/307326dd-6ce5-42b7-86bf-e8cad4d22c41/cd16e5f0-4f15-4014-80fa-0ae101cc4e1b.png" alt="Male Kitty Arrived" style="width: 70px; height: 70px;">
                </div>
            </div>
        </div>

        <div class="flight-svg-container">
            <svg class="flight-svg">
                <path id="flightPath" d="" fill="none" stroke="var(--flight-path-color)" stroke-width="4" stroke-dasharray="8,10" stroke-linecap="round" />
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

        // Notepad Logic with Local Storage Persistence
        const noteInput = document.getElementById('note-input');
        const wordCountDisplay = document.getElementById('word-count-display');

        // Load saved note if it exists
        if (localStorage.getItem('kitty_note')) {
            noteInput.value = localStorage.getItem('kitty_note');
            validateAndCountWords();
        }

        noteInput.addEventListener('input', validateAndCountWords);

        function validateAndCountWords(e) {
            let text = noteInput.value;
            // Split by spaces, filtering out empty entries
            let words = text.trim().split(/\s+/).filter(w => w.length > 0);
            let wordCount = words.length;

            if (wordCount > 50) {
                // Slice text back to first 50 words
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

            // Happiness Calculations
            const maxSadWindow = 30 * 24 * 60 * 60 * 1000;
            let happiness = 1;
            if (timeToDeparture > 0) {
                happiness = timeToDeparture >= maxSadWindow ? 0 : 1 - (timeToDeparture / maxSadWindow);
            }

            const femaleKitty = document.getElementById('female-kitty');
            femaleKitty.style.filter = `grayscale(${Math.max(0, 1 - happiness)}) contrast(${0.9 + happiness * 0.1}) brightness(${0.95 + happiness * 0.05})`;

            // UI Layout and View Toggles
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
                    
                    // Track path updates
                    const path = document.getElementById('flightPath');
                    const totalLength = path.getTotalLength();
                    const progress = (now - DEPARTURE_TIME) / (ARRIVAL_TIME - DEPARTURE_TIME);
                    
                    // Trace Right to Left vector calculations
                    const pointLength = totalLength * (1 - progress);
                    const point = path.getPointAtLength(pointLength);
                    
                    movingPlane.style.left = `${point.x}px`;
                    movingPlane.style.top = `${point.y}px`;
                    movingPlane.style.transform = "translate(-50%, -50%) scaleX(-1)";
                } else {
                    statusText.textContent = "Counting down to when we're together... 💕";
                    maleKitty.style.block = "block";
                    staticPlaneBox.style.display = "flex";
                    movingPlane.style.display = "none";
                }
            }

            // Core Tracker Numerical Countdown Engine
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

            // Generate absolute geometry vectors tracking Left and Right side dimensions
            const startX = 140; 
            const startY = h - 100;
            const endX = w - 140; 
            const endY = h - 100;
            const controlX = w / 2;
            const controlY = 40; 

            path.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
            updateSystem();
        }

        window.addEventListener('resize', buildArc);
        buildArc();
        setInterval(updateSystem, 1000);
    </script>
</body>
</html>
