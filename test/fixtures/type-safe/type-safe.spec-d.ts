import { describe, expectTypeOf, test } from 'vitest'
import { reefy } from '~'
import { fixture } from './type-safe'

describe('reefy type tests', () => {
  test('reefy object', () => {
    const reefied = reefy(fixture)

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expectTypeOf(reefied.comments[0]!.author.id).toEqualTypeOf<string>()
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expectTypeOf(reefied.comments[1]!.author.id).toEqualTypeOf<string>()
  })
})
