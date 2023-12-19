import { describe, expect, test } from 'vitest'
import { reefy } from '~'
import { fixture } from './type-safe'

describe('reefy tests', () => {
  test('reefy object', () => {
    const reefied = reefy(fixture)

    expect(reefied.comments[0]?.author.id).toBe(reefied.datas.users['67890'].id)
    expect(reefied.comments[1]?.author.id).toBe(reefied.datas.users['12345'].id)
  })

  test('rewrite primitive value', () => {
    const reefied = reefy(fixture)

    expect(reefied.comments[0]?.author.name).toBe(reefied.datas.users['67890'].name)
    expect(reefied.comments[0]?.author.name).toBe('Bob')

    reefied.datas.users['67890'].name = 'Carol'

    expect(reefied.comments[0]?.author.name).toBe('Carol')
    expect(reefied.datas.posts['002'].author.name).toBe('Carol')
    expect(reefied.datas.users['67890'].name).toBe('Carol')
  })

  test('rewrite reference primitive value', () => {
    const reefied = reefy(fixture)

    expect(reefied.comments[0]?.author.name).toBe(reefied.datas.users['67890'].name)
    expect(reefied.comments[0]?.author.name).toBe('Bob')

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    reefied.comments[0]!.author.name = 'Carol'

    expect(reefied.comments[0]?.author.name).toBe('Carol')
    expect(reefied.datas.posts['002'].author.name).toBe('Carol')
    expect(reefied.datas.users['67890'].name).toBe('Carol')
  })

  test('rewrite source object value', () => {
    const reefied = reefy(fixture)

    expect(reefied.comments[0]?.author).toStrictEqual(reefied.datas.users['67890'])

    reefied.datas.users['67890'] = {
      id: '67890',
      name: 'Carol',
      email: 'carol@example.com',
    }

    expect(reefied.comments[0]?.author).toStrictEqual(reefied.datas.users['67890'])
    expect(reefied.comments[0]?.author.name).toBe('Carol')
    expect(reefied.datas.posts['002'].author.name).toBe('Carol')
    expect(reefied.datas.users['67890'].name).toBe('Carol')
  })

  test('rewrite ref object value', () => {
    const reefied = reefy(fixture)

    expect(reefied.comments[0]?.author).toStrictEqual(reefied.datas.users['67890'])

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    reefied.comments[0]!.author = {
      id: '67890',
      name: 'Carol',
      email: 'carol@example.com',
    }

    expect(reefied.comments[0]?.author).toStrictEqual(reefied.datas.users['67890'])
    expect(reefied.comments[0]?.author.name).toBe('Carol')
    expect(reefied.datas.posts['002'].author.name).toBe('Carol')
    expect(reefied.datas.users['67890'].name).toBe('Carol')
  })
})
