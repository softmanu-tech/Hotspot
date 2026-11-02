"use client";

import { ArrowDown, CalendarDays, Info, Loader2, Rocket, Smartphone, Sun, Ticket, Users, Wifi, Zap, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { HeroArt } from "@/components/hero-art";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizePhone } from "@/lib/phone";
import { planGroups, plans, site, type Plan, type PlanGroup } from "@/lib/site";
import { cn } from "@/lib/utils";

const devices = (n: number) => `${n} ${n === 1 ? "Device" : "Devices"}`;

async function post(url: string, payload: unknown) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return res.ok ? null : (data.error as string);
  } catch {
    return "Connection problem. Please try again.";
  }
}

function PaymentDialog({ plan, onClose }: { plan: Plan | null; onClose: () => void }) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!plan || pending) return;
    if (!normalizePhone(phone)) return setError("Enter a valid phone number, e.g. 0712345678.");
    setError("");
    setPending(true);
    const failure = await post("/api/pay", { planId: plan.id, phone });
    if (failure) {
      setError(failure);
      setPending(false);
      return;
    }
    router.push(`/welcome?plan=${plan.id}`);
  }

  return (
    <Dialog open={!!plan} onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>You will receive a payment prompt on your phone.</DialogDescription>
        </DialogHeader>
        {plan && (
          <form onSubmit={submit} className="grid gap-4" noValidate>
            <div className="flex items-center justify-between rounded-lg bg-muted p-3 text-sm">
              <span>
                <span className="block font-medium">{plan.label}</span>
                <span className="text-muted-foreground">{devices(plan.devices)}</span>
              </span>
              <span className="text-lg font-semibold">
                {site.currency} {plan.price}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Enter Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                autoFocus
                placeholder="e.g. 0712345678"
                className="h-11 text-base"
                value={phone}
                disabled={pending}
                aria-invalid={!!error}
                aria-describedby={error ? "phone-error" : undefined}
                onChange={(e) => setPhone(e.target.value)}
              />
              {error && (
                <p id="phone-error" role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>
            <Button type="submit" className="h-11 w-full" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden /> Check your phone…
                </>
              ) : (
                `Pay ${site.currency} ${plan.price}`
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function VoucherForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!code) return setError("Paste the voucher from your SMS.");
    setPending(true);
    setError((await post("/api/voucher", { code })) ?? "");
    setPending(false);
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-xl bg-card p-4 text-card-foreground shadow-lg">
      <Label htmlFor="voucher" className="mb-2">
        Voucher code
      </Label>
      <div className="flex">
        <Input
          id="voucher"
          autoFocus
          autoCapitalize="characters"
          autoComplete="off"
          placeholder="Paste voucher from SMS"
          className="h-11 min-w-0 flex-1 rounded-r-none text-base"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().replace(/\s/g, ""))}
        />
        <Button type="submit" className="h-11 rounded-l-none px-5" disabled={pending}>
          Login
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </form>
  );
}

const instructions = [
  "Please wait a few seconds after payment for automatic reconnection.",
  "Do not close this page during processing.",
  "Paste the voucher sent by SMS if you are not connected automatically.",
  "Vouchers must be pasted in CAPITAL letters without spaces, e.g. SWE34W42.",
];

