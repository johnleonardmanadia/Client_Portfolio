


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