import type { Get, Simplify } from 'type-fest'

export type Reefiable = ReefyParsablePrimitive | ReefyParsableArray | ReefyParsableObject | RefObject

export type ReefyParsablePrimitive = string | number | boolean | null

export type ReefyParsableArray = Reefiable[] | readonly Reefiable[]

export type ReefyParsableObject = { [k in string]: Reefiable } & { [k in string]?: Reefiable | undefined }

export interface RefObject<R extends RefPath = RefPath> {
  $ref: R
}

export type RefPath = `#/${string}`

export type DotPath<P extends RefPath> = P extends `#/${infer R}` ? Replace<R, '/', '.'> : never

export type Replace<S extends string, B extends string, A extends string> = S extends `${infer R1}${B}${infer R2}`
  ? Replace<`${R1}${A}${R2}`, B, A>
  : S

export type PickRef<P extends RefPath, O extends Reefiable> = Get<O, DotPath<P>>

export type Reefied<ORIGIN extends Reefiable, T> = T & { [_ in typeof origin]: ORIGIN }

export type Reefy<ORIGIN extends Reefiable, TARGET extends Reefiable = ORIGIN> = Simplify<ReefyInternal<ORIGIN, TARGET>>

export type ReefyInternal<
  ORIGIN extends Reefiable,
  TARGET extends Reefiable = ORIGIN,
> = TARGET extends ReefyParsablePrimitive
  ? TARGET
  : TARGET extends RefObject<infer P>
    ? PickRef<P, ORIGIN>
    : TARGET extends ReefyParsableArray | ReefyParsableObject
      ? Reefied<ORIGIN, { [K in keyof TARGET]: TARGET[K] extends Reefiable ? ReefyInternal<ORIGIN, TARGET[K]> : never }>
      : never
