import { corsOptions, handleSubscribersGet, type SubscriberEnv } from '../lib/store'

export function onRequestOptions() {
  return corsOptions('GET, OPTIONS')
}

export function onRequestGet(context: { request: Request; env: SubscriberEnv }) {
  return handleSubscribersGet(context)
}
