import {describe, test, expectTypeOf } from 'vitest'
import { reefy } from '~'
import { fixture } from './basic'

describe('basic fixture', () => {
  test('reefy object', () => {
    const reefied = reefy(fixture)

    expectTypeOf(reefied.posts[0]!.author['id']).toEqualTypeOf<"12345">()
    expectTypeOf(reefied.posts[1]!.author['id']).toEqualTypeOf<"67890">()
  })
})


