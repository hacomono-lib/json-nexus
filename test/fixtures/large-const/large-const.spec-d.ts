import { test } from 'vitest'
import { reefy } from '~'
import { fixture } from './large-const'

test('large const object cannot reefy types', () => {
  // FIXME: Type instantiation is excessively deep and possibly infinite.
  // @ts-expect-error
  reefy(fixture)
})
