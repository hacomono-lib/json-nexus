import type { Get, Simplify } from 'type-fest'

type Branded<T, B> = T & { __brand: B }

export type Reefiable = ReefyParsablePrimitive | ReefyParsableArray | ReefyParsableObject | RefObject

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
  __origin: Origin
}

export type Reefied<Origin extends Reefiable, T> = T | (T & ReefiedMeta<Origin>)

export type Reefy<Origin extends Reefiable, Target extends Reefiable = Origin> = Simplify<ReefyInternal<Origin, Target>>

export type ReefyInternal<
  Origin extends Reefiable,
  Target extends Reefiable = Origin,
> = Target extends ReefyParsablePrimitive
  ? Reefied<Origin, Target>
  : Target extends RefType<infer R>
    ? Reefied<Origin, R>
    : Target extends RefObject<infer P>
      ? Reefied<Origin, PickRef<P, Origin>>
      : Target extends ReefyParsableArray | ReefyParsableObject
        ? {
            [K in keyof Target]: Target[K] extends Reefiable ? ReefyInternal<Origin, Target[K]> : never
          } extends infer R
          ? Reefied<Origin, R>
          : never
        : never
