import Reveal from "./components/Reveal";
import { ArrowUpRightIcon, MailIcon, PinIcon } from "./components/icons";
import {
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getSkillGroups,
  getSocials,
  getTestimonials,
  getWriting,
} from "@/lib/db";

// Read straight from SQLite on every request so edits to data/resume.db show up live.
export const dynamic = "force-dynamic";

export default function Home() {
  const profile = getProfile();
  const socials = getSocials();
  const experience = getExperience();
  const skills = getSkillGroups();
  const projects = getProjects();
  const education = getEducation();
  const writing = getWriting();
  const testimonials = getTestimonials();
  const headerSocial = socials[0];

  return (
    <main>
      {/* 1 — Header */}
      <header className="border-b border-line">
        <div className="container flex flex-wrap items-end justify-between gap-x-10 gap-y-8 pb-10 pt-14">
          <div>
            <span className="monogram" aria-hidden>
              {profile.initials}
            </span>
            <h1 className="display-name mt-6">{profile.name}</h1>
            <p className="mt-2 text-muted">{profile.title}</p>
          </div>
          <address className="flex flex-col gap-3 not-italic sm:items-end sm:text-right">
            <a
              href={`mailto:${profile.email}`}
              className="smallcaps hover-underline inline-flex items-center gap-2 lowercase"
            >
              <MailIcon />
              {profile.email}
            </a>
            <span className="smallcaps inline-flex items-center gap-2 text-muted">
              <PinIcon />
              {profile.location}
            </span>
            {headerSocial && (
              <a
                href={headerSocial.url}
                target="_blank"
                rel="noreferrer"
                className="smallcaps hover-underline inline-flex items-center gap-2"
              >
                <ArrowUpRightIcon />
                {headerSocial.label}
              </a>
            )}
          </address>
        </div>
      </header>

      {/* 2 — Summary */}
      <section aria-label="Summary">
        <div className="container pb-12 pt-12">
          <Reveal>
            <p className="max-w-[560px]">{profile.summary}</p>
          </Reveal>
        </div>
      </section>

      {/* 3 — Now strip */}
      <section aria-label="Now" className="border-t border-line">
        <div className="container grid grid-cols-[100px_1fr] gap-x-6 py-5">
          <span className="section-label leading-6">Now</span>
          <Reveal>
            <p className="text-[15px] leading-6">{profile.now_statement}</p>
          </Reveal>
        </div>
      </section>

      {/* 4 — Experience */}
      <section aria-labelledby="experience-heading" className="border-t border-line">
        <div className="container pb-10 pt-14">
          <h2 id="experience-heading" className="section-label">
            Experience
          </h2>
          <ol className="mt-4">
            {experience.map((job, i) => (
              <li
                key={`${job.company}-${job.dates}`}
                className="border-t border-line first:border-t-0"
              >
                <Reveal
                  delay={i * 40}
                  className="grid gap-x-6 gap-y-1.5 py-7 sm:grid-cols-[100px_1fr]"
                >
                  <span className="text-[13px] leading-[1.85] text-muted">
                    {job.dates}
                  </span>
                  <div>
                    <h3 className="serif text-[19px] font-semibold leading-snug">
                      {job.role}{" "}
                      <span className="font-normal text-muted">
                        · {job.company}
                      </span>
                    </h3>
                    <p className="mt-2 max-w-[560px] text-[15.5px]">
                      {job.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Skills */}
      <section aria-labelledby="skills-heading" className="border-t border-line">
        <div className="container pb-16 pt-14">
          <h2 id="skills-heading" className="section-label">
            Skills
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 40}>
                <h3 className="smallcaps font-semibold">{group.label}</h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-muted">
                  {group.items}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Selected work */}
      <section aria-labelledby="work-heading" className="border-t border-line">
        <div className="container pb-16 pt-14">
          <h2 id="work-heading" className="section-label">
            Selected work
          </h2>
          <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={i * 40}>
                <article>
                  <h3 className="serif text-[19px] font-semibold">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover-underline"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-1.5 text-[15px] text-muted">
                    {project.description}
                  </p>
                  <p className="mt-2 text-[13px] tracking-wide text-muted">
                    {project.stack}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Education */}
      <section aria-labelledby="education-heading" className="border-t border-line">
        <div className="container pb-12 pt-14">
          <h2 id="education-heading" className="section-label">
            Education
          </h2>
          <ul className="mt-4">
            {education.map((entry, i) => (
              <li
                key={entry.institution}
                className="border-t border-line first:border-t-0"
              >
                <Reveal
                  delay={i * 40}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <p className="text-[15.5px]">
                    <span className="font-medium">{entry.institution}</span>
                    <span className="text-muted"> — {entry.credential}</span>
                  </p>
                  <span className="shrink-0 text-[13px] text-muted">
                    {entry.years}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 — Writing */}
      <section aria-labelledby="writing-heading" className="border-t border-line">
        <div className="container pb-12 pt-14">
          <h2 id="writing-heading" className="section-label">
            Writing
          </h2>
          <ul className="mt-4">
            {writing.map((piece, i) => (
              <li
                key={piece.title}
                className="border-t border-line first:border-t-0"
              >
                <Reveal delay={i * 40}>
                  <a
                    href={piece.url}
                    target="_blank"
                    rel="noreferrer"
                    className="row-link flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="hover-underline text-[15.5px]">
                      {piece.title}
                    </span>
                    <span className="shrink-0 text-[13px] text-muted">
                      {piece.published}
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — References */}
      <section aria-labelledby="references-heading" className="border-t border-line">
        <div className="container pb-16 pt-14">
          <h2 id="references-heading" className="section-label">
            References
          </h2>
          <div className="mt-8 grid gap-y-10 md:grid-cols-2">
            {testimonials.map((entry, i) => (
              <Reveal
                key={entry.attribution}
                delay={i * 40}
                className={
                  i % 2 === 1
                    ? "md:border-l md:border-line md:pl-12"
                    : "md:pr-12"
                }
              >
                <figure>
                  <blockquote className="serif max-w-[440px] text-[18px] italic leading-[1.6]">
                    “{entry.quote}”
                  </blockquote>
                  <figcaption className="smallcaps mt-4 text-muted">
                    — {entry.attribution}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — Contact footer */}
      <footer className="border-t border-line">
        <div className="container flex flex-col items-center py-16 text-center">
          <Reveal className="flex flex-col items-center">
            <p className="serif text-[20px]">
              Have something worth building? Write me.
            </p>
            <a className="cta mt-6" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <nav aria-label="Social" className="mt-9 flex gap-7">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="smallcaps underline-link"
                >
                  {social.label}
                </a>
              ))}
            </nav>
            <p className="mt-9 text-[12px] text-muted">
              © {new Date().getFullYear()} {profile.name}. Typeset in Source
              Serif 4 and Inter.
            </p>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
