import { mkdir, writeFile } from 'node:fs/promises'
import { parseRaisedRon } from '../api/galantom.js'

const sourceUrl = 'https://asociatia-blondie.galantom.ro/p/fight-for-flights'
const response = await fetch(sourceUrl, {
  headers: { 'User-Agent': 'Fight-for-Flights-GitHub-Action/1.0' },
})

if (!response.ok) {
  throw new Error(`Galantom responded with ${response.status}`)
}

const individualRaisedRon = parseRaisedRon(await response.text())
const data = {
  individualRaisedRon,
  currency: 'RON',
  source: 'Galantom',
  sourceUrl,
  fetchedAt: new Date().toISOString(),
}

await mkdir('public/data', { recursive: true })
await writeFile('public/data/galantom.json', `${JSON.stringify(data, null, 2)}\n`)
console.log(data)
