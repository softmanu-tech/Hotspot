import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WelcomeBanner } from "@/components/welcome-banner";
import { adverts, news } from "@/lib/site";

export const metadata: Metadata = { title: "Welcome | WiFi Login" };

export default function WelcomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8">
        <Suspense fallback={<div className="h-24 rounded-xl border bg-card" />}>
          <WelcomeBanner />
        </Suspense>

        <section aria-labelledby="adverts">
          <h2 id="adverts" className="mb-3 text-lg font-semibold">Sponsored</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {adverts.map((ad) => (
              <Card key={ad.id}>
                <CardContent className="space-y-2">
                  <Badge variant="secondary">Ad</Badge>
                  <h3 className="text-lg font-semibold">{ad.title}</h3>
                  <p className="text-sm text-muted-foreground">{ad.body}</p>
                  <p className="text-sm font-medium text-primary">{ad.cta}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="news">
          <h2 id="news" className="mb-3 text-lg font-semibold">Latest News</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {news.map((item) => (
              <Card key={item.id}>
                <CardContent className="space-y-1">
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
