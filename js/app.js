// GSAP-Effekte
gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero-grid", {opacity: 1, duration: 1, ease: "power2.out"});

gsap.utils.toArray(".content-section").forEach(section => {
  gsap.to(section, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

gsap.utils.toArray('.gallery img').forEach((img, i) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.05,
    ease: "power2.out"
  });
});

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const images = Array.from(gallery?.querySelectorAll("img") || []);
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  images.forEach(img => gallery?.appendChild(img));

  // LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxCaption = document.getElementById('lightbox-caption');

  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.getAttribute('data-description') || '';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });


  images.forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    }
  });
});
