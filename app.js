// Renarx — Front-end interactions

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll to Join
  document.querySelectorAll('a[href="#join"]').forEach((cta) => {
    cta.addEventListener('click', (e) => {
      e.preventDefault();
      const join = document.getElementById('join');
      if (!join) return;
      window.scrollTo({ top: join.offsetTop - 80, behavior: 'smooth' });
      setTimeout(() => document.getElementById('email')?.focus(), 400);
    });
  });

  // Modal
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  function showModal() { if (modal) { modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false'); } }
  function closeModal() { if (modal) { modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); } }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Demo form (mailto fallback)
  const form = document.getElementById('waitlistForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email')?.value.trim();
      const company = document.getElementById('company')?.value.trim();
      if (!email || !company) return;

      const subject = encodeURIComponent(`Renarx Demo Request from ${company}`);
      const body = encodeURIComponent(`I am requesting a demo for Renarx.\n\nCompany: ${company}\nEmail: ${email}`);
      window.location.href = `mailto:sales@renarx.com?subject=${subject}&body=${body}`;

      showModal();
      const emailEl = document.getElementById('email'); const companyEl = document.getElementById('company');
      if (emailEl) emailEl.value = ''; if (companyEl) companyEl.value = '';
    });
  }

  // Assistant (local stub)
  const assistantBtn = document.getElementById('assistantGenerateBtn');
  const assistantPrompt = document.getElementById('assistantPrompt');
  const assistantOutput = document.getElementById('assistantOutput');
  if (assistantBtn && assistantPrompt && assistantOutput) {
    assistantBtn.addEventListener('click', () => {
      const prompt = assistantPrompt.value.trim();
      if (prompt.length < 10) {
        assistantOutput.textContent = 'Please add vendor, uplift %, usage rates, and renewal timing.';
        return;
      }
      assistantOutput.textContent =
        `Executive Playbook\n\n` +
        `Input: ${prompt}\n\n` +
        `1) Utilization: quantify dormant/under‑used seats and present rightsizing.\n` +
        `2) Benchmarks: compare current rates to market medians; challenge uplifts.\n` +
        `3) Term: propose multi‑year with caps/floors for rate protection.\n` +
        `4) Consolidation: aggregate contracts/units to unlock volume tiers.\n\n` +
        `Outcome: predictable cost envelope, measurable ROI, CFO‑ready transparency.`;
    });
  }

  // Negotiation insight (local stub)
  const insightBtn = document.getElementById('generateInsightBtn');
  const vendorInput = document.getElementById('vendorInput');
  const insightOutput = document.getElementById('insightOutput');
  if (insightBtn && vendorInput && insightOutput) {
    insightBtn.addEventListener('click', () => {
      const details = vendorInput.value.trim();
      if (details.length < 20) {
        insightOutput.textContent = 'Add vendor, contract value, renewal date, unused licenses, and key risks.';
        return;
      }
      insightOutput.textContent =
        `Strategic Insight Summary\n\n` +
        `Scenario: ${details}\n\n` +
        `Leverage:\n` +
        `• Rightsize licenses and remove dormancy\n` +
        `• Benchmark against peer rates and terms\n` +
        `• Structure multi‑year renewal with caps/floors\n` +
        `• Consolidate related tools for volume tiers\n\n` +
        `Next step: send a data‑led proposal with quantified savings and term protections.`;
    });
  }

  // ROI (local stub)
  const roiBtn = document.getElementById('generateRoiBtn');
  const roiOutput = document.getElementById('roiOutput');
  const annualSpendInput = document.getElementById('annualSpend');
  const savingsPercentInput = document.getElementById('savingsPercent');
  if (roiBtn && roiOutput && annualSpendInput && savingsPercentInput) {
    roiBtn.addEventListener('click', () => {
      const spend = parseFloat(annualSpendInput.value);
      const pct = parseFloat(savingsPercentInput.value);

      if (isNaN(spend) || spend < 100) {
        roiOutput.textContent = 'Please enter a valid Annual SaaS Spend (minimum $100).';
        annualSpendInput.focus();
        return;
      }
      if (isNaN(pct) || pct < 1 || pct > 50) {
        roiOutput.textContent = 'Please enter a valid Savings Percentage (between 1% and 50%).';
        savingsPercentInput.focus();
        return;
      }

      const savings = spend * (pct / 100);
      const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
      roiOutput.textContent =
        `Projected Annual Cost Reduction Analysis\n\n` +
        `Total Annual Spend: ${fmt(spend)}\n` +
        `Projected Savings Rate: ${pct}%\n` +
        `Projected Annual Savings: ${fmt(savings)}\n\n` +
        `Renarx unifies utilization audits, renewal risk detection, and negotiation playbooks into an executive workflow. Savings are realized via seat rightsizing, contract consolidation, and pre‑empting price uplifts 6–12 months ahead, creating measurable ROI and board‑level transparency.`;
    });
  }

  // Donut animation
  const donutArc = document.querySelector('.donut-arc');
  const donutText = document.querySelector('.donut-text');
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  function animateDonut(percent = 22, duration = 900) {
    if (!donutArc) return;
    donutArc.setAttribute('stroke-dasharray', `${circumference} ${circumference}`);
    donutArc.setAttribute('stroke-dashoffset', `${circumference}`);

    const targetOffset = circumference - (percent / 100) * circumference;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const currentOffset = circumference - progress * (circumference - targetOffset);
      donutArc.setAttribute('stroke-dashoffset', `${currentOffset}`);
      if (donutText) donutText.textContent = `${Math.round(progress * percent)}%`;
      if (progress < 1) requestAnimationFrame(step);
      else if (donutText) donutText.textContent = `${percent}%`;
    }
    requestAnimationFrame(step);
  }

  animateDonut(22);
  window.updateRenewalRisk = (percent) => animateDonut(percent);
});
setInterval(() => animateDonut(22), 5000);

// Initialize AOS
AOS.init({ duration: 1000, once: true });

// Hero cinematic entrance
gsap.from(".title", { y: 100, opacity: 0, duration: 1.1, ease: "power4.out" });
gsap.from(".tagline", { y: 50, opacity: 0, delay: 0.5, duration: 1 });
gsap.from(".cta-group .btn", { opacity: 0, y: 20, delay: 1, stagger: 0.2 });

// ScrollTrigger for dashboard cards
gsap.utils.toArray('#dashboard .tool-box').forEach((box, i) => {
  gsap.from(box, {
    scrollTrigger: { trigger: box, start: "top 85%" },
    y: 60, opacity: 0, duration: 0.8, delay: i * 0.1
  });
});

// ScrollTrigger for trajectory milestones
gsap.utils.toArray('#trajectory .tool-box').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: "top 80%" },
    x: i % 2 === 0 ? -100 : 100,
    opacity: 0,
    duration: 1
  });
});
