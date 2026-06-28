import FadeText from "./FadeText";

const experience = [
  {
    period: "OCT 2025 — DEC 2025",
    org: "UCLA California NanoSystems Institute",
    role: "Microfabrication & Nanopatterning Programs",
    location: "Los Angeles, CA",
    points: [
      "Fabricated wafer-based microstructures using photolithography, thin-film deposition, wet etching, and electron-beam lithography in cleanroom environments",
      "Optimized fabrication workflow by evaluating resist thickness, exposure conditions, and process sequencing to improve pattern quality and repeatability",
      "Characterized fabricated features via microscopy and applied findings to refine subsequent wafer iterations",
    ],
  },
  {
    period: "2026",
    org: "Mt. SAC UAV Team",
    role: "Systems Engineer & 3D Design Engineer",
    location: "Walnut, CA",
    tag: "2nd Place Overall — C-UASC",
    points: [
      "Served as systems engineer and 3D design engineer for the highest-placing U.S. team at the California Unmanned Aerial Systems Competition, hosted by Cal State LA",
      "Modeled the aircraft in CAD to support subsystem layout and competition-ready integration",
      "Developed ground control software and mission planning tools to support autonomous flight operations during competition missions",
    ],
  },
  {
    period: "DEC 2024 — MAR 2025",
    org: "Mt. San Antonio College VEX Robotics Team",
    role: "Design Lead",
    location: "Walnut, CA",
    points: [
      "Led mechanical design of a collegiate VEX robot for a 6-member team using SolidWorks and Fusion 360 for CAD, subsystem iteration, and fabrication planning, including drivetrain design",
      "Improved robot performance through 3D-printed component integration, geometric redesign, prototyping, and iterative testing",
      "Managed subteam workflow, task allocation, and build schedules during competition preparation",
    ],
  },
];

export default function Experience() {
  return (
    <section id="work" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" label="EXPERIENCE" />

        <div className="mt-12 divide-y divide-ink/10 border-t border-ink/10">
          {experience.map((job, i) => (
            <article
              key={job.org}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[180px,1fr]"
            >
              <div>
                <p className="font-mono text-xs tracking-[0.1em] text-ink/45">
                  {job.period}
                </p>
                {job.tag && (
                  <p className="mt-2 inline-block border border-calib/40 px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-calib">
                    {job.tag}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-xl text-ink md:text-2xl" style={{ fontWeight: 500 }}>
                  <FadeText text={job.org} baseDelay={i * 0.05} />
                </h3>
                <p className="mt-1 font-mono text-sm text-blueprint">
                  <FadeText text={job.role} baseDelay={i * 0.05 + 0.06} />{" "}
                  <span className="text-ink/40">— {job.location}</span>
                </p>
                <ul className="mt-5 space-y-3">
                  {job.points.map((p, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed text-ink-soft"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brass" />
                      <FadeText
                        text={p}
                        baseDelay={i * 0.05 + 0.12 + j * 0.04}
                        wordDelay={0.02}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 font-mono">
      <span className="text-sm text-calib">{index}</span>
      <span className="text-xs tracking-[0.2em] text-ink/50">{label}</span>
      <span className="h-px flex-1 bg-ink/10" />
    </div>
  );
}
