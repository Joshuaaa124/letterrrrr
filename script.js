// ================== GAME STATE ==================
let currentLevel = 1;
const answers = ["Kaffee cafe", "Carmelo's cafe", "Tugawe Cove cafe"];
// Each level has its own picture – using your filenames
const cafeImages = [
    "kaffee.jpg",   // level 1
    "carmelos.jpg",  // level 2
    "tugawe.jpg"     // level 3
];

// ================== MEMORY DESCRIPTIONS ==================
// For the 5 photos in gallery and flashbacks
const memoryDescriptions = [
    "Our first picture together (malabo kasi nanginginig me)",
    "naglakad us ng almost 4km, so memorable tas we end up eating sa shakey's",
    "Our first movie date, and also our first hug",
    "this one si gabi na tas daeng sakayan na, nag habal nalang sha",
    "first picture together na ibang tao ang nag picture, in short may photographer sila"
];

// ================== DOM ELEMENTS ==================
const cover = document.getElementById('cover');
const game = document.getElementById('game');
const gallery = document.getElementById('gallery');
const flashbacks = document.getElementById('flashbacks');
const message = document.getElementById('message');

const openBtn = document.getElementById('openBtn');
const levelSpan = document.getElementById('level');
const cafeImg = document.getElementById('cafeImg');
const options = document.querySelectorAll('.option');
const gameFeedback = document.getElementById('gameFeedback');

const toFlashbacksBtn = document.getElementById('toFlashbacksBtn');
const toMessageBtn = document.getElementById('toMessageBtn');

const galleryDesc = document.getElementById('galleryDesc');
const flashbackDesc = document.getElementById('flashbackDesc');

// ================== HELPER FUNCTIONS ==================
function setOptionsEnabled(enabled) {
    options.forEach(btn => {
        btn.disabled = !enabled;
    });
}

function updateGame() {
    levelSpan.textContent = currentLevel;
    cafeImg.src = cafeImages[currentLevel - 1];
    gameFeedback.textContent = "";
}

// ================== EVENT LISTENERS ==================
// Open cover
openBtn.addEventListener('click', () => {
    cover.classList.remove('active');
    game.classList.add('active');
    updateGame();
    setOptionsEnabled(true);
});

// Game answer checking
options.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const selectedName = e.target.getAttribute('data-name');
        
        if (selectedName === answers[currentLevel - 1]) {
            gameFeedback.textContent = "Correct! 💖";
            gameFeedback.style.color = "#4caf50";
            setOptionsEnabled(false);

            if (currentLevel < 3) {
                currentLevel++;
                setTimeout(() => {
                    updateGame();
                    gameFeedback.textContent = "";
                    setOptionsEnabled(true);
                }, 800);
            } else {
                // Game completed → show gallery
                setTimeout(() => {
                    game.classList.remove('active');
                    gallery.classList.add('active');
                    currentLevel = 1; // reset for possible replay
                    setOptionsEnabled(true);
                }, 800);
            }
        } else {
            gameFeedback.textContent = "Oops, try again! 💔";
            gameFeedback.style.color = "#d44e6c";
        }
    });
});

// Gallery image clicks → show description
document.querySelectorAll('.gallery .memory-img').forEach((img) => {
    img.addEventListener('click', () => {
        const descIndex = img.getAttribute('data-index'); // 0-4
        galleryDesc.textContent = `📝 ${memoryDescriptions[descIndex]}`;
    });
});

// Flashback image clicks → show description
document.querySelectorAll('.flashbacks .flashback-img').forEach((img) => {
    img.addEventListener('click', () => {
        const descIndex = img.getAttribute('data-index');
        flashbackDesc.textContent = `💌 ${memoryDescriptions[descIndex]}`;
    });
});

// Navigation
toFlashbacksBtn.addEventListener('click', () => {
    gallery.classList.remove('active');
    flashbacks.classList.add('active');
    // Reset flashback description to default
    flashbackDesc.textContent = "💭 Click on a flashback to relive the moment 💭";
});

toMessageBtn.addEventListener('click', () => {
    flashbacks.classList.remove('active');
    message.classList.add('active');
});