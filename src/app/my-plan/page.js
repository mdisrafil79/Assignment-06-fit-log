"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";
import Loader from "@/components/Loader";
import { Stats } from "@/components/WorkoutCard";
import { usePlan } from "@/context/PlanContext";
import { getWorkouts } from "@/lib/api";

export default function MyPlan() {
  const { plan, saved, done, ready, removeItem, toggleDone } = usePlan();
  const [all, setAll] = useState(null);
  const [tab, setTab] = useState("plan");

  useEffect(() => {
    getWorkouts().then(setAll).catch(() => setAll([]));
  }, []);

  const pick = (ids) => ids.map((id) => (all || []).find((w) => w.id === id)).filter(Boolean);
  const planItems = pick(plan);
  const items = tab === "plan" ? planItems : pick(saved);
  const metrics = [
    ["Exercises", planItems.length],
    ["Minutes", planItems.reduce((n, w) => n + w.duration, 0)],
    ["Calories", planItems.reduce((n, w) => n + w.caloriesBurned, 0)],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide">My Plan</h1>
      <p className="mt-1 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {metrics.map(([label, n]) => (
          <div key={label} className="rounded-lg border border-line bg-panel p-4 text-center">
            <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{n}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 inline-flex rounded-md border border-line bg-panel p-1 text-sm font-medium" role="tablist">
        {[["plan", "Today's Plan"], ["saved", "Saved"]].map(([k, label]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`rounded px-4 py-1.5 transition ${tab === k ? "bg-accent text-black" : "text-muted hover:text-white"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {!all || !ready ? (
        <Loader />
      ) : items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-lg border border-dashed border-line py-16 text-center">
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide">Nothing here yet</h2>
          <p className="mt-2 max-w-xs text-sm text-muted">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn-primary mt-5">Go to workouts</Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((w) => {
            const isDone = done.includes(w.id);
            return (
              <li key={w.id} className={`flex flex-col gap-4 rounded-lg border border-line bg-panel p-3 sm:flex-row sm:items-center ${isDone && tab === "plan" ? "opacity-60" : ""}`}>
                <div className="flex flex-1 items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-black sm:h-20 sm:w-20">
                    <Image src={w.image} alt="" fill unoptimized sizes="80px" className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide">{w.name}</h3>
                    <p className="text-sm text-muted">{w.equipment}</p>
                    <Stats w={w} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/workout/${w.id}`} className="btn-outline !px-3 !py-2 text-xs">View Details</Link>
                  {tab === "plan" && (
                    <button onClick={() => toggleDone(w)} className={`${isDone ? "btn-outline" : "btn-primary"} !px-3 !py-2 text-xs`}>
                      <Check size={14} /> {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button
                    onClick={() => removeItem(tab, w)}
                    aria-label={`Remove ${w.name}`}
                    className="rounded-md border border-line p-2 text-muted transition hover:border-red-400 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}