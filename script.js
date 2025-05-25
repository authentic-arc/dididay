let currentEnvelope = 0;

// Titles per envelope
const titles = {
    1: "A Special Moment ❤️",
    2: "Our Fun Adventure! 🌍",
    3: "Laughs & Love 💕",
    4: "Best Day Ever! 🎉",
    5: "Forever My Favorite 😘",
    6: "Sunsets & Smiles 🌅",
    7: "Unforgettable Journey ✨",
    8: "Sweet Memories 🍰",
    9: "You & Me 💖",
    10: "Here's to Us! 🥂"
};

// Messages per envelope (Modify this section for custom messages)
const messages = {
    1: "You're amazing! ❤️",
    2: "I cherish every moment with you 💕",
    3: "Hey buddhi <br>Here’s everything from the dil<br>I’m so proud of everything you’ve done and keep doing <br>I wish I so wish there was something more I could do and I think about it everyday <br>You’re one of the closest only real people in my world <br>I love you loads bro I hope you have an amazing amazing day <br>I can’t wait to see you again this summers <br>Love G❤",
    4: "Every day with you is a blessing! 😘",
    5: "I love you more than words can say! 💖",
    6: "Forever grateful for you in my life! ✨",
    7: "You make my world brighter! 🌞",
    8: "I'd choose you a thousand times over! 💕",
    9: "You are my everything! 💘",
    10: "Happy 22! Here's to more adventures together! 🎉"
};



// Generate 10 envelopes dynamically
document.addEventListener("DOMContentLoaded", () => {
    let envelopeContainer = document.getElementById("envelopes-container");

    for (let i = 1; i <= 10; i++) {
        let envelopeDiv = document.createElement("div");
        envelopeDiv.classList.add("envelope");
        envelopeDiv.innerHTML = `<img src="images/envelope1.png" id="envelope${i}" onclick="openEnvelope(${i})">`;
        envelopeContainer.appendChild(envelopeDiv);
    }
});

// Open Envelope Animation
function openEnvelope(id) {
    currentEnvelope = id;
    const revealedPic = document.getElementById("revealed-pic");
    revealedPic.classList.add("glow-hint");

    // Add a tooltip or temporary label
    revealedPic.title = "Click me to reveal the message!";

    anime({
        targets: `#envelope${id}`,
        scale: [1, 2],
        duration: 1000,
        easing: "easeOutExpo",
        complete: function () {
            document.getElementById("envelopes-screen").style.display = "none";
            document.getElementById("content-screen").style.display = "flex";
            document.getElementById("revealed-pic").src = `images/pic${id}.jpg`;
            document.getElementById("title").innerText = titles[id] || "A Beautiful Memory ✨"
            document.getElementById("message").innerText = messages[id]; // Set the correct message
            new Audio('sounds/envelope-open.mp3').play();
        }
    });
}

// Show Message Animation
function showMessage() {
    anime({
        targets: "#message",
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        easing: "easeOutExpo",
        begin: function () {
            document.getElementById("message").style.display = "block";
        }
    });
}

// Go Back Animation
function goBack() {
    document.getElementById("content-screen").style.display = "none";
    document.getElementById("envelopes-screen").style.display = "flex";

    anime({
        targets: `#envelope${currentEnvelope}`,
        scale: [2, 1],
        duration: 200,
        easing: "easeOutExpo"
    });
}

// 🌟 Fireworks Effect (Clicking Outside Envelopes)
var canvasEl = document.querySelector('.fireworks');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 30;
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
var pointerX = 0;
var pointerY = 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';

function setCanvasSize() {
    canvasEl.width = window.innerWidth * 2;
    canvasEl.height = window.innerHeight * 2;
    canvasEl.style.width = window.innerWidth + 'px';
    canvasEl.style.height = window.innerHeight + 'px';
    ctx.scale(2, 2);
}

function updateCoords(e) {
    pointerX = e.clientX || e.touches[0].clientX;
    pointerY = e.clientY || e.touches[0].clientY;
}

function setParticuleDirection(p) {
    var angle = anime.random(0, 360) * Math.PI / 180;
    var value = anime.random(50, 180);
    var radius = [-1, 1][anime.random(0, 1)] * value;
    return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle)
    };
}

// Regular circle particle (fireworks effect)
function createParticule(x, y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(16, 32);
    p.endPos = setParticuleDirection(p);
    p.draw = function () {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = p.color;
        ctx.fill();
    };
    return p;
}

// Heart-shaped particle (for clicking envelopes)
function createHeartParticule(x, y) {
    var p = {};
    p.x = x;
    p.y = y;
    var redColors = ['#FF1461', '#FF4D6D', '#E60039', '#CC0033', '#FF3366'];
    p.color = redColors[anime.random(0, redColors.length - 1)];

    p.radius = anime.random(12, 20);
    p.endPos = setParticuleDirection(p);
    p.draw = function () {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.radius / 20, p.radius / 20);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(0, -3, -6, -10, -10, -10);
        ctx.bezierCurveTo(-18, -10, -18, 3, -18, 3);
        ctx.bezierCurveTo(-18, 10, -10, 15, 0, 20);
        ctx.bezierCurveTo(10, 15, 18, 10, 18, 3);
        ctx.bezierCurveTo(18, 3, 18, -10, 10, -10);
        ctx.bezierCurveTo(6, -10, 0, -3, 0, 0);
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
    };
    return p;
}

// Modified animateParticules to accept particle type (fireworks or hearts)
function animateParticules(x, y, createParticuleFunc) {
    var particules = [];
    for (var i = 0; i < numberOfParticules; i++) {
        particules.push(createParticuleFunc(x, y));
    }
    anime.timeline().add({
        targets: particules,
        x: function (p) { return p.endPos.x; },
        y: function (p) { return p.endPos.y; },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: function () {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            particules.forEach(p => p.draw());
        }
    });
}

// Detect envelope click for heart fireworks
document.addEventListener(tap, function (e) {
    updateCoords(e);
    let isEnvelope = e.target.closest('.envelope');

    if (isEnvelope) {
        animateParticules(pointerX, pointerY, createHeartParticule);
    } else {
        animateParticules(pointerX, pointerY, createParticule);
    }
}, false);

setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);