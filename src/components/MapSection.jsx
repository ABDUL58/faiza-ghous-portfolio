import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 680;
const WIND_DARK  = [[0,188,212],[2,119,189],[77,143,255],[0,131,143],[100,181,246],[38,198,218]];
const WIND_LIGHT = [[2,119,189],[0,105,148],[0,131,143],[21,101,192],[0,77,100],[2,136,209]];

function spawnParticle(w, h, pal, fromLeft = false) {
  return {
    x:      fromLeft ? 0 : Math.random() * w,
    y:      Math.random() * h,
    px:     null,
    py:     null,
    speed:  0.55 + Math.random() * 1.1,
    color:  pal[Math.floor(Math.random() * pal.length)],
    alpha:  0.18 + Math.random() * 0.38,
    size:   0.5  + Math.random() * 1.1,
    age:    0,
    maxAge: 140 + Math.floor(Math.random() * 200),
  };
}

function initParticles(w, h, isDark) {
  const pal = isDark ? WIND_DARK : WIND_LIGHT;
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const p = spawnParticle(w, h, pal);
    p.age = Math.floor(Math.random() * p.maxAge); // stagger so they don't all die together
    return p;
  });
}

// Multi-scale vector field: large flow + mid eddies + small turbulence
function windVector(x, y, w, h, t) {
  const nx = x / w, ny = y / h;

  // Large-scale: left-to-right, stronger at mid-latitude (jet stream feel)
  const jetStrength = 1.0 - 0.7 * Math.pow((ny - 0.42) * 2.1, 2);
  const vxBase = 1.1 * Math.max(0.1, jetStrength);

  // Mid-scale eddies (slow rotation, large)
  const vxMid = Math.sin(ny * Math.PI * 2.8 + t * 0.038) * 0.52
              + Math.sin(nx * Math.PI * 1.6 + ny * Math.PI * 2.2 + t * 0.022) * 0.30;
  const vyMid = Math.cos(nx * Math.PI * 2.2 + t * 0.11) * 0.46
              + Math.cos(nx * Math.PI * 1.4 + ny * Math.PI * 3.0 + t * 0.09) * 0.28;

  // Small-scale turbulence (faster, tighter)
  const vxTurb = Math.sin(nx * Math.PI * 5.5 + ny * Math.PI * 4.0 + t * 0.28) * 0.22
               + Math.cos(nx * Math.PI * 3.8 + ny * Math.PI * 5.5 + t * 0.34) * 0.16;
  const vyTurb = Math.cos(nx * Math.PI * 4.5 + ny * Math.PI * 3.5 + t * 0.24) * 0.22
               + Math.sin(nx * Math.PI * 6.0 + ny * Math.PI * 4.2 + t * 0.31) * 0.16;

  // Gust envelope — periodic speed surge
  const gust = 0.82 + 0.28 * Math.sin(t * 0.07 + nx * 3.2 + ny * 2.1);

  return {
    vx: (vxBase + vxMid + vxTurb) * gust,
    vy: (vyMid  + vyTurb) * gust,
  };
}

function drawWindFlow(ctx, w, h, t, isDark, state) {
  // Slow fade — trails persist long enough to read the flow
  ctx.fillStyle = isDark ? "rgba(8,14,25,0.07)" : "rgba(244,247,252,0.07)";
  ctx.fillRect(0, 0, w, h);

  const pal = isDark ? WIND_DARK : WIND_LIGHT;

  state.particles.forEach((p, i) => {
    const { vx, vy } = windVector(p.x, p.y, w, h, t);

    p.age++;

    // Respawn when lifetime ends or particle exits canvas
    const offscreen = p.x > w + 8 || p.x < -8 || p.y > h + 8 || p.y < -8;
    if (p.age > p.maxAge || offscreen) {
      const fromLeft = Math.random() < 0.62;
      const fresh = spawnParticle(w, h, pal, fromLeft);
      state.particles[i] = fresh;
      return;
    }

    if (p.px !== null) {
      const spd      = Math.hypot(vx, vy);
      const fadeIn   = Math.min(1, p.age / 18);
      const fadeOut  = Math.min(1, (p.maxAge - p.age) / 18);
      const dynAlpha = p.alpha * fadeIn * fadeOut * (0.45 + 0.55 * (spd / 2.8));

      const [r, g, b] = p.color;
      ctx.beginPath();
      ctx.moveTo(p.px, p.py);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(${r},${g},${b},${Math.min(0.78, dynAlpha).toFixed(3)})`;
      ctx.lineWidth   = p.size;
      ctx.lineCap     = "round";
      ctx.stroke();
    }

    p.px = p.x;
    p.py = p.y;
    p.x += vx * p.speed;
    p.y += vy * p.speed;
  });
}

export function MapSection() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const stateRef  = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");
    const isDark = () => document.documentElement.classList.contains("dark");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      stateRef.current.particles = initParticles(canvas.width, canvas.height, isDark());
    };

    resize();
    window.addEventListener("resize", resize);
    cancelAnimationFrame(animRef.current);
    stateRef.current = {
      time:      0,
      particles: initParticles(canvas.width, canvas.height, isDark()),
    };

    const draw = () => {
      stateRef.current.time += 0.004;
      const { width: w, height: h } = canvas;
      drawWindFlow(ctx, w, h, stateRef.current.time, isDark(), stateRef.current);
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" style={{ zIndex: 0 }} />
    </div>
  );
}
