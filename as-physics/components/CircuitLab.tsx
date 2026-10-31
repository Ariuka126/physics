"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Tex from "./Tex";

const f = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d) : "—");

function Slider({ label, tex, value, min, max, step, unit, onChange }: { label: string; tex: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <label className="block text-sm"><div className="mb-1 flex justify-between"><span className="text-slate-300">{label} <Tex t={tex} /></span>
      <span className="font-mono text-indigo-300">{f(value, step < 1 ? 2 : 0)} {unit}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} /></label>
  );
}

/* Point on a rectangular loop (perimeter parametrised 0..1, clockwise from top-left) */
function loopPoint(t: number, x0 = 60, y0 = 40, w = 380, h = 170): [number, number] {
  const p = 2 * (w + h), d = ((t % 1) + 1) % 1 * p;
  if (d < w) return [x0 + d, y0];
  if (d < w + h) return [x0 + w, y0 + d - w];
  if (d < 2 * w + h) return [x0 + w - (d - w - h), y0 + h];
  return [x0, y0 + h - (d - 2 * w - h)];
}

function CircuitDiagram({ I, E, r, R, V }: { I: number; E: number; r: number; R: number; V: number }) {
  const phase = useRef(0), last = useRef(0), [, force] = useState(0);
  // Drift speed is proportional to current (v = I / nAq); scaled for visibility
  const speed = Math.min(I, 12) * 0.035;
  useEffect(() => {
    let id = 0;
    const tick = (now: number) => {
      const dt = last.current ? (now - last.current) / 1000 : 0; last.current = now;
      phase.current = (phase.current - speed * dt + 1000) % 1; // electrons move opposite to conventional current
      force((n) => n + 1); id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick); return () => cancelAnimationFrame(id);
  }, [speed]);
  const dots = Array.from({ length: 28 }, (_, i) => loopPoint(phase.current + i / 28));
  return (
    <svg viewBox="0 0 500 250" className="w-full" role="img" aria-label="Series circuit with battery, internal resistance and load resistor">
      <rect x="60" y="40" width="380" height="170" rx="6" fill="none" stroke="#475569" strokeWidth="3" />
      {/* battery (left) with internal resistance box */}
      <rect x="40" y="95" width="40" height="60" fill="#0f172a" />
      <line x1="48" y1="108" x2="72" y2="108" stroke="#e2e8f0" strokeWidth="3" /><line x1="54" y1="122" x2="66" y2="122" stroke="#e2e8f0" strokeWidth="6" />
      <text x="88" y="118" fill="#a5b4fc" fontSize="13">E = {f(E, 1)} V</text>
      <rect x="45" y="158" width="30" height="20" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" /><text x="88" y="173" fill="#fbbf24" fontSize="12">r = {f(r)} Ω</text>
      {/* load resistor (right) */}
      <rect x="415" y="95" width="50" height="60" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" /><text x="395" y="130" fill="#7dd3fc" fontSize="13" textAnchor="end">R = {f(R, 1)} Ω</text>
      <text x="250" y="30" fill="#cbd5e1" fontSize="13" textAnchor="middle">I = {f(I)} A · terminal p.d. V = {f(V)} V</text>
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.2" fill="#818cf8" opacity={I < 0.005 ? 0.15 : 0.95} />)}
      <text x="250" y="238" fill="#64748b" fontSize="11" textAnchor="middle">Electrons (drift opposite to conventional current); speed ∝ I</text>
    </svg>
  );
}

