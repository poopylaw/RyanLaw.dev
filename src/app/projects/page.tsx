import TitleBlock from "@/components/TitleBlock";
import Projects from "@/components/Projects";
import PageTransition from "@/components/PageTransition";
import FadeText from "@/components/FadeText";

export default function ProjectsPage() {
  return (
    <main className="relative">
      <TitleBlock />
      <PageTransition>
        <div className="pt-28">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <p className="font-mono text-xs tracking-[0.2em] text-blueprint">
              DWG. 003
            </p>
            <h1
              className="mt-4 text-5xl text-ink md:text-7xl"
              style={{ fontWeight: 500 }}
            >
              <FadeText text="Projects" />
            </h1>
          </div>
        </div>
        <Projects />
      </PageTransition>
    </main>
  );
}
