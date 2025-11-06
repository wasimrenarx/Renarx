// Renarx — Front-end interactions
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // Modal
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const showModal = () => {
    if (modal) {
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    }
  };
  const closeModal = () => {
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  };
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

  // Stubs (assistant, insight, ROI) — keep as you had
  // ...

  // Donut animation
  const donutArc = document.querySelector(".donut-arc");
  const donutText = document.querySelector(".donut-text");
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  function animateDonut(percent = 22, duration = 900) {
    if (!donutArc) return;
    donutArc.setAttribute(
      "stroke-dasharray",
      `${circumference} ${circumference}`,
    );
    donutArc.setAttribute("stroke-dashoffset", `${circumference}`);
    const targetOffset = circumference - (percent / 100) * circumference;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const currentOffset =
        circumference - progress * (circumference - targetOffset);
      donutArc.setAttribute("stroke-dashoffset", `${currentOffset}`);
      if (donutText)
        donutText.textContent = `${Math.round(progress * percent)}%`;
      if (progress < 1) requestAnimationFrame(step);
      else if (donutText) donutText.textContent = `${percent}%`;
    }
    requestAnimationFrame(step);
  }
  animateDonut(22);

  // AOS
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: true });
  }

  // GSAP + ScrollTrigger
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.from(".title", {
      y: 80,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.from(".tagline", { y: 40, opacity: 0, delay: 0.3, duration: 0.8 });
    gsap.from(".cta-group .btn", {
      opacity: 0,
      y: 20,
      delay: 0.6,
      stagger: 0.15,
    });

    // Section headings
    gsap.utils.toArray(".section-heading").forEach((heading) => {
      gsap.from(heading, {
        scrollTrigger: { trigger: heading, start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 1,
      });
    });

    // Feature cards
    gsap.utils.toArray(".feature-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 90%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
      });
    });

    // Tool boxes (dashboard/toolkit/trajectory)
    gsap.utils.toArray(".tool-box").forEach((box, i) => {
      gsap.from(box, {
        scrollTrigger: { trigger: box, start: "top 90%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
      });
    });
  }
});
