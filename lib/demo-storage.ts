import { baseLostItems, migrateLostItems, type LostItem } from "./campus-data.ts";

export type ReservationRecord = {
  id: string;
  type: string;
  title: string;
  time: string;
};

export type DemoAccount = {
  account: string;
  loginMethod: "password" | "otp";
};

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const STORAGE_VERSION = "2";
const keys = {
  version: "cdut-demo-version",
  reservations: "cdut-res",
  lost: "cdut-lost",
  account: "cdut-demo-account",
  otp: "cdut-demo-otp",
  favorites: "cdut-favorites",
  searchHistory: "cdut-search-history",
};

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function createDemoOtp(random: () => number = Math.random): string {
  return String(Math.floor(random() * 900000) + 100000);
}

export function hasDuplicateReservation(
  records: Pick<ReservationRecord, "title" | "time">[],
  candidate: Pick<ReservationRecord, "title" | "time">,
): boolean {
  return records.some(
    (record) => record.title === candidate.title && record.time === candidate.time,
  );
}

export class DemoStorage {
  private readonly storage: StorageLike;

  constructor(storage: StorageLike) {
    this.storage = storage;
  }

  initialize(): { reservations: ReservationRecord[]; lostItems: LostItem[]; account: DemoAccount | null } {
    const lostItems = migrateLostItems(
      safeParse<LostItem[]>(this.storage.getItem(keys.lost), baseLostItems),
    );
    this.storage.setItem(keys.version, STORAGE_VERSION);
    this.storage.setItem(keys.lost, JSON.stringify(lostItems));
    return {
      reservations: safeParse<ReservationRecord[]>(this.storage.getItem(keys.reservations), []),
      lostItems,
      account: safeParse<DemoAccount | null>(this.storage.getItem(keys.account), null),
    };
  }

  issueOtp(): string {
    const otp = createDemoOtp();
    this.storage.setItem(keys.otp, otp);
    return otp;
  }

  getOtp(): string | null {
    return this.storage.getItem(keys.otp);
  }

  saveReservations(records: ReservationRecord[]): void {
    this.storage.setItem(keys.reservations, JSON.stringify(records));
  }

  saveLostItems(items: LostItem[]): void {
    this.storage.setItem(keys.lost, JSON.stringify(items));
  }

  saveAccount(account: DemoAccount): void {
    this.storage.setItem(keys.account, JSON.stringify(account));
  }

  reset(): void {
    Object.values(keys).forEach((key) => this.storage.removeItem(key));
  }
}
