import { mkdir, writeFile } from 'node:fs/promises'
import { parseRaisedRon } from '../api/galantom.js'

const sourceUrl = 'https://asociatia-blondie.galantom.ro/p/fight-for-flights'
const bnrUrl = 'https://curs.bnr.ro/nbrfxrates.xml'

export function parseBnrEurRon(xml) {
  const rateMatch = xml.match(/<Rate\s+currency="EUR"[^>]*>([0-9.]+)<\/Rate>/i)

  if (!rateMatch) {
    throw new Error('Could not find EUR rate in BNR XML')
  }

  return Number(rateMatch[1])
}

const response = await fetch(sourceUrl, {
  headers: { 'User-Agent': 'Fight-for-Flights-GitHub-Action/1.0' },
})

if (!response.ok) {
  throw new Error(`Galantom responded with ${response.status}`)
}

const individualRaisedRon = parseRaisedRon(await response.text())
const bnrResponse = await fetch(bnrUrl, {
  headers: { 'User-Agent': 'Fight-for-Flights-GitHub-Action/1.0' },
})

if (!bnrResponse.ok) {
  throw new Error(`BNR responded with ${bnrResponse.status}`)
}

const bnrXml = await bnrResponse.text()
const ronPerEur = parseBnrEurRon(bnrXml)
const data = {
  individualRaisedRon,
  ronPerEur,
  currency: 'RON',
  rateSource: 'BNR',
  rateSourceUrl: bnrUrl,
  source: 'Galantom',
  sourceUrl,
  fetchedAt: new Date().toISOString(),
}

await mkdir('public/data', { recursive: true })
await writeFile('public/data/galantom.json', `${JSON.stringify(data, null, 2)}\n`)
console.log(data)
