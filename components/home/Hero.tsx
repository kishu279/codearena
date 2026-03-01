import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24">
      <div className="rounded-2xl border border-border bg-[radial-gradient(circle_at_top,_rgba(32,197,142,0.18),_transparent_58%),var(--color-bg-secondary)] p-8 sm:p-12">
        <Badge variant="outline" className="bg-surface-2 text-text-secondary">
          CodeArena MVP
        </Badge>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Master DSA & Competitive Programming
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary">
          Solve curated questions, join timed contests, and benchmark your progress against global competitors.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/auth/signup">
              Start Solving
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contests">
              View Contests
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
