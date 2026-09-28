export default function Loader({ text = "Loading workouts…" }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-20 text-muted">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="text-sm">{text}</p>
    </div>
  );
}