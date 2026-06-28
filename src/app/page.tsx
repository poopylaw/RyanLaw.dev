import Link from "next/link";
import TitleBlock from "@/components/TitleBlock";
import Hero from "@/components/Hero";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <main className="relative">
      <TitleBlock />
      <PageTransition>
        <Hero />

        <div className="tick-border mx-auto flex max-w-6xl items-center justify-between px-6 py-8 font-mono text-[10px] tracking-[0.12em] text-ink/40 md:px-10">
          <span>RYAN LAW — MECHANICAL ENGINEERING</span>
          <Link href="/contact" className="hover:text-blueprint transition-colors">
            GET IN TOUCH →
          </Link>
        </div>
      </PageTransition>
    </main>
  );
}
