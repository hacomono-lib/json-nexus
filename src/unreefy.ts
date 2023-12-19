import type { Reefied, Unreefy } from ".";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  function unreefy<T extends Reefied<any, any>>(target: T): Unreefy<T> {
  return target
}
