const getTooltipText = (tooltipId) => {
  switch (tooltipId) {
    case 'connect':
      return `El Niño Estrella is a multimedia experience. The smart album is a limited edition digital
          box set`
    case 'leaderboard':
      return 'Leaderboard'
    case 'mint':
      return 'Purchase'
  }
}

export default getTooltipText
