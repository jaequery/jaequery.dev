import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function HomeComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 text-sm">
      <header className="px-4 h-12 flex items-center border-b border-gray-200">
        <Link className="font-semibold" href="#">
          jaequery.dev
        </Link>
        <nav className="ml-auto flex gap-4">
          <Link className="hover:underline underline-offset-4" href="#about">
            About
          </Link>
          {/* <Link className="hover:underline underline-offset-4" href="#experience">
            Experience
          </Link> */}
          <Link className="hover:underline underline-offset-4" href="#skills">
            What I do
          </Link>
          <Link className="hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 px-4 py-8 max-w-3xl mx-auto w-full">
        <section className="mb-12 text-center">
          <h1 className="text-2xl font-bold mb-2">Jae Lee</h1>
          <p className="text-gray-600 mb-4">
            Serial Entrepreneur | CTO | Full Stack Developer | 20+ Years
            Experience
          </p>
          <div className="flex justify-center gap-2">
            {/* <Link
              href="#contact"
              className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Contact Me
            </Link> */}
            <Link
              href="https://calendly.com/jaequery"
              target="_blank"
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Schedule a Call
            </Link>
          </div>
        </section>
        <section id="about" className="mb-8">
          <h2 className="text-lg font-semibold mb-2">About Me</h2>
          <p className="text-gray-600">
            With over two decades of experience in full-stack development and
            entrepreneurship, I’ve built a deep understanding of how to create
            innovative, scalable applications. <br />
            <br />I am currently a founder of Nobrainer Labs, a digital
            incubator focused on delivering beautiful MVP projects. I’m
            committed to helping people through technology and delivering
            high-quality software solutions that have a positive impact on the
            world.
          </p>
        </section>
        {/* <section id="experience" className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          <div className="space-y-4">
            <div className="border-l-2 border-gray-200 pl-4">
              <h3 className="font-semibold">Founder</h3>
              <p className="text-gray-600">
                Nobrainer Labs | Apr 2019 - Present
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Digital incubator focused on delivering beautiful MVP projects
                that are scalable and fundable.
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <h3 className="font-semibold">Tech Advisor / Consultant</h3>
              <p className="text-gray-600">AmpCoil | Jul 2017 - Present</p>
              <p className="text-xs text-gray-600 mt-1">
                Advising on tech strategy for an innovative wellness device
                combining PEMF, biofeedback, and sound technology.
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <h3 className="font-semibold">CTO</h3>
              <p className="text-gray-600">TribeCoin | Jan 2018 - Jan 2019</p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <h3 className="font-semibold">Chief Architect</h3>
              <p className="text-gray-600">Markett | Jul 2016 - Sep 2017</p>
              <p className="text-xs text-gray-600 mt-1">
                Architected platform empowering lifestyle entrepreneurs with
                mentorship and connections to high-growth companies.
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <h3 className="font-semibold">CTO</h3>
              <p className="text-gray-600">
                Processing.com | Sep 2011 - Aug 2016
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Led strategic product direction for an international payment
                processing platform.
              </p>
            </div>
          </div>
        </section> */}
        <section id="skills" className="mb-8">
          <h2 className="text-lg font-semibold mb-2">What I do</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Backend (Nest.js, tRPC)",
              "Frontend (React, Next.js, Tailwind)",
              "Database (Postgres, Redis)",
              "AI / ML (Langchain, OpenAI, Anthropic)",
              "Platform Architecture (AWS, GCP)",
              "Devops (Linux, Docker)",
              "Blockchain (Solana, Aptos)",
              "Startup Incubation (Nobrainer Labs)",
            ].map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-gray-100 text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
        <section id="contact">
          <h2 className="text-lg font-semibold mb-2">Contact Me</h2>
          <p className="text-gray-600 mb-2">
            Feel free to reach out for consultations or even just a friendly
            hello 🤗
          </p>
          <div className="flex space-x-2">
            <Link
              href="https://github.com/jaequery"
              className="p-2 border border-gray-200 rounded hover:bg-gray-100"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/jaequery"
              className="p-2 border border-gray-200 rounded hover:bg-gray-100"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://twitter.com/jaequery"
              className="p-2 border border-gray-200 rounded hover:bg-gray-100"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </section>
      </main>
      <footer className="px-4 py-3 text-center text-xs text-gray-500 border-t border-gray-200">
        © 2023 Jae Query. All rights reserved.
      </footer>
    </div>
  );
}
