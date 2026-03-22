import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Bug, Code2, Rocket, TerminalSquare, CheckCircle2, Flame, BrainCircuit, Sparkles, AlarmClock, Github, Globe } from "lucide-react";

const Section = ({ id, className = "", children }) => (
  <section
    id={id}
    className={`min-h-screen w-full px-6 py-20 md:px-12 lg:px-20 flex items-center ${className}`}
  >
    <div className="mx-auto w-full max-w-6xl">{children}</div>
  </section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs md:text-sm text-white/80 backdrop-blur">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

const FloatingCode = () => {
  const snippets = useMemo(
    () => [
      "<h1>Hello World</h1>",
      "display: flex;",
      "console.log('Why?')",
      "npm run dev",
      "git commit -m 'final final'",
      "const bug = true;",
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {snippets.map((text, i) => (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: [0.15, 0.45, 0.15],
            y: [0, -18, 0],
            x: [0, i % 2 === 0 ? 12 : -12, 0],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-xl border border-cyan-400/20 bg-black/20 px-3 py-2 text-xs text-cyan-200/70"
          style={{
            top: `${12 + i * 12}%`,
            left: `${i % 2 === 0 ? 8 + i * 7 : 50 + i * 5}%`,
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <Section id="hero" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.18),_transparent_35%),#060816]">
      <FloatingCode />
      <motion.div ref={ref} style={{ y, opacity }} className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Pill>Theme 5 • Interactive storytelling</Pill>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-white md:text-7xl">
            The Life of a <span className="text-cyan-300">Developer</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
            A humorous scroll journey from first HTML tag to deadline-fueled deployment, powered by bugs,
            coffee, and irrational optimism.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#learn" className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:scale-105">
              Start Journey
            </a>
            <a href="#finale" className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white/85 transition hover:bg-white/10">
              Skip to ending
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/65">
            <Pill>Scroll effects</Pill>
            <Pill>Funny interactions</Pill>
            <Pill>Responsive UI</Pill>
          </div>
        </div>

        <Card className="relative overflow-hidden p-0">
          <div className="border-b border-white/10 bg-white/5 p-4 text-sm text-white/70">dev_journey.jsx</div>
          <div className="space-y-4 p-6 font-mono text-sm md:text-base">
            <div className="text-cyan-300">&lt;Developer&gt;</div>
            <div className="pl-5 text-white/80">&lt;Skill&gt;HTML&lt;/Skill&gt;</div>
            <div className="pl-5 text-white/80">&lt;State&gt;Motivated&lt;/State&gt;</div>
            <div className="pl-5 text-amber-300">&lt;Bug count={1} /&gt;</div>
            <div className="pl-5 text-rose-300">&lt;Deadline hoursLeft={2} /&gt;</div>
            <div className="pl-5 text-emerald-300">&lt;Coffee cups={99} /&gt;</div>
            <div className="text-cyan-300">&lt;/Developer&gt;</div>
          </div>
        </Card>
      </motion.div>
    </Section>
  );
};

const LearnHTML = () => {
  const tags = ["<h1>", "<p>", "<img>", "<button>", "<section>", "<a>"];
  const [selected, setSelected] = useState("<h1>");

  return (
    <Section id="learn" className="bg-slate-950 text-white">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Pill>Stage 1</Pill>
          <h2 className="mt-4 text-4xl font-bold">Learning HTML: peak confidence era</h2>
          <p className="mt-4 text-white/70 leading-8">
            The first heading appears. A paragraph follows. Suddenly, the developer believes they can build the
            next billion-dollar startup by evening.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                onMouseEnter={() => setSelected(tag)}
                onFocus={() => setSelected(tag)}
                className={`rounded-2xl border px-4 py-2 transition ${selected === tag ? "border-cyan-300 bg-cyan-400/15 text-cyan-200" : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <div className="flex items-center gap-3 text-cyan-300"><Code2 /> First website simulator</div>
            <div className="mt-5 rounded-3xl bg-white p-6 text-slate-900">
              <h1 className="text-3xl font-black">Hello World</h1>
              <p className="mt-3 text-slate-600">Current selected tag: <span className="font-bold">{selected}</span></p>
              <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-white">Hire me already</button>
            </div>
            <div className="mt-5 text-sm text-white/60">Confidence meter: 100% • Real skill level: loading...</div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};

const CssChaos = () => {
  const [styled, setStyled] = useState(false);
  return (
    <Section id="css" className="bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Pill>Stage 2</Pill>
          <h2 className="mt-4 text-4xl font-bold">CSS: why is nothing centered?</h2>
          <p className="mt-4 leading-8 text-white/70">
            Hours are spent fighting margin, padding, flexbox, and mysterious gaps created by forces beyond human
            understanding.
          </p>
          <button
            onClick={() => setStyled((s) => !s)}
            className="mt-6 rounded-2xl bg-fuchsia-400 px-5 py-3 font-semibold text-slate-950 transition hover:scale-105"
          >
            Toggle {styled ? "Broken Layout" : "Fixed Layout"}
          </button>
        </div>

        <Card className="min-h-[360px]">
          <div className="mb-4 text-sm text-white/65">Spent 3 hours centering one div</div>
          <div className={`relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950 ${styled ? "" : "rotate-1"}`}>
            <motion.div
              animate={styled ? { x: 0, y: 0, rotate: 0 } : { x: [0, 60, -20, 40], y: [0, 20, -15, 35], rotate: [0, 8, -10, 12] }}
              transition={styled ? { duration: 0.6 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute h-24 w-24 rounded-3xl ${styled ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-400" : "left-10 top-10 bg-rose-400"}`}
            />
            <motion.div
              animate={styled ? { x: 0, y: 0, rotate: 0 } : { x: [0, -30, 60], y: [0, 50, -30], rotate: [0, -12, 6] }}
              transition={styled ? { duration: 0.6 } : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute h-16 w-40 rounded-3xl ${styled ? "left-10 top-10 bg-cyan-400" : "right-5 bottom-8 bg-amber-400"}`}
            />
            <div className="absolute bottom-3 left-3 rounded-xl bg-white/10 px-3 py-2 text-xs text-white/70">
              {styled ? "Finally aligned" : "Chaos mode active"}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

const BugBattle = () => {
  const initialBugs = [1, 2, 3, 4, 5, 6];
  const [bugs, setBugs] = useState(initialBugs);

  const smashBug = (id) => {
    setBugs((prev) => {
      const next = prev.filter((bug) => bug !== id);
      if (next.length === 2) return [...next, Date.now(), Date.now() + 1, Date.now() + 2];
      return next;
    });
  };

  return (
    <Section id="bugs" className="bg-black text-white">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Pill>Stage 3</Pill>
          <h2 className="mt-4 text-4xl font-bold">JavaScript: undefined becomes personal</h2>
          <p className="mt-4 leading-8 text-white/70">
            The app comes alive. Unfortunately, so do the bugs. Click them to fix the issue. When confidence rises,
            reality introduces three more.
          </p>
          <div className="mt-6 rounded-3xl border border-rose-400/20 bg-rose-400/10 p-4 text-rose-200">
            Console says: <span className="font-mono">Cannot read properties of motivation (reading 'stayCalm')</span>
          </div>
        </div>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-white/70">Bug arena</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm">Remaining: {bugs.length}</span>
          </div>
          <div className="grid min-h-[320px] grid-cols-3 gap-4">
            {bugs.map((bug) => (
              <motion.button
                key={bug}
                onClick={() => smashBug(bug)}
                whileHover={{ scale: 1.08, rotate: -8 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center justify-center rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4 text-amber-200"
              >
                <Bug className="h-10 w-10" />
              </motion.button>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
};

const DebugTimeline = () => {
  const steps = [
    "Read the error",
    "Panic respectfully",
    "Search the same issue online",
    "Try random fix from 2017 forum",
    "Accidentally solve it",
  ];

  return (
    <Section id="debug" className="bg-slate-900 text-white">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-20 lg:h-fit">
          <Pill>Stage 4</Pill>
          <h2 className="mt-4 text-4xl font-bold">Debugging: detective mode activated</h2>
          <p className="mt-4 leading-8 text-white/70">
            Debugging is less about knowledge and more about emotional endurance. Every solved issue increases power,
            wisdom, and suspicious confidence.
          </p>
        </div>

        <div className="space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{step}</h3>
                  <p className="mt-2 text-white/65">
                    {index === 0 && "The error message is 90% fear, 10% useful information."}
                    {index === 1 && "Developer opens 17 tabs and stares into the distance."}
                    {index === 2 && "Stack Overflow becomes a spiritual experience."}
                    {index === 3 && "No one knows why this solution works, including the author."}
                    {index === 4 && "The fix is celebrated and never touched again."}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const DeadlineRush = () => {
  const [coffee, setCoffee] = useState(0);
  const stress = Math.min(100, 25 + coffee * 8);
  const power = Math.min(100, coffee * 10);

  return (
    <Section id="deadline" className="bg-[linear-gradient(180deg,#0f172a,#111827,#020617)] text-white">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Pill>Stage 5</Pill>
          <h2 className="mt-4 text-4xl font-bold">Deadline mode: ship now, cry later</h2>
          <p className="mt-4 leading-8 text-white/70">
            The final hours arrive. Sleep disappears. Logic becomes optional. Coffee becomes architecture.
          </p>
          <button
            onClick={() => setCoffee((c) => c + 1)}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 transition hover:scale-105"
          >
            <Coffee className="h-5 w-5" /> Drink coffee
          </button>
          <div className="mt-4 text-sm text-white/65">Cups consumed: {coffee}</div>
        </div>

        <Card>
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm text-white/70"><span>Project completion</span><span>82%</span></div>
              <div className="h-4 rounded-full bg-white/10"><div className="h-4 w-[82%] rounded-full bg-emerald-400" /></div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm text-white/70"><span>Stress level</span><span>{stress}%</span></div>
              <div className="h-4 rounded-full bg-white/10"><div className="h-4 rounded-full bg-rose-400" style={{ width: `${stress}%` }} /></div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm text-white/70"><span>Temporary power</span><span>{power}%</span></div>
              <div className="h-4 rounded-full bg-white/10"><div className="h-4 rounded-full bg-amber-300" style={{ width: `${power}%` }} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><AlarmClock className="mb-2" /> Time left: 2 hours</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><Flame className="mb-2" /> Laptop temperature: worrying</div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

const Finale = () => {
  return (
    <Section id="finale" className="bg-slate-950 text-white">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"
        >
          <CheckCircle2 className="h-10 w-10" />
        </motion.div>
        <Pill>Final Stage</Pill>
        <h2 className="mt-4 text-4xl font-black md:text-6xl">It works. Please do not touch anything.</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
          After surviving tutorials, CSS battles, JavaScript bugs, debugging rituals, and deadline panic, the
          developer reaches the final form: deployed and slightly overcaffeinated.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          <Card className="text-left"><Rocket className="mb-3 text-cyan-300" /> Built with optimism</Card>
          <Card className="text-left"><BrainCircuit className="mb-3 text-fuchsia-300" /> Debugged with instinct</Card>
          <Card className="text-left"><Sparkles className="mb-3 text-emerald-300" /> Deployed with fear</Card>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#hero" className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950">Restart Story</a>
          <a href="https://github.com" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white/85"><Github className="h-5 w-5" /> GitHub</a>
          <a href="https://vercel.com" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white/85"><Globe className="h-5 w-5" /> Live Demo</a>
        </div>
      </div>
    </Section>
  );
};

const Navbar = () => {
  const links = [
    ["Hero", "hero"],
    ["HTML", "learn"],
    ["CSS", "css"],
    ["Bugs", "bugs"],
    ["Debug", "debug"],
    ["Deadline", "deadline"],
    ["Finale", "finale"],
  ];

  return (
    <div className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-2 font-semibold text-white">
          <TerminalSquare className="h-5 w-5 text-cyan-300" /> Frontend Odyssey
        </div>
        <div className="hidden gap-5 text-sm text-white/70 md:flex">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="bg-slate-950 font-sans text-white selection:bg-cyan-300 selection:text-slate-950">
      <Navbar />
      <Hero />
      <LearnHTML />
      <CssChaos />
      <BugBattle />
      <DebugTimeline />
      <DeadlineRush />
      <Finale />
    </div>
  );
}
