import { SectionLabel } from "./Experience";
import FadeText from "./FadeText";

export default function Education() {
  return (
    <section className="relative px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01" label="EDUCATION" />

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="border border-ink/15 p-6">
            <p className="font-mono text-[11px] tracking-[0.1em] text-calib">
              EXPECTED FALL 2026
            </p>
            <h3 className="mt-2 text-lg text-ink" style={{ fontWeight: 500 }}>
              <FadeText text="University of California, Irvine" />
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              <FadeText
                text="Incoming Transfer — B.S. Mechanical Engineering, Irvine, CA"
                baseDelay={0.08}
                wordDelay={0.025}
              />
            </p>
          </div>
          <div className="border border-ink/15 p-6">
            <p className="font-mono text-[11px] tracking-[0.1em] text-ink/45">
              2024 — 2026
            </p>
            <h3 className="mt-2 text-lg text-ink" style={{ fontWeight: 500 }}>
              <FadeText text="Mt. San Antonio College" baseDelay={0.05} />
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              <FadeText
                text="Mechanical Engineering Transfer Preparation, Walnut, CA"
                baseDelay={0.13}
                wordDelay={0.025}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
