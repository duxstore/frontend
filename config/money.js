// Control the way money values are displayed.
// We could want to get the user's currency or sum
const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2,
})

export default naira
