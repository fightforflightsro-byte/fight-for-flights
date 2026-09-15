const galantomUrl = 'https://asociatia-blondie.galantom.ro/p/fight-for-flights'

export function parseRaisedRon(html) {
  const amountMatch = html.match(/<div class="value">\s*([\d.,]+)\s*<sup>\s*RON\s*<\/sup>[\s\S]*?<div class="name">\s*Sumă strânsă\s*<\/div>/i)

  if (!amountMatch) {
    throw new Error('Could not find Galantom raised amount')
  }

  return Number(amountMatch[1].replace(/[.,](?=\d{3}(?:\D|$))/g, '').replace(',', '.'))
}

export default async function handler(request, response) {
  try {
    const galantomResponse = await fetch(galantomUrl, {
      headers: { 'User-Agent': 'Fight-for-Flights-campaign-site/1.0' },
    })

    if (!galantomResponse.ok) {
      throw new Error(`Galantom responded with ${galantomResponse.status}`)
    }

    const html = await galantomResponse.text()
    const individualRaisedRon = parseRaisedRon(html)

    response.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600')
    return response.status(200).json({
      individualRaisedRon,
      currency: 'RON',
      source: 'Galantom',
      sourceUrl: galantomUrl,
      fetchedAt: new Date().toISOString(),
    })
  } catch (error) {
    return response.status(502).json({
      error: 'Unable to read the Galantom amount',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}