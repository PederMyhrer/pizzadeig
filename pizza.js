// Tegner en napolitansk margherita på alle <canvas class="pizza" data-seed="..."> på siden.
(function () {
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function blob(ctx, cx, cy, r, wobble, rand, points) {
    const n = points || 14;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const rr = r * (1 - wobble / 2 + rand() * wobble);
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n];
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      if (i === 0) ctx.moveTo(mx, my); else ctx.quadraticCurveTo(p[0], p[1], mx, my);
    }
    const p = pts[0], q = pts[1];
    ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
    ctx.closePath();
  }

  function leaf(ctx, x, y, len, ang) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    const g = ctx.createLinearGradient(-len / 2, 0, len / 2, 0);
    g.addColorStop(0, '#1f6b2c'); g.addColorStop(1, '#3f9a45');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-len / 2, 0);
    ctx.quadraticCurveTo(0, -len * 0.42, len / 2, 0);
    ctx.quadraticCurveTo(0, len * 0.42, -len / 2, 0);
    ctx.fill();
    ctx.strokeStyle = 'rgba(200,235,190,.55)';
    ctx.lineWidth = Math.max(1, len * 0.03);
    ctx.beginPath(); ctx.moveTo(-len / 2, 0); ctx.quadraticCurveTo(0, -len * 0.04, len * 0.42, 0); ctx.stroke();
    ctx.restore();
  }

  function draw(cv) {
    const seed = +(cv.dataset.seed || 7);
    const css = cv.clientWidth || 300;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = css * dpr; cv.height = css * dpr;
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, css, css);
    const rand = rng(seed);
    const c = css / 2, R = css * 0.46;

    // Skygge og bunn (cornicione)
    ctx.save();
    ctx.shadowColor = 'rgba(40,20,10,.35)'; ctx.shadowBlur = css * 0.05; ctx.shadowOffsetY = css * 0.02;
    blob(ctx, c, c, R, 0.05, rand, 22);
    const crust = ctx.createRadialGradient(c, c, R * 0.7, c, c, R);
    crust.addColorStop(0, '#f0c27d'); crust.addColorStop(0.75, '#e2a85f'); crust.addColorStop(1, '#b97535');
    ctx.fillStyle = crust; ctx.fill();
    ctx.restore();

    // Leopardflekker i kanten
    for (let i = 0; i < 70; i++) {
      const a = rand() * Math.PI * 2, d = R * (0.8 + rand() * 0.17);
      const s = css * (0.004 + rand() * 0.014);
      ctx.fillStyle = `rgba(${40 + rand() * 30},${20 + rand() * 15},10,${0.45 + rand() * 0.45})`;
      blob(ctx, c + Math.cos(a) * d, c + Math.sin(a) * d, s, 0.6, rand, 7); ctx.fill();
    }

    // Tomatsaus
    blob(ctx, c, c, R * 0.78, 0.08, rand, 26);
    const sauce = ctx.createRadialGradient(c - R * 0.2, c - R * 0.2, R * 0.1, c, c, R * 0.8);
    sauce.addColorStop(0, '#d8402a'); sauce.addColorStop(1, '#a92318');
    ctx.fillStyle = sauce; ctx.fill();
    for (let i = 0; i < 40; i++) {
      const a = rand() * Math.PI * 2, d = rand() * R * 0.72;
      ctx.fillStyle = `rgba(120,15,10,${0.15 + rand() * 0.2})`;
      blob(ctx, c + Math.cos(a) * d, c + Math.sin(a) * d, css * (0.005 + rand() * 0.01), 0.5, rand, 6); ctx.fill();
    }

    // Mozzarella
    const cheese = [];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + rand() * 0.5, d = i === 0 ? R * 0.08 : R * (0.32 + rand() * 0.28);
      cheese.push([c + Math.cos(a) * d, c + Math.sin(a) * d, R * (0.13 + rand() * 0.07)]);
    }
    cheese.forEach(([x, y, r]) => {
      ctx.save();
      ctx.shadowColor = 'rgba(90,20,10,.35)'; ctx.shadowBlur = r * 0.25;
      blob(ctx, x, y, r, 0.35, rand, 11);
      const m = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
      m.addColorStop(0, '#fffdf4'); m.addColorStop(0.8, '#f8edd2'); m.addColorStop(1, '#e9cf9c');
      ctx.fillStyle = m; ctx.fill();
      ctx.restore();
      for (let k = 0; k < 3; k++) {
        ctx.fillStyle = `rgba(190,120,50,${0.25 + rand() * 0.3})`;
        blob(ctx, x + (rand() - 0.5) * r, y + (rand() - 0.5) * r, r * (0.08 + rand() * 0.1), 0.5, rand, 6); ctx.fill();
      }
    });

    // Basilikum
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.6 + rand() * 0.4, d = R * (0.25 + rand() * 0.4);
      leaf(ctx, c + Math.cos(a) * d, c + Math.sin(a) * d, R * (0.2 + rand() * 0.08), rand() * Math.PI * 2);
    }

    // Olivenolje
    for (let i = 0; i < 6; i++) {
      const a = rand() * Math.PI * 2, d = rand() * R * 0.65;
      ctx.fillStyle = `rgba(255,214,90,${0.18 + rand() * 0.15})`;
      blob(ctx, c + Math.cos(a) * d, c + Math.sin(a) * d, css * (0.008 + rand() * 0.012), 0.4, rand, 8); ctx.fill();
    }
  }

  function all() { document.querySelectorAll('canvas.pizza').forEach(draw); }
  all();
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(all, 150); });
})();
