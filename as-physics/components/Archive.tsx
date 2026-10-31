"use client";
import { useState } from "react";
import Tex from "./Tex";
import { units, type Formula } from "@/lib/physics-data";

function FormulaCard({ f }: { f: Formula }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="card space-y-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div><h4 className="font-display text-lg font-semibold text-white">{f.name}</h4>
          <p className="mt-1 text-xs text-slate-400"><span className="font-medium text-indigo-300">Valid when:</span> {f.conditions}</p></div>
        <div className="rounded-lg bg-slate-950/70 px-4 py-2 text-xl"><Tex t={f.tex} /></div>
      </header>
      <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
        {f.vars.map(([s, m, u]) => (
          <div key={s} className="flex items-baseline gap-2"><dt className="min-w-12"><Tex t={s} /></dt>
            <dd className="text-slate-300">{m} <span className="text-slate-500">[{u}]</span></dd></div>))}
      </dl>
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-200 hover:bg-indigo-500/20">
        {open ? "Hide" : "Show"} step-by-step proof / derivation</button>
      {open && (
        <ol className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
          {f.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">{i + 1}</span>
              <div className="min-w-0 text-sm"><p>{s.text}</p>{s.tex && <Tex t={s.tex} block />}</div></li>))}
        </ol>)}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 text-sm"><h5 className="mb-1 font-semibold text-rose-300">Common misconceptions</h5>
          <ul className="list-disc space-y-1 pl-5 text-slate-300">{f.misconceptions.map((m) => <li key={m}>{m}</li>)}</ul></div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm"><h5 className="mb-1 font-semibold text-emerald-300">Exam tips (Paper 1 &amp; 2)</h5>
          <ul className="list-disc space-y-1 pl-5 text-slate-300">{f.tips.map((m) => <li key={m}>{m}</li>)}</ul></div>
      </div>
    </article>
  );
}

export default function Archive() {
  const [uid, setUid] = useState(2);
  const unit = units.find((u) => u.id === uid)!;
  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-3xl font-bold text-white">Formula Derivation &amp; Proof Archive</h1>
        <p className="mt-2 text-slate-400">Pick a unit, then open any card to see how the equation is built from definitions and conservation laws.</p></div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {units.map((u) => (
          <button key={u.id} role="tab" aria-selected={u.id === uid} onClick={() => setUid(u.id)}
            className={`rounded-lg border px-3 py-2 text-sm transition ${u.id === uid ? "border-indigo-400 bg-indigo-600 text-white" : "border-slate-700 bg-slate-900 text-slate-300 hover:border-indigo-500/60"}`}>
            <span className="font-semibold">Unit {u.id}</span><span className="hidden lg:inline"> · {u.title}</span></button>))}
      </div>
      <section className="space-y-6">
        <h2 className="font-display text-2xl text-indigo-300">Unit {unit.id}: {unit.title} <span className="ml-2 text-xs uppercase tracking-wider text-slate-500">{unit.strand}</span></h2>
        {unit.topics.map((t) => (
          <div key={t.id} className="space-y-4"><h3 className="border-l-4 border-indigo-500 pl-3 text-lg font-semibold text-slate-100">{t.name}</h3>
            {t.formulas.map((f) => <FormulaCard key={f.id} f={f} />)}</div>))}
      </section>
    </div>
  );
}
