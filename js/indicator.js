

// Data Array matching your EXACT VS Code folder
const videos = {
    ugc: [
        "assets/video/UGC/a.mp4",
        "assets/video/UGC/b.mp4",
        "assets/video/UGC/c.mp4",
        "assets/video/UGC/d.mp4",
        "assets/video/UGC/e.mp4",
        "assets/video/UGC/f.mp4",
        
    ],
    ai: [
        "assets/video/ugc/VID AD 1.mp4",
        "assets/video/ugc/VID AD 2.mp4",
        "assets/video/ugc/VID AD 3.mp4"
    ],
    vsl: [
        "assets/video/ugc/VID AD 4.mp4",
        "assets/video/ugc/VID AD 5.mp4",
        "assets/video/ugc/VIDEO 4.mp4"
    ],
    winningAds: [
        "assets/video/ugc/4.mp4",
        "assets/video/ugc/5.mp4"
    ]
};

let currentCategory = 'ugc';
let currentIndex = 0;

// DOM Elements
const mainVideo = document.getElementById('mainVideo');
const prevVideo = document.getElementById('prevVideo');
const nextVideo = document.getElementById('nextVideo');

const prevCard = document.getElementById('prevCard');
const nextCard = document.getElementById('nextCard');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playOverlay = document.getElementById('playOverlay');

const categoryButtons = document.querySelectorAll('.tab-btn');
const paginationContainer = document.getElementById('paginationIndicators');

// Set video sources safely
function updateVideoSources() {
    const list = videos[currentCategory];
    if (!list || list.length === 0) return;

    const total = list.length;
    
    // Boundary check
    currentIndex = (currentIndex + total) % total;

    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    // Set Main Video
    mainVideo.pause();
    mainVideo.src = list[currentIndex];
    mainVideo.load();
    playOverlay.classList.remove('hidden');

    // Set Previews
    prevVideo.src = list[prevIndex];
    prevVideo.load();

    nextVideo.src = list[nextIndex];
    nextVideo.load();

    renderPagination();
}

// Pagination Dots
function renderPagination() {
    paginationContainer.innerHTML = '';
    const total = videos[currentCategory].length;

    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'indicator' + (i === currentIndex ? ' active' : '');
        dot.onclick = () => {
            currentIndex = i;
            updateVideoSources();
        };
        paginationContainer.appendChild(dot);
    }
}

// Controls
function goNext() {
    currentIndex++;
    updateVideoSources();
}

function goPrev() {
    currentIndex--;
    updateVideoSources();
}

function togglePlay() {
    if (mainVideo.paused) {
        mainVideo.play().then(() => {
            playOverlay.classList.add('hidden');
        }).catch(err => {
            console.log("Play blocked:", err);
            mainVideo.muted = true;
            mainVideo.play();
            playOverlay.classList.add('hidden');
        });
    } else {
        mainVideo.pause();
        playOverlay.classList.remove('hidden');
    }
}

// Event Listeners
nextBtn.onclick = goNext;
prevBtn.onclick = goPrev;

nextCard.onclick = goNext;
prevCard.onclick = goPrev;

playOverlay.onclick = togglePlay;
mainVideo.onclick = togglePlay;

categoryButtons.forEach(btn => {
    btn.onclick = (e) => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentCategory = btn.getAttribute('data-category');
        currentIndex = 0;
        updateVideoSources();
    };
});

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    updateVideoSources();
});