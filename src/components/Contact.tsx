import { SectionLabel } from "./Experience";
import ContactForm from "./ContactForm";
import FadeText from "./FadeText";

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05" label="CONTACT" />

        <h2
          className="mt-12 text-4xl leading-tight text-ink md:text-6xl"
          style={{ fontWeight: 500 }}
        >
          <FadeText text="Building something" />
          <br />
          <FadeText text="that needs a hand?" baseDelay={0.12} />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr,auto]">
          <ContactForm />

          <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
            <p className="font-mono text-[11px] tracking-[0.1em] text-ink-soft">
              OR REACH ME DIRECTLY
            </p>
            <a
              href="mailto:ryanlaw2006@gmail.com"
              className="group flex items-baseline gap-2 text-lg text-blueprint md:text-xl"
              style={{ fontWeight: 500 }}
            >
              ryanlaw2006@gmail.com
              <span className="font-mono text-sm text-blueprint-dim transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="tel:6266246787"
              className="font-mono text-sm text-ink-soft hover:text-blueprint transition-colors"
            >
              (626) 624-6787
            </a>
          </div>
        </div>

        <div className="tick-border mt-24 flex flex-wrap items-center justify-between gap-4 pt-6 font-mono text-[10px] tracking-[0.12em] text-ink/40">
          <span>RYAN LAW — MECHANICAL ENGINEERING</span>
          <span>DRAWN BY R.L. · {new Date().getFullYear()}</span>
          <span>SHEET 1 OF 1</span>
        </div>
      </div>
    </section>
  );
}
