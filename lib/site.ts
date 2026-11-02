export const site = {
  name: "Hotspot",
  tagline: "Fast, affordable WiFi. Pick a plan and get online in minutes.",
  supportPhone: "0798809776",
  currency: "KES",
};

export type PlanGroup = "Hourly" | "Daily" | "Weekly & Monthly";

export type Plan = {
  id: string;
  label: string;
  price: number;
  devices: number;
  group: PlanGroup;
};

export const plans: Plan[] = [
  { id: "1h", label: "1 Hour", price: 7, devices: 1, group: "Hourly" },
  { id: "2h", label: "2 Hours", price: 10, devices: 1, group: "Hourly" },
  { id: "3h", label: "3 Hours", price: 13, devices: 1, group: "Hourly" },
  { id: "4h", label: "4 Hours", price: 15, devices: 1, group: "Hourly" },
  { id: "6h-3d", label: "6 Hours", price: 60, devices: 3, group: "Hourly" },
  { id: "8h", label: "8 Hours", price: 20, devices: 1, group: "Hourly" },
  { id: "12h", label: "12 Hours", price: 25, devices: 1, group: "Hourly" },
  { id: "24h", label: "24 Hours", price: 30, devices: 1, group: "Hourly" },
  { id: "2d", label: "2 Days", price: 60, devices: 1, group: "Daily" },
  { id: "2d-3d", label: "2 Days", price: 120, devices: 3, group: "Daily" },
  { id: "3d", label: "3 Days", price: 100, devices: 1, group: "Daily" },
  { id: "4d", label: "4 Days", price: 160, devices: 1, group: "Daily" },
  { id: "6d", label: "6 Days", price: 200, devices: 1, group: "Daily" },
  { id: "1w", label: "1 Week", price: 250, devices: 1, group: "Weekly & Monthly" },
  { id: "1m-3d", label: "1 Month", price: 650, devices: 3, group: "Weekly & Monthly" },
];

export const planGroups: PlanGroup[] = ["Hourly", "Daily", "Weekly & Monthly"];

/** PLACEHOLDER content: replace with real adverts and news. */
export const adverts = [
  { id: "ad-1", title: "Your advert here", body: "Reach every customer who connects to this hotspot.", cta: "Advertise with us" },
  { id: "ad-2", title: "Your advert here", body: "Promote your shop, service or event to local customers.", cta: "Learn more" },
];

export const news = [
  { id: "news-1", date: "Placeholder", title: "News headline goes here", summary: "A short summary of the story appears in this space." },
  { id: "news-2", date: "Placeholder", title: "Second news headline", summary: "A short summary of the story appears in this space." },
  { id: "news-3", date: "Placeholder", title: "Third news headline", summary: "A short summary of the story appears in this space." },
];
