"use client";

import { CheckCircle2, Clock, Loader2, Smartphone, Ticket, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizePhone } from "@/lib/phone";
import { planGroups, plans, site, type Plan } from "@/lib/site";

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

function VoucherDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return setError("Enter your voucher code.");
    setPending(true);
    setError((await post("/api/voucher", { code })) ?? "");
    setPending(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Use a Voucher</DialogTitle>
          <DialogDescription>Paste the code you received.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="voucher">Voucher Code</Label>
            <Input id="voucher" className="h-11 text-base" value={code} onChange={(e) => setCode(e.target.value)} />
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
          <Button type="submit" className="h-11 w-full" disabled={pending}>
            Connect
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const steps = [
  { icon: CheckCircle2, title: "Choose a plan", text: "Tap Buy Now on the plan that suits you." },
  { icon: Smartphone, title: "Pay on your phone", text: "Enter your number and approve the prompt." },
  { icon: Clock, title: "Get online", text: "You are connected as soon as payment is confirmed." },
];

export function PlanCatalog() {
  const [selected, setSelected] = useState<Plan | null>(null);
  const [voucherOpen, setVoucherOpen] = useState(false);

  return (
    <>
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Get connected to {site.name} WiFi</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">{site.tagline}</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span className="text-sm">
                  <span className="block font-medium">{title}</span>
                  <span className="text-muted-foreground">{text}</span>
                </span>
              </li>
            ))}
          </ol>
          <Button variant="outline" className="mt-6 h-10" onClick={() => setVoucherOpen(true)}>
            <Ticket aria-hidden /> I have a voucher
          </Button>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8">
        {planGroups.map((group) => (
          <section key={group} aria-labelledby={`group-${group}`}>
            <h2 id={`group-${group}`} className="mb-3 text-lg font-semibold">
              {group}
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {plans
                .filter((plan) => plan.group === group)
                .map((plan) => (
                  <li key={plan.id}>
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col gap-3">
                        <div>
                          <h3 className="font-semibold">{plan.label}</h3>
                          <p className="mt-1 text-2xl font-bold tracking-tight">
                            <span className="text-sm font-medium text-muted-foreground">{site.currency} </span>
                            {plan.price}
                          </p>
                        </div>
                        {plan.devices > 1 ? (
                          <Badge className="w-fit">
                            <Users aria-hidden /> {devices(plan.devices)}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="w-fit">
                            {devices(plan.devices)}
                          </Badge>
                        )}
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
        ))}
      </main>

      <PaymentDialog key={selected?.id ?? "none"} plan={selected} onClose={() => setSelected(null)} />
      <VoucherDialog open={voucherOpen} onOpenChange={setVoucherOpen} />
    </>
  );
}
