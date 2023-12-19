import type { Get, IsUnknown } from 'type-fest'

declare const __brand: unique symbol

declare const __origin: unique symbol

type Branded<T, B> = T & { [__brand]: B }

export type Reefiable = ReefyParsablePrimitive | ReefyParsableArray | ReefyParsableObject | Ref

export type ReefyParsablePrimitive = string | number | boolean | null

export type ReefyParsableArray = Reefiable[] | readonly Reefiable[]

export type ReefyParsableObject = { [_ in string]: Reefiable } & { [_ in string]?: Reefiable | undefined }

export type Ref = RefType | RefObject

export type RefType<T = unknown> = Branded<T & RefObject, 'RefType'>

export interface RefObject<R extends RefPath = RefPath> {
  $ref: R
}

export type RefPath = `#/${string}`

export type DotPath<P extends RefPath> = P extends `#/${infer R}` ? Replace<R, '/', '.'> : never

export type Replace<S extends string, B extends string, A extends string> = S extends `${infer R1}${B}${infer R2}`
  ? Replace<`${R1}${A}${R2}`, B, A>
  : S

export type PickRef<P extends RefPath, O extends Reefiable> = RefPath extends P ? unknown : Get<O, DotPath<P>>

export interface ReefiedMeta<Origin extends Reefiable> {
  /**
   * @deprecated this is meta data, not intended to be used directly.
   */
  [__origin]: Origin
}

export type Reefied<Origin extends Reefiable, T> = T | (T & ReefiedMeta<Origin>)

export type Reefy<Origin extends Reefiable, Target extends Reefiable = Origin> = ReefyInternal<Origin, Target>

type Cast<T, P> = T extends P ? T : P

type ReefyInternal<Origin extends Reefiable, Target extends Reefiable = Origin> = IsUnknown<Target> extends true
  ? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Reefied<Origin, any>
  : Target extends ReefyParsablePrimitive
    ? Reefied<Origin, Target>
    : Target extends RefType<infer R>
      ? Reefied<Origin, R>
      : Target extends RefObject<infer P>
        ? Reefied<Origin, PickRef<P, Origin>>
        : Target extends infer R extends ReefyParsableArray | ReefyParsableObject
          ? {
              [K in keyof R]: ReefyInternal<Origin, Cast<R[K], Reefiable>>
            } extends infer R2
            ? Reefied<Origin, R2>
            : never
          : never

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Unreefy<T extends Reefied<any, any>> = T extends Reefied<any, infer R>
  ? IsUnknown<R> extends true
    ? Reefiable
    : R
  : Reefiable

type UnreefyInternal<T extends Reefied<any, any>> = T extends Reefied<any, infer R>
