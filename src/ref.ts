import type { RefObject, RefPath, RefType } from './types'

export function ref<P extends RefPath, T = unknown>(path: P): unknown extends T ? RefObject<P> : RefType<T> {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return { $ref: path } as any
}
