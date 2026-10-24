export const priorityOptions = [
  { value: '', label: 'No preference' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Urgent', label: 'Urgent' }
]

export const triageExamples = [
  {
    id: 'checkout-error',
    label: 'Checkout error',
    description: 'A customer cannot complete an order.',
    ticketText: 'A customer says the checkout page shows “Payment could not be processed” even though their card is valid. The order is never created. This is happening for one customer on the online store.',
    context: 'Fictional example — online store, repeat customer, order value $120.',
    requestedPriority: 'High'
  },
  {
    id: 'csv-export',
    label: 'CSV export request',
    description: 'A team wants to export a monthly report.',
    ticketText: 'Our operations team would like to export the monthly inventory report as a CSV file so they can review it in a spreadsheet. There is no export button today.',
    context: 'Fictional example — internal operations team, non-urgent request.',
    requestedPriority: 'Low'
  },
  {
    id: 'slow-dashboard',
    label: 'Slow dashboard',
    description: 'A dashboard takes too long to load.',
    ticketText: 'The support dashboard takes more than 30 seconds to load when filtering by region. Agents are waiting between calls and the page sometimes times out.',
    context: 'Fictional example — support team, peak business hours.',
    requestedPriority: 'Medium'
  }
]

const categoryLabels = {
  FeatureRequest: 'Feature request'
}

export const formatCategory = (category) => categoryLabels[category] ?? category
