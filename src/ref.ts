import type { Ref, RefObject, RefPath, RefType } from './types'

export function ref<T>(path: string): RefType<T>

export function ref<P extends RefPath>(path: P): RefObject<P>

export function ref(path: string): Ref {
  return { $ref: path } as Ref
}
