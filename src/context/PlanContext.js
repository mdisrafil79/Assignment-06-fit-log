"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2, Info } from "lucide-react";

const Ctx = createContext(null);
export const CAP = 5;
const KEY = "fitlog:v1";

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) || "{}");
      setPlan(d.plan || []);
      setSaved(d.saved || []);
      setDone(d.done || []);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify({ plan, saved, done }));
  }, [plan, saved, done, ready]);

  const toast = useCallback((msg, type = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const addToPlan = (w) => {
    if (plan.includes(w.id)) return toast(`${w.name} is already in today's plan`, "info");
    if (plan.length >= CAP) return toast(`Plan is full. Finish a lift first (max ${CAP})`, "info");
    setPlan([...plan, w.id]);
    toast(`${w.name} added to today's plan`);
  };

  const saveForLater = (w) => {
    if (saved.includes(w.id)) return toast(`${w.name} is already saved`, "info");
    setSaved([...saved, w.id]);
    toast(`${w.name} saved for later`);
  };

  const removeItem = (kind, w) => {
    if (kind === "plan") {
      setPlan(plan.filter((i) => i !== w.id));
      setDone(done.filter((i) => i !== w.id));
      toast(`${w.name} removed from today's plan`);
    } else {
      setSaved(saved.filter((i) => i !== w.id));
      toast(`${w.name} removed from saved`);
    }
  };

  const toggleDone = (w) => {
    const isDone = done.includes(w.id);
    setDone(isDone ? done.filter((i) => i !== w.id) : [...done, w.id]);
    toast(isDone ? `${w.name} marked as not done` : `${w.name} marked as done`);
  };

  return (
    <Ctx.Provider value={{ plan, saved, done, ready, addToPlan, saveForLater, removeItem, toggleDone }}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="flex items-center gap-2 rounded-md border border-accent/40 bg-panel px-4 py-3 text-sm shadow-lg">
            {t.type === "info" ? <Info size={16} className="text-muted" /> : <CheckCircle2 size={16} className="text-accent" />}
            {t.msg}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export const usePlan = () => useContext(Ctx);