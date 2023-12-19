import { describe, expect, test } from 'vitest'
import { reefy, unreefy } from '~'
import { fixture } from './basic'

describe('reefy tests', () => {
  test('reefy object', () => {
    const reefied = reefy(fixture)

    expect(reefied.posts[0]?.author.id).toBe(reefied.datas.users['12345'].id)
    expect(reefied.posts[1]?.author.id).toBe(reefied.datas.users['67890'].id)
  })

  test('rewrite source primitive value', () => {
    const reefied = reefy(fixture)

    expect(reefied.posts[0]?.author.name).toBe(reefied.datas.users['12345'].name)
    expect(reefied.posts[0]?.author.name).toBe('Alice')

    reefied.datas.users['12345'].name = 'Carol'

    expect(reefied.posts[0]?.author.name).toBe('Carol')
    expect(reefied.datas.users['12345'].name).toBe('Carol')
  })

  test('rewrite reference primitive value', () => {
    const reefied = reefy(fixture)

    expect(reefied.posts[0]?.author.name).toBe(reefied.datas.users['12345'].name)
    expect(reefied.posts[0]?.author.name).toBe('Alice')

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    reefied.posts[0]!.author.name = 'Carol'

    expect(reefied.posts[0]?.author.name).toBe('Carol')
    expect(reefied.datas.users['12345'].name).toBe('Carol')
  })

  test('rewrite source object value', () => {
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

  test('rewrite ref object value', () => {
    const reefied = reefy(fixture)

    expect(reefied.posts[0]?.author).toStrictEqual(reefied.datas.users['12345'])

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    reefied.posts[0]!.author = {
      id: '12345',
      name: 'Carol',
      email: 'carol@example.com',
    }

    expect(reefied.posts[0]?.author).toStrictEqual(reefied.datas.users['12345'])
    expect(reefied.posts[0]?.author.name).toBe('Carol')
  })
})

describe('unreefy tests', () => {
  test('unreefy object', () => {
    const reefied = reefy(fixture)

    const unreefied = unreefy(reefied)

    expect(unreefied.posts[0]?.author.id).toBeUndefined()
    expect(unreefied.posts[1]?.author.$ref).toBeDefined()
  })
})
