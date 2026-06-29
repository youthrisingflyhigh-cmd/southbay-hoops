/* ============================================
   SOUTHBAY HOOPS — main.js
   ============================================ */

// ---- NAV ----
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) current = sec.id;
  });
  navItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ---- SIGNATURE PAD ----
const canvas = document.getElementById('signature-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let hasSig = false;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  resize();
  window.addEventListener('resize', resize);

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  canvas.addEventListener('mousedown', e => { drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
  canvas.addEventListener('mousemove', e => { if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); hasSig = true; });
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mouseleave', () => drawing = false);

  canvas.addEventListener('touchstart', e => { e.preventDefault(); drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchmove', e => { e.preventDefault(); if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); hasSig = true; }, { passive: false });
  canvas.addEventListener('touchend', () => drawing = false);

  const clearBtn = document.getElementById('sig-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasSig = false;
    });
  }

  // ---- PDF DOWNLOAD ----
  const dlBtn = document.getElementById('waiver-download');
  if (dlBtn) {
    dlBtn.addEventListener('click', () => {
      generateWaiverPDF(false);
    });
  }

  // ---- SUBMIT ----
  const submitBtn = document.getElementById('waiver-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('w-name')?.value.trim();
      const dob = document.getElementById('w-dob')?.value;
      const team = document.getElementById('w-team')?.value;
      const agreed = document.getElementById('w-agree')?.checked;

      if (!name || !dob || !team) { alert('Please fill in all required fields.'); return; }
      if (!hasSig) { alert('Please sign the waiver before submitting.'); return; }
      if (!agreed) { alert('Please check the agreement box.'); return; }

      generateWaiverPDF(true);

      const success = document.getElementById('waiver-success');
      if (success) {
        success.style.display = 'block';
        success.textContent = `✓ Waiver submitted for ${name}. Your PDF has been downloaded for your records.`;
      }
    });
  }

  function generateWaiverPDF(isSubmit) {
    const name = document.getElementById('w-name')?.value || 'Participant';
    const dob = document.getElementById('w-dob')?.value || '';
    const team = document.getElementById('w-team')?.value || '';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const sigDataURL = canvas.toDataURL('image/png');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });

    const gold = [201, 168, 76];
    const black = [0, 0, 0];
    const white = [255, 255, 255];
    const darkGray = [40, 40, 40];
    const gray = [120, 120, 120];

    // Header bar
    doc.setFillColor(...black);
    doc.rect(0, 0, 216, 297, 'F');

    doc.setFillColor(...darkGray);
    doc.rect(0, 0, 216, 38, 'F');

    doc.setFillColor(...gold);
    doc.rect(0, 36, 216, 2, 'F');

    // Logo text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.setTextColor(...white);
    doc.text('SOUTHBAY', 14, 18);
    doc.setTextColor(...gold);
    doc.text(' HOOPS', 66, 18);

    doc.setFontSize(8);
    doc.setTextColor(...gray);
    doc.setFont('helvetica', 'normal');
    doc.text('POWERED BY YOUTH RISING FLY HIGH  |  WWW.SOUTHBAYHOOPS.ORG', 14, 26);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...gold);
    doc.text('PARTICIPANT LIABILITY WAIVER & RELEASE', 14, 33);

    // Player info block
    let y = 50;
    doc.setFillColor(26, 26, 26);
    doc.roundedRect(14, y - 6, 188, 30, 1, 1, 'F');
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.3);
    doc.roundedRect(14, y - 6, 188, 30, 1, 1, 'S');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...gold);
    doc.text('PARTICIPANT NAME', 20, y + 1);
    doc.text('DATE OF BIRTH', 100, y + 1);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...white);
    doc.setFontSize(11);
    doc.text(name, 20, y + 9);
    doc.text(dob || '—', 100, y + 9);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...gold);
    doc.text('TEAM', 20, y + 16);
    doc.text('DATE SIGNED', 100, y + 16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...white);
    doc.setFontSize(10);
    doc.text(team, 20, y + 23);
    doc.text(date, 100, y + 23);

    // Waiver body
    y = 92;
    const sections = [
      { title: '1. ASSUMPTION OF RISK', body: 'I understand and acknowledge that participation in basketball and related athletic activities involves inherent risks of injury, including but not limited to sprains, strains, fractures, concussions, and other serious bodily injuries. I voluntarily and knowingly assume all such risks associated with participation in Southbay Hoops leagues, clinics, and events organized by Youth Rising Fly High (YRFH).' },
      { title: '2. RELEASE OF LIABILITY', body: 'In consideration of being permitted to participate, I, on behalf of myself, my heirs, executors, administrators, and assigns, hereby release, discharge, and hold harmless Youth Rising Fly High, Southbay Hoops, their officers, directors, employees, volunteers, agents, and representatives from any and all claims, demands, damages, costs, expenses, and causes of action arising out of or related to my participation, including claims arising from negligence.' },
      { title: '3. MEDICAL AUTHORIZATION', body: 'In the event of injury or medical emergency, I authorize YRFH staff to seek and consent to emergency medical treatment on my behalf. I acknowledge that I am responsible for all medical costs incurred. I confirm that I am physically capable of participating in athletic activities and have no known medical conditions that would prevent safe participation without physician clearance.' },
      { title: '4. CODE OF CONDUCT', body: 'I agree to abide by the rules and regulations of Southbay Hoops and conduct myself in a sportsmanlike manner at all times. I understand that unsportsmanlike conduct, fighting, or verbal abuse of officials, players, or staff may result in immediate ejection and/or suspension from the league without refund.' },
      { title: '5. PHOTO & MEDIA RELEASE', body: 'I grant Youth Rising Fly High and Southbay Hoops permission to use photographs, video recordings, and other media capturing my participation for promotional, educational, and social media purposes without compensation.' },
      { title: '6. GOVERNING LAW', body: 'This waiver shall be governed by the laws of the State of California. If any provision is found unenforceable, the remaining provisions shall remain in full force and effect. This constitutes the entire agreement between the parties regarding the matters herein.' },
    ];

    sections.forEach(sec => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...gold);
      doc.text(sec.title, 14, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(200, 200, 200);
      const lines = doc.splitTextToSize(sec.body, 188);
      lines.forEach(line => {
        if (y > 255) { doc.addPage(); doc.setFillColor(...black); doc.rect(0,0,216,297,'F'); y = 20; }
        doc.text(line, 14, y);
        y += 4.5;
      });
      y += 4;
    });

    // Signature area
    y += 4;
    doc.setFillColor(26, 26, 26);
    doc.roundedRect(14, y, 188, 44, 1, 1, 'F');
    doc.setDrawColor(...gold);
    doc.roundedRect(14, y, 188, 44, 1, 1, 'S');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...gold);
    doc.text('PARTICIPANT SIGNATURE', 20, y + 7);

    // Embed signature image
    if (hasSig) {
      doc.addImage(sigDataURL, 'PNG', 20, y + 10, 80, 24);
    }

    doc.setDrawColor(...gold);
    doc.setLineWidth(0.2);
    doc.line(20, y + 37, 100, y + 37);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...gray);
    doc.text('Signature', 20, y + 42);
    doc.text(`Signed: ${date}`, 110, y + 42);

    // Footer bar
    doc.setFillColor(...darkGray);
    doc.rect(0, 282, 216, 15, 'F');
    doc.setFillColor(...gold);
    doc.rect(0, 282, 216, 0.5, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    doc.text('Youth Rising Fly High | 501(c)(3) Nonprofit | San Jose, CA | www.southbayhoops.org', 14, 290);

    const filename = isSubmit
      ? `SBH_Waiver_${name.replace(/\s+/g,'_')}_${new Date().getFullYear()}.pdf`
      : 'SBH_Liability_Waiver.pdf';
    doc.save(filename);
  }
}
