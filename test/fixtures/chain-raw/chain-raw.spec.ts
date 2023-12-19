import { expect, test } from 'vitest'
import { reefy } from '~'
import { fixture } from './chain-raw'

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
