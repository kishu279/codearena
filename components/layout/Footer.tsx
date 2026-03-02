export default function Footer() {
  return (
    <footer className="mt-80 border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-text-secondary sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} CodeArena. All rights reserved.</p>
        <p>Master DSA. Compete weekly. Climb the leaderboard.</p>
      </div>
    </footer>
  );
}
