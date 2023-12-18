import {describe, expect, test } from 'vitest'
import { reefy } from '~'
import { fixture } from './basic'

describe('basic fixture', () => {
  test('reefy object', () => {
    const reefied = reefy(fixture)

    expect(reefied.posts[0]!.author['id']).toBe(reefied.datas.users['12345'].id)
    expect(reefied.posts[1]!.author['id']).toBe(reefied.datas.users['67890'].id)
  })
})



