import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      <p className="px-4">
        Need help? Call <a className="font-medium underline" href={`tel:${site.supportPhone}`}>{site.supportPhone}</a>
      </p>
    </footer>
  );
}