function VIGraph({ E, r, I, V }: { E: number; r: number; I: number; V: number }) {
  const W = 440, H = 300, m = { l: 50, r: 20, t: 20, b: 40 };
  const iMax = E / r, xMax = Math.max(iMax, 0.1);
  const sx = (i: number) => m.l + (i / xMax) * (W - m.l - m.r), sy = (v: number) => H - m.b - (v / (E * 1.1)) * (H - m.t - m.b);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Graph of terminal voltage against current">
      <line x1={m.l} y1={H - m.b} x2={W - m.r} y2={H - m.b} stroke="#64748b" /><line x1={m.l} y1={m.t} x2={m.l} y2={H - m.b} stroke="#64748b" />
      {[0, 0.25, 0.5, 0.75, 1].map((k) => (<g key={k}>
        <line x1={sx(k * xMax)} y1={H - m.b} x2={sx(k * xMax)} y2={H - m.b + 4} stroke="#64748b" /><text x={sx(k * xMax)} y={H - m.b + 16} fill="#94a3b8" fontSize="10" textAnchor="middle">{f(k * xMax, 1)}</text>
        <line x1={m.l - 4} y1={sy(k * E)} x2={m.l} y2={sy(k * E)} stroke="#64748b" /><text x={m.l - 8} y={sy(k * E) + 3} fill="#94a3b8" fontSize="10" textAnchor="end">{f(k * E, 1)}</text></g>))}
      <line x1={sx(0)} y1={sy(E)} x2={sx(iMax)} y2={sy(0)} stroke="#818cf8" strokeWidth="2.5" />
      <line x1={sx(I)} y1={sy(V)} x2={sx(I)} y2={sy(0)} stroke="#38bdf8" strokeDasharray="4" /><line x1={m.l} y1={sy(V)} x2={sx(I)} y2={sy(V)} stroke="#38bdf8" strokeDasharray="4" />
      <circle cx={sx(I)} cy={sy(V)} r="6" fill="#f59e0b" /><circle cx={sx(0)} cy={sy(E)} r="4" fill="#34d399" />
      <text x={m.l + 8} y={sy(E) - 8} fill="#34d399" fontSize="11">y-intercept = E = {f(E, 1)} V</text>
      <text x={sx(iMax / 2) + 8} y={sy(E / 2) - 10} fill="#c7d2fe" fontSize="11">gradient = −r = −{f(r)} Ω</text>
      <text x={sx(iMax)} y={sy(0) - 8} fill="#fda4af" fontSize="10" textAnchor="end">short-circuit I = E/r = {f(iMax)} A</text>
      <text x={(W + m.l) / 2} y={H - 6} fill="#cbd5e1" fontSize="12" textAnchor="middle">Current I / A</text>
      <text transform={`translate(12 ${H / 2}) rotate(-90)`} fill="#cbd5e1" fontSize="12" textAnchor="middle">Terminal p.d. V / V</text>
    </svg>
  );
}

function Junction() {
  const [ins, setIns] = useState([3, 1.5]), [outs, setOuts] = useState([2, 0]);
  const sIn = ins.reduce((a, b) => a + b, 0), sOut = outs.reduce((a, b) => a + b, 0), missing = sIn - sOut;
  const row = (arr: number[], set: (a: number[]) => void, p: string) => arr.map((v, i) => (
    <label key={i} className="flex items-center gap-2 text-sm"><span className="w-14"><Tex t={`I_{${p}${i + 1}}`} /></span>
      <input type="number" min={0} step={0.1} value={v} onChange={(e) => set(arr.map((x, j) => (j === i ? Math.max(0, +e.target.value) : x)))}
        className="w-24 rounded border border-slate-700 bg-slate-950 px-2 py-1" /> A</label>));
  return (
    <div className="card space-y-3"><h3 className="font-display text-lg text-white">Kirchhoff's first law: junction calculator</h3>
      <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><p className="text-xs uppercase text-emerald-400">Currents in</p>{row(ins, setIns, "in")}
        <button className="text-xs text-indigo-300" onClick={() => setIns([...ins, 0])}>+ add branch in</button></div>
        <div className="space-y-2"><p className="text-xs uppercase text-rose-400">Currents out</p>{row(outs, setOuts, "out")}
          <button className="text-xs text-indigo-300" onClick={() => setOuts([...outs, 0])}>+ add branch out</button></div></div>
      <Tex t={`\\sum I_{in}=${f(sIn)}\\ \\text{A},\\qquad \\sum I_{out}=${f(sOut)}\\ \\text{A}`} block />
      <p className={`rounded-lg p-3 text-sm ${Math.abs(missing) < 1e-9 ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-200"}`}>
        {Math.abs(missing) < 1e-9 ? "Balanced: charge is conserved at this junction." : missing > 0
          ? `Unbalanced: an extra outgoing current of ${f(missing)} A is needed to conserve charge.` : `Unbalanced: an extra incoming current of ${f(-missing)} A is needed.`}</p>
    </div>
  );
}

