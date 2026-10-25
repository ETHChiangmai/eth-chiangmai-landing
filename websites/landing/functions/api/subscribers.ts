import { handleSubscribersExport, type SubscriberEnv } from '../lib/store'

export function onRequest(context: { request: Request; env: SubscriberEnv }) {
  return handleSubscribersExport(context)
}
