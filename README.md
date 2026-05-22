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
            bottom: 10px;
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
            width: 100px;
            height: 100px;
            object-fit: contain;
        }

        .airport-building {
            width: 120px;
            height: 120px;
            margin-bottom: -10px;
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
            width: 60px;
            height: 60px;
            transform: translate(-50%, -50%);
            display: none;
        }

        /* Countdown Container */
        .countdown-container {
            text-align: center;
            margin-bottom: 8vh;
            background: rgba(255, 255, 255, 0.8);
            padding: 20px 40px;
            border-radius: 30px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            border: 3px solid var(--pink-pastel);
        }

        .headline {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 15px;
            letter-spacing: 2px;
        }

        .timer-display {
            font-size: 2.5rem;
            font-weight: bold;
            letter-spacing: 4px;
        }

        .labels {
            display: flex;
            justify-content: center;
            gap: 35px;
            font-size: 0.8rem;
            margin-top: 5px;
            opacity: 0.7;
        }
    </style>
</head>
<body>

    <div class="canvas" id="canvas">
        <svg id="svg-canvas">
            <path id="flight-arc" d="" />
        </svg>

        <div class="character-wrapper" id="female-side">
            <img id="airport-img" class="airport-building" src="https://placehold.co/120x120/FFD1DC/6D5959?text=Airport" alt="Airport">
            <img id="female-kitty" class="asset-img" src="https://placehold.co/100x100/FFD1DC/6D5959?text=Pink+Kitty" alt="Female Kitty">
        </div>

        <img id="moving-plane" src="https://placehold.co/60x60/B19FFB/FFF?text=✈️" alt="Airplane">

        <div class="character-wrapper" id="male-side">
            <img id="grounded-plane" class="asset-img" src="https://placehold.co/60x60/B19FFB/FFF?text=✈️" alt="Grounded Plane" style="margin-bottom: 10px;">
            <img id="male-kitty" class="asset-img" src="https://placehold.co/100x100/AEC6CF/6D5959?text=Blue+Kitty" alt="Male Kitty">
        </div>
    </div>

    <div class="countdown-container">
        <div id="headline" class="headline">Waiting for our paths to cross...</div>
        <div class="timer-display" id="clock">00 : 04 : 00 : 00</div>
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
            // Edit these image links with your actual URLs later
            femaleKittyURL: "https://placehold.co/100x100/FFD1DC/6D5959?text=Pink+Kitty", 
            maleKittyURL: "https://placehold.co/100x100/AEC6CF/6D5959?text=Blue+Kitty",
            airportURL: "https://placehold.co/120x120/FFD1DC/6D5959?text=Airport",
            planeURL: "https://placehold.co/60x60/B19FFB/FFF?text=✈️",

            // Exact timelines requested (May 27th, 2026)
            departureTime: new Date("May 27, 2026 06:10:00").getTime(),
            arrivalTime: new Date("May 27, 2026 09:00:00").getTime()
        };

        // Initialize Image Assets
        document.getElementById('female-kitty').src = CONFIG.femaleKittyURL;
        document.getElementById('male-kitty').src = CONFIG.maleKittyURL;
        document.getElementById('airport-img').src = CONFIG.airportURL;
        document.getElementById('grounded-plane').src = CONFIG.planeURL;
        document.getElementById('moving-plane').src = CONFIG.planeURL;

        function updateSystem() {
            const now = new Date().getTime();
            const clockDisplay = document.getElementById('clock');
            const headline = document.getElementById('headline');
            const femaleKitty = document.getElementById('female-kitty');
            const maleKitty = document.getElementById('male-kitty');
            const groundedPlane = document.getElementById('grounded-plane');
            const movingPlane = document.getElementById('moving-plane');

            // 1. Handle Countdown Calculations up to Arrival
            let timeRemaining = CONFIG.arrivalTime - now;

            if (timeRemaining < 0) {
                clockDisplay.innerHTML = "00 : 00 : 00 : 00";
                headline.innerHTML = "Together At Last! ❤️";
                femaleKitty.style.filter = "none";
                maleKitty.style.display = "block";
                // Position male kitty right next to female kitty at destination
                document.getElementById('male-side').style.right = "auto";
                document.getElementById('male-side').style.left = "18%";
                groundedPlane.style.display = "none";
                movingPlane.style.display = "none";
                return;
            }

            // Calculations for Days, Hours, Minutes, Seconds
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            clockDisplay.innerHTML = 
                `${String(days).padStart(2, '0')} : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

            // 2. Real-time Sadness/Grayscale Drop Logic for Female Kitty
            // Starts sad (grayish), gets fully vibrant exactly at departure
            const totalWaitDuration = CONFIG.departureTime - (CONFIG.departureTime - (4 * 24 * 60 * 60 * 1000)); // 4 day benchmark
            const elapsed = now - (CONFIG.departureTime - (4 * 24 * 60 * 60 * 1000));
            let sadnessRatio = 1 - (elapsed / totalWaitDuration);
            if (sadnessRatio < 0) sadnessRatio = 0;
            if (sadnessRatio > 1) sadnessRatio = 1;
            femaleKitty.style.filter = `grayscale(${sadnessRatio * 80}%) saturate(${100 + (1 - sadnessRatio) * 100}%)`;

            // 3. Flight Animation Stages
            if (now < CONFIG.departureTime) {
                // STAGE 1: Present (Before Flight)
                headline.innerHTML = "Counting down the moments...";
                movingPlane.style.display = "none";
            } 
            else if (now >= CONFIG.departureTime && now < CONFIG.arrivalTime) {
                // STAGE 2: Flight Boarded & In Transit
                headline.innerHTML = "🚨 MISSION UPDATE: Boarding Initiated! In Transit! ✈️";
                maleKitty.style.display = "none"; // Boards plane
                groundedPlane.style.display = "none"; 
                movingPlane.style.display = "block";

                // Progress math along the SVG arc
                const flightProgress = (now - CONFIG.departureTime) / (CONFIG.arrivalTime - CONFIG.departureTime);
                movePlaneAlongArc(flightProgress);
            }
        }

        // SVG Arc Generator and Tracker
        function setupArc() {
            const canvas = document.getElementById('canvas');
            const path = document.getElementById('flight-arc');
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;

            // Coordinates for flight curve path (Right to Left)
            const startX = w * 0.9;
            const startY = h - 60;
            const endX = w * 0.1;
            const endY = h - 60;
            const controlX = w / 2;
            const controlY = -50; // Curve peak point in the air

            path.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
        }

        function movePlaneAlongArc(progress) {
            const path = document.getElementById('flight-arc');
            const plane = document.getElementById('moving-plane');
            const totalLength = path.getTotalLength();
            
            // Move backwards along path because we go right to left
            const pointLength = totalLength * (1 - progress); 
            const point = path.getPointAtLength(pointLength);

            plane.style.left = `${point.x}px`;
            plane.style.top = `${point.y}px`;
        }

        // Initialize Layout updates
        window.addEventListener('resize', setupArc);
        setupArc();
        setInterval(updateSystem, 1000);
        updateSystem();
    </script>
</body>
</html>
