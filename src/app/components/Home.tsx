import Link from "next/link";

const work = [
  {
    name: "Nobrainer Labs",
    desc: "Digital incubator for beautiful, fundable MVPs.",
    when: "2019 —",
  },
  {
    name: "AmpCoil",
    desc: "Tech strategy: PEMF, biofeedback, sound.",
    when: "2017 —",
  },
  {
    name: "TribeCoin",
    desc: "CTO, blockchain venture.",
    when: "2018 – 19",
  },
  {
    name: "Markett",
    desc: "Chief architect, entrepreneur platform.",
    when: "2016 – 17",
  },
  {
    name: "Processing.com",
    desc: "CTO, international payments.",
    when: "2011 – 16",
  },
];

const socials = [
  { name: "GitHub", href: "https://github.com/jaequery" },
  { name: "X", href: "https://twitter.com/jaequery" },
  { name: "LinkedIn", href: "https://linkedin.com/in/jaequery" },
];

export default function HomeComponent() {
  return (
    <div className="mx-auto max-w-[640px] px-6 pt-16 pb-24 text-[15.5px] leading-[1.7]">
      <header className="mb-28 flex items-baseline justify-between max-sm:mb-16">
        <Link href="#" className="font-semibold transition-colors hover:text-accent">
          jaequery.dev
        </Link>
        <nav className="flex gap-6 text-sm text-muted">
          <Link href="#about" className="transition-colors hover:text-accent">
            About
          </Link>
          <Link href="#work" className="transition-colors hover:text-accent">
            Work
          </Link>
          <Link href="#contact" className="transition-colors hover:text-accent">
            Contact
          </Link>
        </nav>
      </header>

      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Builder · CTO · 20 years
      </p>
      <h1 className="mb-[18px] text-[40px] font-bold leading-[1.15] tracking-tight max-sm:text-3xl">
        I make ideas ship.
      </h1>
      <p className="max-w-[52ch] text-muted">
        Full-stack developer and serial entrepreneur. Scalable platforms,
        beautiful MVPs, and software that survives contact with production.
      </p>
      <p className="mt-6 text-sm">
        <Link
          href="https://calendly.com/jaequery"
          target="_blank"
          className="text-accent transition-colors hover:text-foreground"
        >
          Schedule a call →
        </Link>
      </p>

      <section id="about" className="mt-[88px]">
        <h2 className="mb-5 font-semibold">About</h2>
        <div className="max-w-[56ch] space-y-3 text-muted">
          <p>
            Two decades of full-stack development and entrepreneurship — a deep
            understanding of how to build innovative, scalable applications.
          </p>
          <p>
            Currently founder of{" "}
            <b className="font-semibold text-foreground">Nobrainer Labs</b>, a
            digital incubator delivering beautiful, fundable MVPs. Committed to
            helping people through technology.
          </p>
        </div>
      </section>

      <section id="work" className="mt-[88px]">
        <h2 className="mb-5 font-semibold">
          Work <span className="font-normal text-muted">/ roles &amp; ventures</span>
        </h2>
        {work.map((item) => (
          <div
            key={item.name}
            className="flex items-baseline gap-3 py-2 max-sm:flex-wrap max-sm:gap-x-3 max-sm:gap-y-1"
          >
            <b className="whitespace-nowrap font-semibold">{item.name}</b>
            <span className="text-sm text-muted">{item.desc}</span>
            <span className="ml-auto whitespace-nowrap text-[13px] text-muted max-sm:ml-0 max-sm:w-full">
              {item.when}
            </span>
          </div>
        ))}
      </section>

      <section id="skills" className="mt-[88px]">
        <h2 className="mb-5 font-semibold">
          What I do <span className="font-normal text-muted">/ the short list</span>
        </h2>
        <p className="max-w-[56ch] text-sm text-muted">
          Nest.js · tRPC · React · Next.js · Tailwind · Postgres · Redis ·
          LangChain · OpenAI · Anthropic · AWS · GCP · Linux · Docker · Solana ·
          Aptos · startup incubation
        </p>
      </section>

      <section id="contact" className="mt-[88px]">
        <h2 className="mb-5 font-semibold">Contact</h2>
        <p className="max-w-[56ch] text-muted">
          Consultations, collaborations, or just a friendly hello —{" "}
          <Link
            href="https://calendly.com/jaequery"
            target="_blank"
            className="text-accent transition-colors hover:text-foreground"
          >
            book time
          </Link>{" "}
          or find me below.
        </p>
      </section>

      <footer className="mt-32 flex justify-between text-sm text-muted">
        <span>© jaequery.dev</span>
        <nav className="flex gap-6">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              className="transition-colors hover:text-accent"
            >
              {social.name}
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
