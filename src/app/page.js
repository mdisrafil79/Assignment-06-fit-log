"use client";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/lib/api";

const SORTS = { Duration: "duration", Calories: "caloriesBurned", Rating: "rating" };

export default function Home() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState("Duration");
  const [q, setQ] = useState("");

  useEffect(() => {
    getWorkouts().then(setItems).catch(() => setError(true));
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (items || [])
      .filter((w) => !s || w.name.toLowerCase().includes(s) || w.muscleGroups.some((m) => m.toLowerCase().includes(s)))
      .sort((a, b) => b[SORTS[sort]] - a[SORTS[sort]]);
  }, [items, sort, q]);

  return (
    <>
      <Hero />
      <section id="library" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">The Library</h2>
            <p className="mt-1 text-muted">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="relative">
              <span className="sr-only">Search workouts</span>
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name or muscle"
                className="w-52 rounded-md border border-line bg-panel py-2 pl-9 pr-3 text-sm outline-none focus:border-accent"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              Sort By
              <span className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-9 text-sm text-white outline-none focus:border-accent"
                >
                  {Object.keys(SORTS).map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
              </span>
            </label>
          </div>
        </div>

        {error ? (
          <p className="py-16 text-center text-muted">Couldn't load workouts. Check your connection and reload the page.</p>
        ) : !items ? (
          <Loader />
        ) : list.length === 0 ? (
          <p className="py-16 text-center text-muted">No lifts match "{q}". Try a muscle group like chest or core.</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => <WorkoutCard key={w.id} w={w} />)}
          </div>
        )}
      </section>
    </>
  );
}