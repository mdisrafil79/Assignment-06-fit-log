import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-white">
          <Image src="/logo.png" alt="" width={22} height={22} />
          <span className="font-display font-semibold tracking-wider">FITLOG</span>
        </div>
        <p className="text-center sm:text-right">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}