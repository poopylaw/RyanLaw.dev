export type ProjectSection = {
  heading: string;
  body: string;
};

export type ProjectImage = {
  /** Path relative to /public, e.g. "/projects/tiny-house/chamber.jpg" */
  src: string;
  caption: string;
};

export type Project = {
  slug: string;
  id: string;
  title: string;
  stack: string;
  summary: string;
  detail: string;
  goal?: string;
  tools?: string;
  images?: ProjectImage[];
  sections?: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "tiny-house-heat-transfer",
    id: "THS-09",
    title: "Tiny House Heat Transfer Simulation",
    stack: "MATLAB / Simulink / Physical Testing",
    summary:
      "Modeled heat transfer and energy usage in a tiny house system, pairing a physical test chamber with Simulink thermal models.",
    detail:
      "Combined a physical test chamber, 48-hour temperature data collection, and simulation-based analysis to compare how insulation and housing size affect heating cost and thermal performance.",
    goal:
      "Evaluate the cost-effectiveness of heating different structures, including a typical California home, a tiny house with fiberglass insulation, and a tiny house with Styrofoam insulation.",
    tools:
      "MATLAB, Simulink, temperature probes, physical modeling, insulation testing, thermal modeling, and engineering analysis.",
    images: [
      { src: "/projects/tiny-house/chamber.jpg", caption: "Physical Test Chamber" },
      { src: "/projects/tiny-house/setup.jpg", caption: "Data Collection Setup" },
      { src: "/projects/tiny-house/data.jpg", caption: "48-Hour Temperature Data" },
    ],
    sections: [
      {
        heading: "Physical Model",
        body:
          "The physical model used a 1x1x1 meter wooden frame with Styrofoam insulation, an acrylic door, temperature probes, and a jar of water inside the chamber to simulate heat storage. One probe measured the inside temperature, while another measured outdoor temperature away from direct sunlight.",
      },
      {
        heading: "Data Collection",
        body:
          "The model was placed outside for 48 hours to collect indoor and outdoor temperature data. The collected data was used to compare the physical behavior of the insulated chamber with Simulink thermal models.",
      },
      {
        heading: "Simulation Approach",
        body:
          "I used MATLAB and Simulink to modify parameters such as insulation type, wall thickness, window material, heater temperature, and outdoor temperature behavior. The model compared heating cost and thermal response for different housing and insulation cases.",
      },
      {
        heading: "Result",
        body:
          "The simulation showed that the Styrofoam-insulated tiny house had the lowest estimated annual heating cost compared to a standard insulated tiny house and a typical California home. This supported the conclusion that insulation material has a major effect on heat retention and energy efficiency.",
      },
      {
        heading: "What I Learned",
        body:
          "This project strengthened my understanding of heat transfer, physical testing, simulation-based engineering analysis, and parameter sensitivity. It also helped me connect real sensor data with MATLAB and Simulink modeling.",
      },
    ],
  },
  {
    slug: "rc-vehicle-aero",
    id: "RC-04",
    title: "RC Vehicle Aerodynamics Testing & Optimization",
    stack: "ESP32 / SolidWorks / 3D Printing",
    summary:
      "Built an RC car from scratch and used it as a rolling test rig for drag reduction, applying Reynolds number and boundary-layer analysis to refine the body.",
    detail:
      "Designed and 3D-printed the chassis and body in SolidWorks, then integrated an ESP32-based drive system. An internal airflow channel, inspired by Formula 1 F-duct concepts, was added to cut drag and improve stability at speed.",
    tools: "SolidWorks, ESP32, 3D printing, Reynolds number and boundary-layer analysis.",
    images: [],
    sections: [
      {
        heading: "Design & Build",
        body:
          "The chassis and body were designed from scratch in SolidWorks and produced with 3D-printed components. An ESP32-based control system was programmed and integrated with the vehicle's electronic drive system.",
      },
      {
        heading: "Aerodynamic Analysis",
        body:
          "Reynolds number, pressure drag, and boundary-layer analysis were applied to refine the body geometry, improving vehicle stability and aerodynamic performance.",
      },
      {
        heading: "F-Duct Inspired Channel",
        body:
          "An internal airflow channel, inspired by Formula 1 F-duct concepts, was incorporated to reduce drag and improve overall vehicle performance.",
      },
    ],
  },
  {
    slug: "folding-knife",
    id: "KNF-01",
    title: "Folding Knife Design & Fabrication",
    stack: "Magnacut Steel / SolidWorks / Hand Fabrication",
    summary:
      "Hand-fabricated a folding knife with a back-lock mechanism, holding tight tolerances so the lock engages smoothly every time.",
    detail:
      "Material behavior, load paths, and component tolerances were evaluated through prototyping. Detail drawings translated CAD geometry into a functional, precision-fit mechanical assembly — no shortcuts on fit and finish.",
    tools: "SolidWorks, Magnacut steel, hand fabrication, detail drawing, tolerancing.",
    images: [],
    sections: [
      {
        heading: "Mechanism Design",
        body:
          "The knife incorporates a back lock mechanism with tight component tolerances, designed to ensure reliable locking and smooth operation through repeated use.",
      },
      {
        heading: "Material & Tolerance Analysis",
        body:
          "Material behavior, load paths, and component tolerances were evaluated through prototyping and mechanical design analysis to support strength, durability, and reliability.",
      },
      {
        heading: "Fabrication",
        body:
          "Detail drawing and fabrication principles were applied to translate CAD geometry into a functional, precision-fit mechanical assembly, hand-fabricated from Magnacut steel.",
      },
    ],
  },
  {
    slug: "posture-device",
    id: "PST-12",
    title: "BroncoHacks Posture Device",
    stack: "Python / Raspberry Pi / Sensors",
    summary:
      "A posture-monitoring prototype, breadboarded and enclosed in a 3D-printed housing, built start to finish in 48 hours.",
    detail:
      "Combined a distance sensor, Raspberry Pi, and a Python interface for live feedback. The hackathon clock forced fast decisions on both the hardware integration and the enclosure design.",
    tools: "Raspberry Pi, Python, distance sensor, breadboarding, 3D-printed enclosure.",
    images: [],
    sections: [
      {
        heading: "Hardware",
        body:
          "Built using a Raspberry Pi, distance sensor, and breadboarded circuitry, housed in a 3D-printed enclosure designed for the hackathon timeline.",
      },
      {
        heading: "Software",
        body:
          "Developed a Python-based interface to support device operation, sensor feedback, and user interaction in real time.",
      },
      {
        heading: "Constraints",
        body:
          "Hardware and software were integrated under a 48-hour hackathon timeline, forcing fast, practical decisions to address a real-world posture problem on a tight deadline.",
      },
    ],
  },
  {
    slug: "sense-hat-controller",
    id: "LED-08",
    title: "Raspberry Pi Sense HAT Controller",
    stack: "MATLAB / Raspberry Pi / Sense HAT",
    summary:
      "A MATLAB control interface for an 8x8 LED matrix, driven by joystick and accelerometer input.",
    detail:
      "Sensor processing, conditional logic, and display control were integrated into one embedded mechatronic loop — a compact exercise in closing the loop between input and output.",
    tools: "MATLAB, Raspberry Pi, Sense HAT, joystick and accelerometer input.",
    images: [],
    sections: [
      {
        heading: "Control Interface",
        body:
          "Developed a MATLAB-based control interface for an 8x8 LED matrix, using joystick and accelerometer inputs to drive the display.",
      },
      {
        heading: "System Integration",
        body:
          "Sensor processing, conditional logic, and display control were integrated into a single embedded mechatronic system, closing the loop between physical input and visual output.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
