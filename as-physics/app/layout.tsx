import "./globals.css";
import "katex/dist/katex.min.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = { title: "AS Physics Masterclass & Lab", description: "Cambridge International AS Level Physics: derivations, equation reference and circuits laboratory." };
const links = [["/archive", "Derivation Archive"], ["/reference", "Equation Table"], ["/lab", "Circuits Lab"]];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en"><body>
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="font-display text-lg font-bold text-indigo-300">AS Physics <span className="text-slate-400">Masterclass &amp; Lab</span></Link>
          <div className="flex gap-1 text-sm">{links.map(([h, l]) => (
            <Link key={h} href={h} className="rounded-lg px-3 py-1.5 text-slate-300 transition hover:bg-indigo-500/15 hover:text-indigo-200">{l}</Link>))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">Aligned to Cambridge International AS Level Physics (9702), Units 1–10.</footer>
    </body></html>
  );
}
