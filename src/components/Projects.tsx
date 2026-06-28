import Link from "next/link";
import { SectionLabel } from "./Experience";
import { projects } from "@/lib/projects";
import FadeText from "./FadeText";

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" label="PROJECTS" />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  slug,
  title,
  stack,
  summary,
  index,
}: {
  slug: string;
  title: string;
  stack: string;
  summary: string;
  index: number;
}) {
  const delay = index * 0.05;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative flex flex-col bg-paper p-8 transition-colors hover:bg-paper-dim"
    >
      <div className="flex items-center justify-end">
        <span className="h-1.5 w-1.5 rounded-full bg-brass opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <h3 className="mt-4 text-xl leading-snug text-ink" style={{ fontWeight: 500 }}>
        <FadeText text={title} baseDelay={delay} />
      </h3>
      <p className="mt-2 font-mono text-[11px] tracking-[0.06em] text-blueprint">
        <FadeText text={stack} baseDelay={delay + 0.06} />
      </p>

      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
        <FadeText text={summary} baseDelay={delay + 0.12} wordDelay={0.02} />
      </p>

      <span className="mt-6 font-mono text-[11px] tracking-[0.1em] text-ink-soft transition-colors group-hover:text-blueprint">
        VIEW PROJECT →
      </span>
    </Link>
  );
}
