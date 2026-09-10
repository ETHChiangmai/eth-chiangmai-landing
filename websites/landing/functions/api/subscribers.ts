import { handleSubscribersGone } from '../lib/store'

export function onRequest() {
  return handleSubscribersGone()
}
