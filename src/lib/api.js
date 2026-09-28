const BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Could not load workouts");
  return res.json();
}

export async function getWorkout(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data && data.id ? data : null;
}