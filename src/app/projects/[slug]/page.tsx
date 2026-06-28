import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TitleBlock from "@/components/TitleBlock";
import PageTransition from "@/components/PageTransition";
import FadeText from "@/components/FadeText";
import { getProjectBySlug, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main className="relative">
      <TitleBlock />
      <PageTransition>
        <article className="px-6 pt-28 pb-24 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/projects"
              className="font-mono text-[11px] tracking-[0.12em] text-ink-soft transition-colors hover:text-blueprint"
            >
              ← ALL PROJECTS
            </Link>

            <h1
              className="mt-8 text-4xl leading-tight text-ink md:text-6xl"
              style={{ fontWeight: 500 }}
            >
              <FadeText text={project.title} />
            </h1>
            <p className="mt-3 font-mono text-sm tracking-[0.04em] text-blueprint">
              <FadeText text={project.stack} baseDelay={0.08} />
            </p>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
              <FadeText text={project.detail} baseDelay={0.16} wordDelay={0.02} />
            </p>

            {project.images && project.images.length > 0 && (
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {project.images.map((img) => (
                  <figure key={img.src} className="flex flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink/10 bg-paper-dim">
                      <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 font-mono text-[11px] tracking-[0.06em] text-blueprint">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {(project.goal || project.tools) && (
              <div className="mt-14 grid grid-cols-1 gap-6 border-t border-ink/10 pt-10 md:grid-cols-2">
                {project.goal && (
                  <div className="border border-ink/15 p-6">
                    <h2 className="text-lg text-ink" style={{ fontWeight: 500 }}>
                      Goal
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      <FadeText text={project.goal} wordDelay={0.02} />
                    </p>
                  </div>
                )}
                {project.tools && (
                  <div className="border border-ink/15 p-6">
                    <h2 className="text-lg text-ink" style={{ fontWeight: 500 }}>
                      Tools Used
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      <FadeText text={project.tools} wordDelay={0.02} />
                    </p>
                  </div>
                )}
              </div>
            )}

            {project.sections && project.sections.length > 0 && (
              <div className="mt-16 space-y-12 border-t border-ink/10 pt-12">
                {project.sections.map((s, i) => (
                  <div key={s.heading}>
                    <h2
                      className="text-2xl text-ink md:text-3xl"
                      style={{ fontWeight: 500 }}
                    >
                      <FadeText text={s.heading} baseDelay={i * 0.03} />
                    </h2>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                      <FadeText
                        text={s.body}
                        baseDelay={i * 0.03 + 0.06}
                        wordDelay={0.015}
                      />
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="tick-border mt-20 flex items-center justify-between pt-6 font-mono text-[10px] tracking-[0.12em] text-ink/40">
              <Link href="/projects" className="hover:text-blueprint transition-colors">
                ← ALL PROJECTS
              </Link>
              <Link href="/contact" className="hover:text-blueprint transition-colors">
                GET IN TOUCH →
              </Link>
            </div>
          </div>
        </article>
      </PageTransition>
    </main>
  );
}
