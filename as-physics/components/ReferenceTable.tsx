"use client";
import { useMemo, useState } from "react";
import Tex from "./Tex";
import { flat, units } from "@/lib/physics-data";

export default function ReferenceTable() {
  const [q, setQ] = useState("");
  const [unit, setUnit] = useState(0);
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return flat.filter((r) => (unit === 0 || r.unit === unit) &&
      (!s || [r.name, r.topic, r.unitTitle, r.conditions, r.tex, ...r.vars.flat()].join(" ").toLowerCase().includes(s)));
  }, [q, unit]);
  return (
    <div className="space-y-5">
      <div><h1 className="font-display text-3xl font-bold text-white">Master AS Physics Equation Table</h1>
        <p className="mt-2 text-slate-400">Search by name, symbol, quantity or condition; filter by unit.</p></div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, e.g. “resistivity”, “elastic”, “constant acceleration”…" aria-label="Search equations"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm outline-none focus:border-indigo-400" />
        <select value={unit} onChange={(e) => setUnit(+e.target.value)} aria-label="Filter by unit"
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm">
          <option value={0}>All units</option>{units.map((u) => <option key={u.id} value={u.id}>Unit {u.id}: {u.title}</option>)}</select>
      </div>
      <p className="text-xs text-slate-500">{rows.length} of {flat.length} equations</p>
      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-slate-900 text-xs uppercase tracking-wider text-indigo-300"><tr>
            {["Topic / Unit", "Equation", "Variables & SI units", "Conditions of validity"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((r) => (
              <tr key={r.id} className="align-top hover:bg-slate-900/60">
                <td className="px-4 py-3"><div className="font-medium text-slate-100">{r.topic}</div><div className="text-xs text-slate-500">Unit {r.unit}: {r.unitTitle}</div></td>
                <td className="px-4 py-3"><div className="mb-1 text-slate-300">{r.name}</div><div className="text-base"><Tex t={r.tex} /></div></td>
                <td className="px-4 py-3"><ul className="space-y-0.5">{r.vars.map(([s, m, u]) => (
                  <li key={s}><Tex t={s} /> <span className="text-slate-300">– {m}</span> <span className="text-slate-500">[{u}]</span></li>))}</ul></td>
                <td className="px-4 py-3 text-slate-300">{r.conditions}</td></tr>))}
            {!rows.length && <tr><td colSpan={4} className="px-4 py-10 text-center text-slate-500">No equations match your search.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
