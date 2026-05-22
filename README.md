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

        .asset-img {
            width: 120px;
            height: 120px;
            object-fit: contain;
        }

        .airport-building {
            width: 140px;
            height: 140px;
            margin-bottom: -10px;
            object-fit: contain;
        }

        /* Flight Path Dotted Arc */
        svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        path {
            stroke: #B19FFB;
            stroke-width: 4;
            stroke-dasharray: 8, 8;
            fill: none;
        }

        #moving-plane {
            position: absolute;
            width: 80px;
            height: 80px;
            transform: translate(-50%, -50%);
            display: none;
            object-fit: contain;
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
        }

        .headline {
            font-size: 1.6rem;
            font-weight: bold;
            margin-bottom: 15px;
            letter-spacing: 2px;
        }

        .timer-display {
            font-size: 3rem;
            font-weight: bold;
            letter-spacing: 4px;
        }

        .labels {
            display: flex;
            justify-content: space-around;
            font-size: 0.9rem;
            margin-top: 8px;
            opacity: 0.8;
            padding: 0 10px;
        }
        
        .labels span {
            width: 70px;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="canvas" id="canvas">
        <svg id="svg-canvas">
            <path id="flight-arc" d="" />
        </svg>

        <div class="character-wrapper" id="female-side">
            <img id="airport-img" class="airport-building" src="https://i.ibb.co/6P6X9mY/airport-pastel.png" onerror="this.src='https://img.icons8.com/emoji/96/airport-emoji.png'" alt="Airport">
            <img id="female-kitty" class="asset-img" src="https://i.ibb.co/Vv0m4Xm/kitty-pink.png" onerror="this.src='https://img.icons8.com/color/144/hello-kitty.png'" alt="Female Kitty">
        </div>

        <img id="moving-plane" src="https://i.ibb.co/qmS0tqy/plane-pastel.png" onerror="this.src='https://img.icons8.com/color/144/airplane.png'" alt="Airplane">

        <div class="character-wrapper" id="male-side">
            <img id="grounded-plane" class="asset-img" src="https://i.ibb.co/qmS0tqy/plane-pastel.png" onerror="this.src='https://img.icons8.com/color/144/airplane.png'" alt="Grounded Plane" style="width: 80px; height: 80px; margin-bottom: 10px;">
            <img id="male-kitty" class="asset-img" src="https://i.ibb.co/vYm686b/kitty-blue.png" onerror="this.src='https://img.icons8.com/color/144/dear-daniel.png'" alt="Male Kitty">
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
        // CONFIGURATION: EDIT YOUR DETAILS HERE
        // ==========================================
        const CONFIG = {
            // Target timelines (May 27th, 2026)
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
                
                // Position male kitty right next to female kitty at destination
                document.getElementById('male-side').style.right = "auto";
                document.getElementById('male-side').style.left = "20% ";
                groundedPlane.style.display = "none";
                movingPlane.style.display = "none";
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            clockDisplay.innerHTML = 
                `${String(days).padStart(2, '0')} : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

            // Real-time Sadness/Grayscale Drop Logic for Female Kitty
            const totalWaitDuration = 4 * 24 * 60 * 60 * 1000; // 4 days baseline
            const elapsed = totalWaitDuration - (CONFIG.departureTime - now);
            let sadnessRatio = 1 - (elapsed / totalWaitDuration);
            if (sadnessRatio < 0) sadnessRatio = 0;
            if (sadnessRatio > 1) sadnessRatio = 1;
            femaleKitty.style.filter = `grayscale(${sadnessRatio * 60}%) saturate(${100 + (1 - sadnessRatio) * 50}%)`;

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

            // Coordinates for flight curve path (Right to Left)
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
            
            // Flip airplane image horizontally so it flies leftward naturally
            plane.style.transform = "translate(-50%, -50%) scaleX(-1)";
        }

        window.addEventListener('resize', setupArc);
        setupArc();
        setInterval(updateSystem, 1000);
        updateSystem();
    </script>
</body>
</html>
