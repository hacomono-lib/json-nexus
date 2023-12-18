import type { Reefiable, Reefy } from "./types";

export function reefy<T extends Reefiable>(target: T): Reefy<T> {
  return target as Reefy<T>
}
