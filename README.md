<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Kitty Countdown</title>
    <style>
        :root {
            --pink-pastel: #FFD1DC;
            --blue-pastel: #AEC6CF;
            --bg-cream: #FFFDD0;
            --text-color: #6D5959;
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

        /* Stage Area */
        .canvas {
            position: relative;
            width: 90%;
            height: 50vh;
            margin-top: 5vh;
            border-bottom: 4px dashed #E8D3A7;
        }

        .character-wrapper {
            position: absolute;
            bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: all 0.5s ease;
        }

        #female-side {
            left: 5%;
        }

        #male-side {
            right: 5%;
        }

        .asset-container {
            width: 110px;
            height: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .airport-building {
            width: 130px;
            height: 130px;
            margin-bottom: -10px;
        }

        /* Flight Path Dotted Arc */
        svg.sky-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        path#flight-arc {
            stroke: #B19FFB;
            stroke-width: 4;
            stroke-dasharray: 8, 8;
            fill: none;
        }

        .moving-plane-container {
            position: absolute;
            width: 70px;
            height: 70px;
            transform: translate(-50%, -50%);
            display: none;
        }

        /* Countdown Container */
        .countdown-container {
            text-align: center;
            margin-bottom: 8vh;
            background: rgba(255, 255, 255, 0.9);
            padding: 25px 50px;
            border-radius: 30px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            border: 3px solid var(--pink-pastel);
            width: 80%;
            max-width: 500px;
        }

        .headline {
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 15px;
            letter-spacing: 2px;
        }

        .timer-display {
            font-size: 2.8rem;
            font-weight: bold;
            letter-spacing: 4px;
            display: flex;
            justify-content: center;
            gap: 10px;
        }

        .labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            margin-top: 8px;
            opacity: 0.8;
            padding: 0 5px;
        }
        
        .labels span {
            width: 75px;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="canvas" id="canvas">
        <svg class="sky-canvas">
            <path id="flight-arc" d="" />
        </svg>

        <div class="character-wrapper" id="female-side">
            <div class="airport-building">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <rect x="20" y="40" width="60" height="50" rx="5" fill="#F3E5AB" />
                    <rect x="35" y="15" width="30" height="25" rx="3" fill="#D2B48C" />
                    <circle cx="50" cy="28" r="8" fill="#FFF" />
                    <rect x="42" y="65" width="16" height="25" fill="#6D5959" />
                    <rect x="28" y="48" width="10" height="12" fill="#AEC6CF" />
                    <rect x="62" y="48" width="10" height="12" fill="#AEC6CF" />
                    <path d="M 30 15 L 70 15" stroke="#6D5959" stroke-width="3" />
                </svg>
            </div>
            <div class="asset-container" id="female-kitty">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <ellipse cx="50" cy="55" rx="35" ry="28" fill="#FFFFFF" stroke="#6D5959" stroke-width="3" />
                    <polygon points="22,34 15,10 38,28" fill="#FFFFFF" stroke="#6D5959" stroke-width="3" />
                    <polygon points="78,34 85,10 62,28" fill="#FFFFFF" stroke="#6D5959" stroke-width="3" />
                    <circle cx="38" cy="52" r="4" fill="#6D5959" />
                    <circle cx="62" cy="52" r="4" fill="#6D5959" />
                    <ellipse cx="50" cy="60" rx="5" ry="3" fill="#FBC02D" />
                    <circle cx="28" cy="30" r="7" fill="#FFB6C1" />
                    <circle cx="40" cy="32" r="7" fill="#FFB6C1" />
                    <polygon points="34,31 34,35 35,33" fill="#6D5959" />
                </svg>
            </div>
        </div>

        <div class="moving-plane-container" id="moving-plane">
            <svg viewBox="0 0 100 100" width="100%" height="100%" style="transform: scaleX(-1);">
                <path d="M12,50 Q35,35 80,42 Q90,45 85,50 Q90,55 80,58 Q35,65 12,50 Z" fill="#B19FFB" stroke="#6D5959" stroke-width="2" />
                <path d="M45,43 L25,15 L38,15 L60,44 Z" fill="#9575CD" stroke="#6D5959" stroke-width="2" />
                <path d="M45,57 L25,85 L38,85 L60,56 Z" fill="#9575CD" stroke="#6D5959" stroke-width="2" />
            </svg>
        </div>

        <div class="character-wrapper" id="male-side">
            <div class="asset-container" id="grounded-plane" style="width: 70px; height: 70px; margin-bottom: 10px;">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <path d="M12,50 Q35,35 80,42 Q90,45 85,50 Q90,55 80,58 Q35,65 12,50 Z" fill="#B19FFB" stroke="#6D5959" stroke-width="2" />
                    <path d="M45,43 L25,15 L38,15 L60,44 Z" fill="#9575CD" stroke="#6D5959" stroke-width="2" />
                    <path d="M45,57 L25,85 L38,85 L60,56 Z" fill="#9575CD" stroke="#6D5959" stroke-width="2" />
                </svg>
            </div>
            <div class="asset-container" id="male-kitty">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <ellipse cx="50" cy="55" rx="35" ry="28" fill="#FFFFFF" stroke="#6D5959" stroke-width="3" />
                    <polygon points="22,34 15,10 38,28" fill="#FFFFFF" stroke="#6D5959" stroke-width="3" />
                    <polygon points="78,34 85,10 62,28" fill="#FFFFFF" stroke="#6D5959" stroke-width="3" />
                    <circle cx="38" cy="52" r="4" fill="#6D5959" />
                    <circle cx="62" cy="52" r="4" fill="#6D5959" />
                    <ellipse cx="50" cy="60" rx="5" ry="3" fill="#FBC02D" />
                    <circle cx="60" cy="32" r="7" fill="#98FB98" />
                    <circle cx="72" cy="30" r="7" fill="#98FB98" />
                    <polygon points="66,31 66,35 65,33" fill="#6D5959" />
                </svg>
            </div>
        </div>
    </div>

    <div class="countdown-container">
        <div id="headline" class="headline">Counting down the moments...</div>
        <div class="timer-display" id="clock">00 : 00 : 00 : 00</div>
        <div class="labels">
            <span>Days</span>
            <span>Hours</span>
            <span>Mins</span>
            <span>Secs</span>
        </div>
    </div>

    <script>
        // ==========================================
        // CONFIGURATION: TIMELINES SET FOR MAY 27
        // ==========================================
        const CONFIG = {
            departureTime: new Date("May 27, 2026 06:10:00").getTime(),
            arrivalTime: new Date("May 27, 2026 09:00:00").getTime()
        };

        function updateSystem() {
            const now = new Date().getTime();
            const clockDisplay = document.getElementById('clock');
            const headline = document.getElementById('headline');
            const femaleKitty = document.getElementById('female-kitty');
            const maleKitty = document.getElementById('male-kitty');
            const groundedPlane = document.getElementById('grounded-plane');
            const movingPlane = document.getElementById('moving-plane');

            let timeRemaining = CONFIG.arrivalTime - now;

            if (timeRemaining < 0) {
                clockDisplay.innerHTML = "00 : 00 : 00 : 00";
                headline.innerHTML = "Together At Last! ❤️";
                femaleKitty.style.filter = "none";
                maleKitty.style.display = "block";
                
                document.getElementById('male-side').style.right = "auto";
                document.getElementById('male-side').style.left = "22%";
                groundedPlane.style.display = "none";
                movingPlane.style.display = "none";
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            clockDisplay.innerHTML = 
                `<span>${String(days).padStart(2, '0')}</span>:<span>${String(hours).padStart(2, '0')}</span>:<span>${String(minutes).padStart(2, '0')}</span>:<span>${String(seconds).padStart(2, '0')}</span>`;

            // Real-time Sadness/Grayscale Drop Logic for Female Kitty
            const totalWaitDuration = 4 * 24 * 60 * 60 * 1000; 
            const elapsed = totalWaitDuration - (CONFIG.departureTime - now);
            let sadnessRatio = 1 - (elapsed / totalWaitDuration);
            if (sadnessRatio < 0) sadnessRatio = 0;
            if (sadnessRatio > 1) sadnessRatio = 1;
            femaleKitty.style.filter = `grayscale(${sadnessRatio * 80}%) opacity(${50 + (1 - sadnessRatio) * 50}%)`;

            // Flight Animation Stages
            if (now < CONFIG.departureTime) {
                headline.innerHTML = "Counting down the moments...";
                movingPlane.style.display = "none";
                maleKitty.style.display = "block";
                groundedPlane.style.display = "block";
            } 
            else if (now >= CONFIG.departureTime && now < CONFIG.arrivalTime) {
                headline.innerHTML = "🚨 MISSION UPDATE: Boarding Initiated! In Transit! ✈️";
                maleKitty.style.display = "none"; 
                groundedPlane.style.display = "none"; 
                movingPlane.style.display = "block";

                const flightProgress = (now - CONFIG.departureTime) / (CONFIG.arrivalTime - CONFIG.departureTime);
                movePlaneAlongArc(flightProgress);
            }
        }

        function setupArc() {
            const canvas = document.getElementById('canvas');
            const path = document.getElementById('flight-arc');
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;

            const startX = w * 0.85;
            const startY = h - 140;
            const endX = w * 0.15;
            const endY = h - 140;
            const controlX = w / 2;
            const controlY = 20; 

            path.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
        }

        function movePlaneAlongArc(progress) {
            const path = document.getElementById('flight-arc');
            const plane = document.getElementById('moving-plane');
            const totalLength = path.getTotalLength();
            
            const pointLength = totalLength * (1 - progress); 
            const point = path.getPointAtLength(pointLength);

            plane.style.left = `${point.x}px`;
            plane.style.top = `${point.y}px`;
        }

        window.addEventListener('resize', setupArc);
        setupArc();
        setInterval(updateSystem, 1000);
        updateSystem();
    </script>
</body>
</html>
