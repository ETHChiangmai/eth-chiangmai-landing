import { corsOptions, handleSubscribePost, type SubscriberEnv } from '../lib/store'

export function onRequestOptions() {
  return corsOptions('POST, OPTIONS')
}

export function onRequestPost(context: { request: Request; env: SubscriberEnv }) {
  return handleSubscribePost(context)
}
