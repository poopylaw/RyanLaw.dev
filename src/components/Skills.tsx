import { SectionLabel } from "./Experience";
import FadeText from "./FadeText";

const skillGroups = [
  {
    label: "Aerospace & Structures",
    items: [
      "Mechanics of materials",
      "Dynamics",
      "Structural & stress analysis",
      "Propulsion-relevant motion analysis",
    ],
  },
  {
    label: "CAD / Design",
    items: ["SolidWorks", "Fusion 360", "Engineering drawings", "GD&T"],
  },
  {
    label: "Fabrication & Manufacturing",
    items: [
      "3D printing",
      "Laser cutting",
      "Hand fabrication",
      "Component tolerancing",
      "Material selection",
    ],
  },
  {
    label: "Programming",
    items: ["MATLAB", "Python", "C++", "Arduino"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="04" label="CAPABILITIES" />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <div key={group.label}>
              <h3 className="border-b border-ink/15 pb-3 font-mono text-[11px] tracking-[0.1em] text-ink/55">
                <FadeText text={group.label.toUpperCase()} baseDelay={gi * 0.04} />
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item, ii) => (
                  <li
                    key={item}
                    className="flex items-baseline justify-between text-[15px] text-ink-soft"
                  >
                    <FadeText
                      text={item}
                      baseDelay={gi * 0.04 + 0.08 + ii * 0.025}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-ink/10 pt-8">
          <p className="font-mono text-xs leading-relaxed text-ink/45">
            <FadeText
              text="COURSEWORK — Statics · Dynamics · Mechanics of Materials · Properties of Materials · MATLAB · Engineering Graphics"
              baseDelay={0.3}
              wordDelay={0.02}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
