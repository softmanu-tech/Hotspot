import { PlanCatalog } from "@/components/plan-catalog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <PlanCatalog />
      <SiteFooter />
    </>
  );
}
