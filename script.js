let currentEnvelope = 0;

// Titles per envelope
const titles = {
    1: "Vanshita",
    2: "Priyanka",
    3: "Atmik",
    4: "Dia",
    5: "Prakul",
    6: "Guchum",
    7: "Manasha",
    8: "Shanthi",
    9: "TBD",
    10: "Tea Bee Di",
    11: "gubs"
};

// Messages per envelope (Modify this section for custom messages)
const messages = {
    1: `Happiest Birthday babessss 💖 
    I'm missing you loadsss, being here is no fun without you. 
    I want to go out on nightly bobba runs with you and have gossip sessions 🫶🏼 also our future trip is what is keeping me going atp, so come soon 😘
    This pic may not be our best but this day will forever be a core memory for me ❤ 
    Love you loads 😙 ❤️`,
    2: `HAPPY BIRTHDAY, BEAUTIFUL!🤍✨
        All the way from this side of the planet, I’m sending you a giant hug, a virtual cake, and way too much love.
        We’ve known each other since school, and yet somehow, you still haven’t gotten tired of me—truly, you're the most patient soul alive.
        Even with oceans and time zones between us, you’ve always had my back, and I hope you know I’ve always got yours.
        I know studying in the US isn’t always easy (I see you, late-night breakdowns and caffeine-fueled essays), but you’re doing amazing, even when you don’t feel like it.
        I miss your face, your laugh, your weird jokes that only make sense to us (and maybe scare others).
        So today, eat cake, dance badly, cry a little if you want (emotions are valid!), and remember: I love you loads, I’m proud of you always, and I’m just a message away—no matter how far.
        Here’s to more years of friendship, terrible memes, and embarrassing voice notes.
        
        Love you endlessly ❤️
        Priyanka`,
    3: `Happy 22nd bday Arohi! Thank you for being such an amazing and genuine friend! Here’s to many more memories including the late night study sesh’s, starbies runs and spending Rakhi’s together 😁`,
    4: "Happy 22nd Birthday Arohi!!! i’m so happy and grateful to have met you and spent the 4 years of college calling you a friend. I hope we always stay like this and yap about life and drama and our expert opinions on others people’s drama specifically😂😂i love you and i hope you have the best birthday🫶🫶",
    5: "A very happy bday Arohi!! 🍻 Dude, can you believe it?! 12 yrs! We've been friends for 12 yrs yaar!! Omg! Thank you for sticking with me all this time, inspite of... well, my lack of responses. I know I have said this before, but to me, you are one of the most wonderful and amazing people out there. Hoping I'll be there for more highs and lows that are to come in whatever your future holds. Have a good one 👍🥳",
    6: `Hey buddhi 
        Here’s everything from the dil 
        I’m so proud of everything you’ve done and keep doing 
        I wish I so wish there was something more I could do and I think about it everyday 
        You’re one of the closest only real people in my world
        I love you loads bro I hope you have an amazing amazing day 
        I can’t wait to see you again this summers 
        Love G❤`,
    7: `Forever grateful to have you as my best friend. Love you more than words could ever describe♥️♥️
        You’re so sassy and sometimes annoying but I love you
        the first proper outing picture. an ode to all the successful and unsuccessful hangout plans thereafter🤭 you’re beautiful, I hope you always remember that❤️`,
    8: "Hiii Arohi, happy happy 22nd🫶 I love you so so much and I’ll miss you immensely after we graduate, but please know that I’m so grateful to have you in my life and call you my best friend. I hope you find all the joy and fulfillment that you seek in life🥰 wanna get our favorite yogurt and take a stroll on campus and yap?🤪",
    9: "You are my everything! 💘",
    10: "Happy 22! Here's to more adventures together! 🎉",
    11: ""
};



// Generate 10 envelopes and 1 vid
document.addEventListener("DOMContentLoaded", () => {
    let envelopeContainer = document.getElementById("envelopes-container");

    for (let i = 1; i <= 10; i++) {
        let envelopeDiv = document.createElement("div");
        envelopeDiv.classList.add("envelope");
        envelopeDiv.innerHTML = `<img src="images/envelope1.png" id="envelope${i}" onclick="openEnvelope(${i})">`;
        envelopeContainer.appendChild(envelopeDiv);
    }

    // Add the 11th envelope (video)
    const envelopeDiv = document.createElement("div");
    envelopeDiv.classList.add("envelope");
    envelopeDiv.innerHTML = `<img src="images/envelope1.png" id="envelope11" onclick="openEnvelope(11)" />`;
    envelopeContainer.appendChild(envelopeDiv);
    
});


// Open Envelope Animation
function openEnvelope(id) {
    currentEnvelope = id;
    const revealedPic = document.getElementById("revealed-pic");
    const video = document.getElementById("center-video");
    const message = document.getElementById("message");
    const clickHint = document.getElementById("click-hint");

    // Reset display states before animation
    revealedPic.classList.add("glow-hint");
    revealedPic.title = "Click me to reveal the message!";
    revealedPic.style.display = "none";
    video.style.display = "none";
    video.pause();
    message.style.display = "none";
    clickHint.style.display = "none";

    anime({
        targets: `#envelope${id}`,
        scale: [1, 2],
        duration: 1000,
        easing: "easeOutExpo",
        complete: function () {
            document.getElementById("envelopes-screen").style.display = "none";
            document.getElementById("content-screen").style.display = "flex";
            document.getElementById("title").innerText = titles[id] || "A Beautiful Memory ✨";

            if (id === 11) {
                // Show video instead of image/message
                video.style.display = "block";
                video.currentTime = 0;
                video.play();
                clickHint.style.display = "none";
                message.style.display = "none";
            } else {
                // Show image and message for envelopes 1-10
                revealedPic.src = `images/pic${id}.jpg`;
                revealedPic.style.display = "block";
                clickHint.style.display = "block";
                message.innerText = messages[id] || "";
                message.style.display = "none";
            }
            new Audio('sounds/envelope-open.mp3').play();
        }
    });
}

// Show Message Animation
function showMessage() {
    if (messageRevealed) return;  // Prevent repeated showing
    messageRevealed = true;
    
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

    // Reset video if open
    const video = document.getElementById("center-video");
    if (!video.paused) {
        video.pause();
        video.currentTime = 0;
    }

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
