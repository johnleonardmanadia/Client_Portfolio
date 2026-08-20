
//Mobile Nav Toggle (Hamburger Menu)
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Isara ang menu pag pinili yung isang link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});

  //Contact.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const statusText = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check if user set up Formspree properly
    if (form.action.includes("YOUR_FORMSPREE_ID")) {
      alert("Please replace 'YOUR_FORMSPREE_ID' in the HTML with your actual Formspree endpoint code.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    statusText.innerText = "";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        statusText.style.color = "#4E9F3D";
        statusText.innerText = "Thank you! Your request has been sent!";
        form.reset();
      } else {
        throw new Error("Submission failed.");
      }
    } catch (error) {
      statusText.style.color = "#FF5959";
      statusText.innerText = "Oops! Something went wrong. Please try again.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Request";
    }
  });
});

  //The Other Script Js

// Hover functionality para sa Preview Videos sa Cards
document.querySelectorAll('.tm-card').forEach(card => {
  const video = card.querySelector('.tm-card-video');

  card.addEventListener('mouseenter', () => {
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Iniiwasan ang Autoplay error mula sa browser
          console.log("Hover preview prevented:", error);
        });
      }
    }
  });

  card.addEventListener('mouseleave', () => {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
});

// Modal Pop-up Video Logic
const tmModal = document.getElementById('tmVideoModal');
const tmVideoPlayer = document.getElementById('tmVideoPlayer');

function tmOpenVideo(videoSrc) {
  tmVideoPlayer.src = videoSrc;
  tmModal.style.display = 'flex';
  
  // Safe Play invocation
  const playPromise = tmVideoPlayer.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log("Modal video play error:", error);
    });
  }
}

function tmCloseVideo() {
  tmModal.style.display = 'none';
  tmVideoPlayer.pause();
  tmVideoPlayer.currentTime = 0;
  tmVideoPlayer.src = '';
}

// Isara ang modal kapag cliniclick sa labas ng video box
window.addEventListener('click', (e) => {
  if (e.target === tmModal) {
    tmCloseVideo();
  }
});

// Opsyonal: Script para magdagdag ng smooth hover effect o animation kapag nai-scroll
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".rt-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.3s ease, border-color 0.3s ease";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const fcTabs = document.querySelectorAll(".fc-tab-btn");

  fcTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // 1. Alisin ang 'active' class sa lahat ng buttons
      fcTabs.forEach((btn) => btn.classList.remove("active"));

      // 2. Idagdag ang 'active' class sa cliniclick na button
      tab.classList.add("active");

      // 3. Kunin ang Napiling Category (halimbawa: ugc, ai, vsl, ads)
      const selectedCategory = tab.getAttribute("data-category");

      // Dito mo pwedeng tawagin ang function para i-filter ang mga lalabas na video/projects
      console.log("Selected category:", selectedCategory);
    });
  });
});








// Data Array — YouTube Video IDs na lang (hindi na mp4 files)
// Paano kumuha ng ID: sa YouTube video, i-right-click > "Copy embed code"
// Sa embed code makikita mo: src="https://www.youtube.com/embed/VIDEO_ID_DITO"
// Kunin mo lang yung VIDEO_ID (yung parte pagkatapos ng /embed/) at ilagay dito sa baba.
const videos = {
    ugc: [
        "wqB2wht1atk",
        "BQpA85wHqv4",
        "PUT_UGC_VIDEO_ID_3",
        "PUT_UGC_VIDEO_ID_4",
        "PUT_UGC_VIDEO_ID_5",
        "PUT_UGC_VIDEO_ID_6"
    ],
    ai: [
        "PUT_AI_VIDEO_ID_1",
        "PUT_AI_VIDEO_ID_2"
    ],
    vsl: [
        "PUT_VSL_VIDEO_ID_1"
    ],
    winningAds: [
        "PUT_WINNINGADS_VIDEO_ID_1"
    ]
};

let currentCategory = 'ugc';
let currentIndex = 0;

// DOM Elements
const mainVideoWrapper = document.getElementById('mainVideoWrapper');
const mainThumb = document.getElementById('mainThumb');
const prevThumb = document.getElementById('prevThumb');
const nextThumb = document.getElementById('nextThumb');

const prevCard = document.getElementById('prevCard');
const nextCard = document.getElementById('nextCard');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const categoryButtons = document.querySelectorAll('.tab-btn');
const paginationContainer = document.getElementById('paginationIndicators');

// Helper: kunin ang YouTube thumbnail URL galing sa video ID
function ytThumb(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Ibalik ang main card sa thumbnail + play button (bago mag-play ng bago)
function resetMainCardToThumb(videoId) {
    mainVideoWrapper.innerHTML = `
        <img id="mainThumb" class="video-thumb" src="${ytThumb(videoId)}" alt="" loading="lazy">
        <div class="play-overlay" id="playOverlay">
            <div class="play-button">►</div>
        </div>
    `;
    document.getElementById('playOverlay').addEventListener('click', () => {
        playMainVideo(videoId);
    });
}

// Palitan ang thumbnail ng aktwal na YouTube player pag pinindot
function playMainVideo(videoId) {
    mainVideoWrapper.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1"
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;
}

// Set video sources safely
function updateVideoSources() {
    const list = videos[currentCategory];
    if (!list || list.length === 0) return;

    const total = list.length;

    // Boundary check
    currentIndex = (currentIndex + total) % total;

    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    // Set Main Video (thumbnail muna, hindi agad naglalaro)
    resetMainCardToThumb(list[currentIndex]);

    // Set Previews (thumbnail images lang, hindi kailangan mag-play)
    prevThumb.src = ytThumb(list[prevIndex]);
    nextThumb.src = ytThumb(list[nextIndex]);

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


// Note: hindi na kailangan ng togglePlay function — ang YouTube iframe
// mismo na ang may sariling play/pause controls pag naka-load na siya.
// Ang playOverlay click ay hinahandle na sa loob ng resetMainCardToThumb().

// Event Listeners
nextBtn.onclick = goNext;
prevBtn.onclick = goPrev;

nextCard.onclick = goNext;
prevCard.onclick = goPrev;

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