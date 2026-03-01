import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
        <h2 className="text-2xl font-semibold text-foreground">Join now and start your coding journey</h2>
        <p className="mt-3 text-sm text-text-secondary">
          Build consistency with daily problem-solving and timed contest participation.
        </p>
        <Button asChild className="mt-6">
          <Link href="/auth/signup">
            Create Your Account
          </Link>
        </Button>
      </div>
    </section>
  );
}
