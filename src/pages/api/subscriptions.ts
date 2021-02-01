// Fake subscriptions data
import type { NextApiRequest, NextApiResponse } from 'next'

const subscriptions = [{id: 1}, {id: 2}, {id: 3}]

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(subscriptions)
}
