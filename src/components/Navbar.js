"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = usePlan();
  const isActive = (h) => (h === "/" ? path === "/" || path.startsWith("/workout") : path.startsWith(h));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
          <Image src="/logo.png" alt="" width={28} height={28} />
          <span className="font-display text-lg font-semibold tracking-wider max-sm:hidden">FITLOG</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                isActive(l.href) ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-1 text-black">
            Plan {plan.length}
          </Link>
          <Link href="/my-plan" className="rounded-full border border-muted/60 px-3 py-1 text-muted hover:text-white">
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
}