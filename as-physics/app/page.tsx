import Link from "next/link";
import Tex from "@/components/Tex";
const cards = [
  ["/archive", "Derivation & Proof Archive", "Every equation in Units 1–10 built from first principles, with misconceptions and Paper 1/2 exam tips.", "v = u + at"],
  ["/reference", "Master Equation Table", "Search and filter every AS equation by unit, with SI units and conditions of validity.", "\\sum I_{in}=\\sum I_{out}"],
  ["/lab", "Circuits Laboratory", "Drive EMF, internal resistance and load R; watch drift, the V–I graph, and Kirchhoff's laws.", "V = E - Ir"],
];
export default function Home() {
  return (
    <div className="space-y-10">
      <section className="py-10 text-center">
        <p className="text-sm uppercase tracking-widest text-indigo-400">Cambridge International AS Level</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-6xl">AS Physics Masterclass &amp; Lab</h1>
        <p className="mx-auto mt-5 max-w-2xl text-slate-400">Mechanics, waves and D.C. circuits: understand where each equation comes from, know exactly when it applies, and test it on a live circuit.</p>
      </section>
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map(([h, t, d, f]) => (
          <Link key={h} href={h} className="card group transition hover:border-indigo-500/60">
            <div className="rounded-lg bg-slate-950/60 p-4 text-center text-xl"><Tex t={f} /></div>
            <h2 className="mt-4 font-display text-xl font-semibold text-white group-hover:text-indigo-300">{t}</h2>
            <p className="mt-2 text-sm text-slate-400">{d}</p>
          </Link>))}
      </div>
    </div>
  );
}
