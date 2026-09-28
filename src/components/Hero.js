import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <section className="grid items-center gap-8 rounded-2xl border border-line bg-panel p-6 md:grid-cols-2 md:p-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">WORKOUT LIBRARY</p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into todays plan, and watch the weeks work add up.
          </p>
          <a href="#library" className="btn-primary mt-7">
            Browse workouts <ArrowDown size={16} />
          </a>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <Image src="/banner.png" alt="Athlete on a preacher curl machine" fill priority sizes="(min-width:768px) 384px, 90vw" className="object-contain" />
        </div>
      </section>
    </div>
  );
}