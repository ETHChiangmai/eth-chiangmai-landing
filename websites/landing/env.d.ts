/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUBSCRIBE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
