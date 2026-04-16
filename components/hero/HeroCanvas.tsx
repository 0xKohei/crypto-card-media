"use client";

import { useEffect, useRef } from "react";

// ─── World city positions as ratio of canvas (x: 0→1 left→right, y: 0→1 top→bottom)
// Treating the canvas roughly as a Mercator strip of the globe
const NODES = [
  { rx: 0.805, ry: 0.295, name: "Tokyo" },
  { rx: 0.770, ry: 0.500, name: "Singapore" },
  { rx: 0.775, ry: 0.375, name: "Shanghai" },
  { rx: 0.678, ry: 0.430, name: "Mumbai" },
  { rx: 0.613, ry: 0.370, name: "Dubai" },
  { rx: 0.525, ry: 0.250, name: "Zurich" },
  { rx: 0.497, ry: 0.240, name: "London" },
  { rx: 0.280, ry: 0.295, name: "New York" },
  { rx: 0.315, ry: 0.600, name: "São Paulo" },
  { rx: 0.820, ry: 0.680, name: "Sydney" },
  { rx: 0.545, ry: 0.270, name: "Frankfurt" },
  { rx: 0.190, ry: 0.320, name: "Chicago" },
];

// Arc connections between city indices
const CONNECTIONS: [number, number][] = [
  [0, 2], [0, 1], [1, 3], [2, 3], [3, 4],
  [4, 5], [4, 10], [5, 6], [5, 10], [6, 7],
  [7, 11], [7, 8], [10, 7], [0, 5], [1, 9],
  [2, 5], [3, 10], [11, 8], [6, 10], [0, 9],
];

interface NodeState {
  x: number;
  y: number;
  phase: number;
}

interface Packet {
  t: number;
  speed: number;
  active: boolean;
}

interface Arc {
  a: number;
  b: number;
  packets: Packet[];
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    let animId = 0;
    let W = 0;
    let H = 0;
    let nodes: NodeState[] = [];
    let arcs: Arc[] = [];

    function init() {
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = NODES.map((n, i) => ({
        x: n.rx * W,
        y: n.ry * H,
        phase: (i / NODES.length) * Math.PI * 2,
      }));

      arcs = CONNECTIONS.map(([a, b]) => ({
        a,
        b,
        packets: [
          { t: Math.random(), speed: 0.00022 + Math.random() * 0.00020, active: Math.random() > 0.35 },
          { t: Math.random(), speed: 0.00018 + Math.random() * 0.00028, active: Math.random() > 0.55 },
        ],
      }));
    }

    /** Quadratic bezier control point with a slight perpendicular bend */
    function cp(a: NodeState, b: NodeState) {
      const mx = (a.x + b.x) * 0.5;
      const my = (a.y + b.y) * 0.5;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const bend = len * 0.22;
      return { x: mx + (dy / len) * bend, y: my - (dx / len) * bend };
    }

    /** Point on quadratic bezier at t */
    function bpt(a: NodeState, c: { x: number; y: number }, b: NodeState, t: number) {
      const u = 1 - t;
      return {
        x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
        y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
      };
    }

    function draw(ts: number) {
      ctx!.clearRect(0, 0, W, H);

      // ── Arcs ──────────────────────────────────────────────────
      for (const arc of arcs) {
        const na = nodes[arc.a];
        const nb = nodes[arc.b];
        const c = cp(na, nb);

        // Static arc line
        ctx!.beginPath();
        ctx!.moveTo(na.x, na.y);
        ctx!.quadraticCurveTo(c.x, c.y, nb.x, nb.y);
        ctx!.strokeStyle = "rgba(56, 120, 210, 0.13)";
        ctx!.lineWidth = 0.85;
        ctx!.stroke();

        if (reduced) continue;

        // Animated data packets
        for (const pkt of arc.packets) {
          if (!pkt.active) {
            if (Math.random() < 0.002) pkt.active = true;
            continue;
          }
          pkt.t += pkt.speed * 16;
          if (pkt.t >= 1) {
            pkt.t = 0;
            pkt.active = Math.random() > 0.2;
            continue;
          }

          const pos = bpt(na, c, nb, pkt.t);
          const alpha = Math.sin(pkt.t * Math.PI);

          // Outer glow
          const g = ctx!.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 6);
          g.addColorStop(0, `rgba(160, 210, 255, ${alpha * 0.75})`);
          g.addColorStop(1, "rgba(59, 130, 246, 0)");
          ctx!.beginPath();
          ctx!.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
          ctx!.fillStyle = g;
          ctx!.fill();

          // Bright core
          ctx!.beginPath();
          ctx!.arc(pos.x, pos.y, 1.6, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(230, 245, 255, ${alpha * 0.95})`;
          ctx!.fill();
        }
      }

      // ── Nodes ─────────────────────────────────────────────────
      for (const node of nodes) {
        const pulse = reduced ? 1.0 : 0.55 + 0.45 * Math.sin(ts * 0.00085 + node.phase);
        const pulseR = 8 * pulse;

        // Outer pulse ring (fades as it expands)
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(59, 130, 246, ${0.22 * (1 - pulse * 0.6)})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // Soft glow
        const ng = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, 9);
        ng.addColorStop(0, "rgba(96, 165, 250, 0.38)");
        ng.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, 9, 0, Math.PI * 2);
        ctx!.fillStyle = ng;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, 2.4, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(210, 235, 255, 0.95)";
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    init();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      init();
      animId = requestAnimationFrame(draw);
    });
    ro.observe(canvas);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
