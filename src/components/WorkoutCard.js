import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export const Tag = ({ children }) => (
  <span className="rounded bg-accent/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
    {children}
  </span>
);

export function Stats({ w }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
      <span className="flex items-center gap-1"><Clock size={14} className="text-accent" />{w.duration} min</span>
      <span className="flex items-center gap-1"><Flame size={14} className="text-accent" />{w.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1"><Star size={14} className="text-accent" />{w.rating}</span>
    </div>
  );
}

export default function WorkoutCard({ w }) {
  return (
    <Link href={`/workout/${w.id}`} className="group overflow-hidden rounded-lg border border-line bg-panel transition hover:border-accent/60">
      <div className="relative aspect-[4/3] bg-black">
        <Image src={w.image} alt={w.name} fill unoptimized sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-1.5">{w.muscleGroups.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide">{w.name}</h3>
        <p className="text-sm text-muted">{w.equipment}</p>
        <Stats w={w} />
      </div>
    </Link>
  );
}