module.exports = function formatDate (any) {
  const date = new Date(any)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