function LoopSolver() {
  const [E1, setE1] = useState(12), [E2, setE2] = useState(5), [R1, setR1] = useState(4), [R2, setR2] = useState(2), [R3, setR3] = useState(1);
  const Rt = R1 + R2 + R3, I = (E1 - E2) / Rt;
  const rows = useMemo(() => [["R_1", R1], ["R_2", R2], ["R_3", R3]].map(([n, R]) => [n as string, I * (R as number)] as const), [I, R1, R2, R3]);
  const sumIR = rows.reduce((a, [, v]) => a + v, 0);
  return (
    <div className="card space-y-3"><h3 className="font-display text-lg text-white">Kirchhoff's second law: loop solver</h3>
      <p className="text-xs text-slate-400">A single loop with two opposing batteries (internal resistances included in R₁–R₃). Taking the E₁ direction as positive:</p>
      <div className="grid gap-3 sm:grid-cols-2"><Slider label="EMF" tex="E_1" value={E1} min={0} max={24} step={0.5} unit="V" onChange={setE1} />
        <Slider label="EMF (opposing)" tex="E_2" value={E2} min={0} max={24} step={0.5} unit="V" onChange={setE2} />
        <Slider label="Resistance" tex="R_1" value={R1} min={1} max={20} step={1} unit="Ω" onChange={setR1} />
        <Slider label="Resistance" tex="R_2" value={R2} min={1} max={20} step={1} unit="Ω" onChange={setR2} />
        <Slider label="Resistance" tex="R_3" value={R3} min={1} max={20} step={1} unit="Ω" onChange={setR3} /></div>
      <Tex block t={`E_1-E_2=I(R_1+R_2+R_3)\\;\\Rightarrow\\; I=\\frac{${f(E1, 1)}-${f(E2, 1)}}{${Rt}}=${f(I)}\\ \\text{A}`} />
      <ul className="grid gap-1 text-sm sm:grid-cols-3">{rows.map(([n, v]) => <li key={n} className="rounded bg-slate-950/60 px-3 py-1.5">V<sub>{n.slice(2)}</sub>: <span className="font-mono text-sky-300">{f(v)} V</span></li>)}</ul>
      <p className="rounded-lg bg-indigo-500/10 p-3 text-sm text-indigo-200">Check: ΣE = {f(E1 - E2)} V and ΣIR = {f(sumIR)} V, so they {Math.abs(E1 - E2 - sumIR) < 1e-9 ? "agree" : "disagree"}. {I < 0 ? "Negative I means current flows opposite to the assumed direction (E₂ dominates)." : ""}</p>
    </div>
  );
}

export default function CircuitLab() {
  const [E, setE] = useState(9), [r, setR] = useState(1.5), [R, setLoad] = useState(6);
  const I = E / (R + r), V = E - I * r, Pl = I * I * R, Pi = I * I * r;
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-3xl font-bold text-white">Interactive Electrical Circuits Laboratory</h1>
        <p className="mt-2 text-slate-400">Units 9 &amp; 10: vary the EMF, internal resistance and load, and watch every quantity update.</p></div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-4"><div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <Slider label="EMF" tex="E" value={E} min={1} max={24} step={0.5} unit="V" onChange={setE} />
          <Slider label="Internal resistance" tex="r" value={r} min={0.1} max={10} step={0.1} unit="Ω" onChange={setR} />
          <Slider label="Load" tex="R" value={R} min={0.5} max={50} step={0.5} unit="Ω" onChange={setLoad} /></div>
          <CircuitDiagram I={I} E={E} r={r} R={R} V={V} />
          <dl className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {[["Current I", `${f(I)} A`], ["Terminal V", `${f(V)} V`], ["Lost volts Ir", `${f(I * r)} V`], ["Load power", `${f(Pl)} W`]].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-slate-950/60 p-2"><dt className="text-xs text-slate-500">{k}</dt><dd className="font-mono text-indigo-200">{v}</dd></div>))}</dl>
          <Tex block t={`I=\\frac{E}{R+r}=\\frac{${f(E, 1)}}{${f(R, 1)}+${f(r, 1)}}=${f(I)}\\ \\text{A},\\quad V=E-Ir=${f(V)}\\ \\text{V}`} />
          <p className="text-xs text-slate-400">Power: source EMF·I = {f(E * I)} W = load {f(Pl)} W + internal {f(Pi)} W. Load power is greatest when R = r (try it).</p></div>
        <div className="card space-y-3"><h2 className="font-display text-lg text-white">V against I: <Tex t="V=E-Ir" /></h2><VIGraph E={E} r={r} I={I} V={V} />
          <p className="text-sm text-slate-400">The straight line has y-intercept <Tex t="E" /> and gradient <Tex t="-r" />. The orange point is the current operating point set by the load slider.</p></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2"><Junction /><LoopSolver /></div>
    </div>
  );
}
