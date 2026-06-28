import TitleBlock from "@/components/TitleBlock";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import PageTransition from "@/components/PageTransition";
import FadeText from "@/components/FadeText";

export default function WorkPage() {
  return (
    <main className="relative">
      <TitleBlock />
      <PageTransition>
        <div className="pt-28">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <p className="font-mono text-xs tracking-[0.2em] text-blueprint">
              DWG. 002
            </p>
            <h1
              className="mt-4 text-5xl text-ink md:text-7xl"
              style={{ fontWeight: 500 }}
            >
              <FadeText text="Experience" />
            </h1>
          </div>
        </div>
        <Education />
        <Experience />
      </PageTransition>
    </main>
  );
}
