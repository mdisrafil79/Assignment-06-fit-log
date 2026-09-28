"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Bookmark, Plus } from "lucide-react";
import Loader from "@/components/Loader";
import NotFoundView from "@/components/NotFoundView";
import { Tag } from "@/components/WorkoutCard";
import { CAP, usePlan } from "@/context/PlanContext";
import { getWorkout } from "@/lib/api";

export default function WorkoutDetail() {
  const { id } = useParams();
  const [w, setW] = useState(undefined);
  const { plan, addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    setW(undefined);
    getWorkout(id).then(setW).catch(() => setW(null));
  }, [id]);

  if (w === undefined) return <Loader text="Loading workout…" />;
  if (w === null) return <NotFoundView />;

  const full = plan.length >= CAP && !plan.includes(w.id);
  const specs = [
    ["Equipment", w.equipment], ["Difficulty", w.difficulty], ["Sets", w.sets], ["Reps", w.reps],
    ["Duration", `${w.duration} min`], ["Calories", `${w.caloriesBurned} kcal`], ["Rating", w.rating],
  ];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-line bg-black md:sticky md:top-24 md:self-start">
        <Image src={w.image} alt={w.name} fill unoptimized priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
      </div>

      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">{w.name}</h1>
        <p className="mt-3 text-muted">{w.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{w.muscleGroups.map((t) => <Tag key={t}>{t}</Tag>)}</div>

        <dl className="mt-6 divide-y divide-line rounded-lg border border-line bg-panel text-sm">
          {specs.map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-2.5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 font-display text-xl font-semibold uppercase tracking-wide">Instructions</h2>
        <ol className="mt-3 space-y-3">
          {w.instructions.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">{i + 1}</span>
              <span className="text-muted">{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => addToPlan(w)} disabled={full} className="btn-primary">
            <Plus size={16} /> Add to today's plan
          </button>
          <button onClick={() => saveForLater(w)} className="btn-outline">
            <Bookmark size={16} /> Save for later
          </button>
        </div>
        {full && <p className="mt-3 text-xs text-muted">Today's plan is full ({CAP} lifts). Remove one to add another.</p>}
      </div>
    </div>
  );
}