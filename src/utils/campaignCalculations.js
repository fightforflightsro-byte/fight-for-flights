export function getCampaignProgress(stats, sponsors) {
  const individualEur = stats.individualRaisedRon / stats.ronPerEur
  const corporateEur = sponsors.reduce((total, sponsor) => total + sponsor.contributionEur, 0)
  const totalEur = individualEur + corporateEur
  const percentage = Math.min((totalEur / stats.targetEur) * 100, 100)

  return {
    individualEur,
    corporateEur,
    totalEur,
    percentage,
    individualWidth: (individualEur / stats.targetEur) * 100,
    corporateWidth: (corporateEur / stats.targetEur) * 100,
  }
}

export function formatEur(value) {
  return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
}