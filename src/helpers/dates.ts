import { Moment } from "moment";
import { settings } from "../settings";

export function formatDate(date: Moment): string {
  return date.format(settings.dateFormat);
}
