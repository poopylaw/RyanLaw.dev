import TitleBlock from "@/components/TitleBlock";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";

export default function ContactPage() {
  return (
    <main className="relative">
      <TitleBlock />
      <PageTransition>
        <div className="pt-28">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <p className="font-mono text-xs tracking-[0.2em] text-blueprint">
              DWG. 005
            </p>
          </div>
        </div>
        <Contact />
      </PageTransition>
    </main>
  );
}
