import rawServices from "@/data/services.json";

export type Service = {
  id: string;
  name: string;
  /** Short label used on the cube face. */
  shortName: string;
  description: string;
  startingPrice: {
    /** Whole US dollars. */
    amount: number;
    /** Billing unit, e.g. "user" renders as "/user". null for a flat price. */
    unit: string | null;
    /** What the entry-level engagement is. */
    note: string;
  };
  url: string;
};

/**
 * Light runtime check so a typo in services.json fails the build
 * with a clear message instead of rendering a broken card.
 */
function assertService(value: unknown, index: number): asserts value is Service {
  const s = value as Service;
  const ok =
    typeof s?.id === "string" &&
    typeof s?.name === "string" &&
    typeof s?.shortName === "string" &&
    typeof s?.description === "string" &&
    typeof s?.url === "string" &&
    typeof s?.startingPrice?.amount === "number" &&
    typeof s?.startingPrice?.note === "string" &&
    (s?.startingPrice?.unit === null || typeof s?.startingPrice?.unit === "string");
  if (!ok) {
    throw new Error(`services.json: entry ${index} is missing a required field`);
  }
}

export function getServices(): Service[] {
  const list: unknown[] = rawServices;
  list.forEach(assertService);
  return list as Service[];
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice({ amount, unit }: Service["startingPrice"]): string {
  return unit ? `${usd.format(amount)}/${unit}` : usd.format(amount);
}
