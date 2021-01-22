// Fake subscriptions data
const subscriptions = [{id: 1}, {id: 2}, {id: 3}]

export default function handler(req, res) {
  // Get data from your database
  res.status(200).json(subscriptions)
}