function Instructions() {
  return (
    <div className="rounded-xl bg-card p-4 text-card-foreground shadow-lg">
      <h2 className="flex items-center gap-2 font-semibold">
        <Info className="size-5 text-primary" aria-hidden /> Instructions
      </h2>
      <ol className="mt-3 grid gap-2 text-sm">
        {instructions.map((text, i) => (
          <li key={text} className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
              {i + 1}
            </span>
            <span className="pt-0.5">{text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const steps = [
  { icon: Wifi, title: "Choose a plan", text: "Tap Buy Now on the plan that suits you." },
  { icon: Smartphone, title: "Pay on your phone", text: "Enter your number and approve the prompt." },
  { icon: Rocket, title: "Get online", text: "You are connected once payment is confirmed." },
];

const groupStyle: Record<PlanGroup, { icon: LucideIcon; band: string; note: string }> = {
  Hourly: { icon: Zap, band: "from-orange-600 to-amber-600", note: "Quick access for right now" },
  Daily: { icon: Sun, band: "from-sky-700 to-cyan-600", note: "Stay connected for days" },
  "Weekly & Monthly": { icon: CalendarDays, band: "from-violet-700 to-fuchsia-600", note: "Long-term connection" },
};

const fromPrice = Math.min(...plans.map((plan) => plan.price));

export function PlanCatalog() {
  const [selected, setSelected] = useState<Plan | null>(null);
  const [panel, setPanel] = useState<"voucher" | "instructions" | null>(null);
  const toggle = (next: "voucher" | "instructions") => setPanel(panel === next ? null : next);

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-950 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pt-8 pb-16 md:grid-cols-2 md:pt-12 md:pb-20">
          <div>
            <p className="w-fit rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
              Plans from {site.currency} {fromPrice}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Get online in minutes with {site.name} WiFi
            </h1>
            <p className="mt-3 max-w-md text-emerald-50">{site.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#plans" className={cn(buttonVariants(), "h-11 bg-amber-400 px-5 text-amber-950 hover:bg-amber-300")}>
                View plans <ArrowDown aria-hidden />
              </a>
              <Button
                variant="outline"
                aria-expanded={panel === "voucher"}
                className="h-11 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white dark:bg-white/10"
                onClick={() => toggle("voucher")}
              >
                <Ticket aria-hidden /> Voucher
              </Button>
              <Button
                variant="outline"
                aria-expanded={panel === "instructions"}
                className="h-11 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white dark:bg-white/10"
                onClick={() => toggle("instructions")}
              >
                <Info aria-hidden /> Instructions
              </Button>
            </div>
            {panel && <div className="mt-4 max-w-md">{panel === "voucher" ? <VoucherForm /> : <Instructions />}</div>}
          </div>
          <HeroArt className="mx-auto w-full max-w-72 md:max-w-md" />
        </div>
      </section>

      <div className="mx-auto -mt-10 w-full max-w-6xl px-4">
        <ol className="grid gap-4 rounded-xl border bg-card p-5 shadow-md sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm">
                <span className="block font-semibold">{title}</span>
                <span className="text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <main id="plans" className="mx-auto w-full max-w-6xl flex-1 scroll-mt-20 space-y-10 px-4 py-10">
        {planGroups.map((group) => {
          const { icon: GroupIcon, band, note } = groupStyle[group];
          return (
            <section key={group} aria-labelledby={`group-${group}`}>
              <div className="mb-4 flex items-center gap-3">
                <span className={cn("flex size-10 items-center justify-center rounded-lg bg-gradient-to-br text-white", band)}>
                  <GroupIcon className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 id={`group-${group}`} className="text-xl font-bold">
                    {group}
                  </h2>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {plans
                  .filter((plan) => plan.group === group)
                  .map((plan) => (
                    <li key={plan.id}>
                      <Card className="h-full gap-0 overflow-hidden pt-0 transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none">
                        <h3 className={cn("bg-gradient-to-r px-4 py-2.5 font-semibold text-white", band)}>{plan.label}</h3>
                        <CardContent className="flex flex-1 flex-col gap-3 pt-4">
                          <p className="text-3xl font-bold tracking-tight">
                            <span className="text-sm font-medium text-muted-foreground">{site.currency} </span>
                            {plan.price}
                          </p>
                          <Badge variant={plan.devices > 1 ? "default" : "secondary"} className="w-fit">
                            <Users aria-hidden /> {devices(plan.devices)}
                          </Badge>
                          <Button className="mt-auto h-10 w-full" onClick={() => setSelected(plan)}>
                            Buy Now
                            <span className="sr-only">
                              {" "}
                              {plan.label}, {devices(plan.devices)}
                            </span>
                          </Button>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
              </ul>
            </section>
          );
        })}
      </main>

      <PaymentDialog key={selected?.id ?? "none"} plan={selected} onClose={() => setSelected(null)} />
    </>
  );
}
