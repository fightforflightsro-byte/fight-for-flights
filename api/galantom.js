const galantomUrl = 'https://asociatia-blondie.galantom.ro/p/fight-for-flights'
const galantomLegacyUrl = 'https://asociatia-blondie.galantom.ro/fundraising_pages/view?id=49820'
const galantomReaderUrl = `https://r.jina.ai/http://${galantomUrl.replace('https://', '')}`

export function parseRaisedRon(html) {
  const statsMatch = html.match(/<div id="fPage-stats">[\s\S]*?<div class="metric\b[\s\S]*?<div class="value">\s*([\d.,]+)\s*<sup>\s*RON\s*<\/sup>/i)

  if (statsMatch) {
    return Number(statsMatch[1].replace(/[.,](?=\d{3}(?:\D|$))/g, '').replace(',', '.'))
  }

  const readerMatch = html.match(/(?:^|\n)\s*([\d.,]+)\s+RON\s*(?:\n|\s)+Sum/i)

  if (!readerMatch) {
    throw new Error('Could not find Galantom raised amount')
  }

  return Number(readerMatch[1].replace(/[.,](?=\d{3}(?:\D|$))/g, '').replace(',', '.'))
}

export default async function handler(request, response) {
  try {
    let individualRaisedRon
    let sourceUrl
    let lastError

    for (const url of [galantomUrl, galantomLegacyUrl, galantomReaderUrl]) {
      try {
        const sourceResponse = await fetch(url, {
          headers: { 'User-Agent': 'Fight-for-Flights-campaign-site/1.0' },
        })

        if (!sourceResponse.ok) throw new Error(`Source responded with ${sourceResponse.status}`)

        individualRaisedRon = parseRaisedRon(await sourceResponse.text())
        sourceUrl = url
        break
      } catch (error) {
        lastError = error
      }
    }

    if (individualRaisedRon === undefined) {
      throw lastError ?? new Error('No Galantom source was available')
    }

    response.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600')
    return response.status(200).json({
      individualRaisedRon,
      currency: 'RON',
      source: 'Galantom',
      sourceUrl,
      fetchedAt: new Date().toISOString(),
    })
  } catch (error) {
    return response.status(502).json({
      error: 'Unable to read the Galantom amount',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}