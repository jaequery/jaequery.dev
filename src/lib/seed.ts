import type { Database } from "better-sqlite3";

// All résumé content lives here. Edit and delete data/resume.db to re-seed,
// or edit the rows in SQLite directly — the page reads the database, not this file.
export function seed(db: Database) {
  db.prepare(
    `INSERT INTO profile (id, name, title, summary, email, location, now_statement, initials)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "Jae Lee",
    "Full-stack engineer & founder",
    "I am a full-stack engineer and founder. Over twenty years I have built payment platforms, marketplaces, blockchain ventures, and health technology — first as an engineer, then as a CTO, now as an incubator of other people's ideas. I run Nobrainer Labs, where we turn early-stage concepts into working, fundable products. I care about software that is simple to operate and honest about its trade-offs.",
    "pintaskcom@gmail.com",
    "United States",
    "Founder at Nobrainer Labs — incubating AI-first MVPs for early-stage founders.",
    "JL"
  );

  const social = db.prepare(
    "INSERT INTO socials (label, url, sort) VALUES (?, ?, ?)"
  );
  (
    [
      ["GitHub", "https://github.com/jaequery"],
      ["X", "https://x.com/jaequery"],
      ["LinkedIn", "https://linkedin.com/in/jaequery"],
    ] as const
  ).forEach((row, i) => social.run(row[0], row[1], i));

  const exp = db.prepare(
    "INSERT INTO experience (dates, role, company, description, sort) VALUES (?, ?, ?, ?, ?)"
  );
  (
    [
      [
        "2019—Now",
        "Founder",
        "Nobrainer Labs",
        "I run a digital incubator that takes early-stage ideas to working products. I set the architecture, build the first version, and hand teams a codebase they can grow. Several incubated products raised funding on the MVP we shipped.",
      ],
      [
        "2017—Now",
        "Technology advisor",
        "AmpCoil",
        "I set technology direction for a wellness company working in PEMF, biofeedback, and sound. I keep the product roadmap honest about what the hardware and software can do.",
      ],
      [
        "2018—2019",
        "CTO",
        "TribeCoin",
        "Led engineering for a blockchain venture. Took the platform from whitepaper to working product and built the team around it.",
      ],
      [
        "2016—2017",
        "Chief architect",
        "Markett",
        "Designed the platform architecture for a marketplace connecting student entrepreneurs with brands. Took it from prototype to production.",
      ],
      [
        "2011—2016",
        "CTO",
        "Processing.com",
        "Ran engineering for an international payments company. Built the processing platform, grew the engineering team, and kept it stable through five years of transaction growth.",
      ],
    ] as const
  ).forEach((row, i) => exp.run(row[0], row[1], row[2], row[3], i));

  const skill = db.prepare(
    "INSERT INTO skill_groups (label, items, sort) VALUES (?, ?, ?)"
  );
  (
    [
      ["Languages", "TypeScript, JavaScript, SQL, PHP, Bash"],
      [
        "Tools",
        "Next.js, React, NestJS, tRPC, Tailwind, Postgres, Redis, Docker, AWS, GCP, Linux",
      ],
      ["Focus", "AI products, LLM tooling, payments, MVP incubation, Solana, Aptos"],
    ] as const
  ).forEach((row, i) => skill.run(row[0], row[1], i));

  const project = db.prepare(
    "INSERT INTO projects (name, description, stack, url, sort) VALUES (?, ?, ?, ?, ?)"
  );
  (
    [
      [
        "Nobrainer Labs",
        "Digital incubator for beautiful, fundable MVPs.",
        "Next.js · NestJS · Postgres · AWS",
        "https://nobrainerlabs.com",
      ],
      [
        "AmpCoil",
        "Product and technology strategy for a PEMF sound-therapy system.",
        "Embedded · Mobile · Cloud",
        "https://ampcoil.com",
      ],
      [
        "Processing.com",
        "International payments platform. I ran engineering for five years.",
        "PHP · MySQL · Redis",
        "https://processing.com",
      ],
      [
        "jaequery.dev",
        "This site. A résumé typeset in the browser, data in SQLite.",
        "Next.js · SQLite · TypeScript",
        "https://github.com/jaequery/jaequery.dev",
      ],
    ] as const
  ).forEach((row, i) => project.run(row[0], row[1], row[2], row[3], i));

  const edu = db.prepare(
    "INSERT INTO education (institution, credential, years, sort) VALUES (?, ?, ?, ?)"
  );
  (
    [
      ["Self-taught", "Full-stack engineering, learned by building and shipping", "2004—"],
      ["Continuing study", "Applied AI and LLM systems", "2023—"],
    ] as const
  ).forEach((row, i) => edu.run(row[0], row[1], row[2], i));

  const writing = db.prepare(
    "INSERT INTO writing (title, url, published, sort) VALUES (?, ?, ?, ?)"
  );
  (
    [
      ["I make ideas ship", "https://x.com/jaequery", "2024"],
      ["MVPs that survive contact with production", "https://x.com/jaequery", "2023"],
      ["What incubating founders taught me about scope", "https://x.com/jaequery", "2022"],
      ["Payments infrastructure, in hindsight", "https://x.com/jaequery", "2021"],
    ] as const
  ).forEach((row, i) => writing.run(row[0], row[1], row[2], i));

  const quote = db.prepare(
    "INSERT INTO testimonials (quote, attribution, sort) VALUES (?, ?, ?)"
  );
  (
    [
      [
        "Jae took our idea from a sketch to a product in weeks, and it held up when real users arrived.",
        "Founder, incubated startup",
      ],
      [
        "Removes complexity faster than the rest of us can add it. The calmest engineer I have worked with.",
        "Engineering lead, payments team",
      ],
    ] as const
  ).forEach((row, i) => quote.run(row[0], row[1], i));
}
