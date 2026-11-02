"use client";

import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { plans } from "@/lib/site";

export function WelcomeBanner() {
  const planId = useSearchParams().get("plan");
  const plan = plans.find((p) => p.id === planId);

  return (
    <div className="flex items-start gap-3 rounded-xl border bg-card p-5">
      <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden />
      <div>
        <h1 className="text-xl font-bold">Thank you for your purchase</h1>
        <p className="text-sm text-muted-foreground">
          {plan ? `Your ${plan.label} plan is ready.` : "Your plan is ready."} Enjoy browsing.
        </p>
      </div>
    </div>
  );
}
