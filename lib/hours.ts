import { business } from "@/lib/business";

export function accraParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: business.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  return { weekday, hour, minute };
}

/** True when the bakery is within its stated Tuesday–Saturday hours in Accra. */
export function isOpenNow(date = new Date()): boolean {
  const { weekday, hour, minute } = accraParts(date);
  const openDays: readonly string[] = business.openWeekdays;
  if (!openDays.includes(weekday)) return false;
  const minutes = hour * 60 + minute;
  return minutes >= business.opensHour * 60 && minutes < business.closesHour * 60;
}
