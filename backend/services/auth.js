import jwt from 'jsonwebtoken'
import User from '../models/User'

export async function requireAuth(user) {
  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const me = await User.query().findById(user.id)

  if (!me) {
    throw new Error('Unauthorized')
  }

  return me
}
