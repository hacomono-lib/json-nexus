import { describe, expect, test } from 'vitest'
import { reefy } from '~'
import { fixture } from './basic'

describe('basic fixture', () => {
  test('reefy object', () => {
    const reefied = reefy(fixture)

    expect(reefied.posts[0]?.author.id).toBe(reefied.datas.users['12345'].id)
    expect(reefied.posts[1]?.author.id).toBe(reefied.datas.users['67890'].id)
  })

  test('rewrite primitive value', () => {
    const reefied = reefy(fixture)

    expect(reefied.posts[0]?.author.name).toBe(reefied.datas.users['12345'].name)
    expect(reefied.posts[0]?.author.name).toBe('Alice')

    reefied.datas.users['12345'].name = 'Carol'

    expect(reefied.posts[0]?.author.name).toBe('Carol')
    expect(reefied.datas.users['12345'].name).toBe('Carol')
  })

  test('rewrite object value', () => {
    const reefied = reefy(fixture)

    expect(reefied.posts[0]?.author).toStrictEqual(reefied.datas.users['12345'])

    reefied.datas.users['12345'] = {
      id: '12345',
      name: 'Carol',
      email: 'carol@example.com',
    }

    expect(reefied.posts[0]?.author).toStrictEqual(reefied.datas.users['12345'])
    expect(reefied.posts[0]?.author.name).toBe('Carol')
    expect(reefied.datas.users['12345'].name).toBe('Carol')
  })
})
