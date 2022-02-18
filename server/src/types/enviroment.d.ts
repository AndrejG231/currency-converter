import { EnvKey } from "src/constants/env_keys"

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<EnvKey, string> {}
  }
}

export {}
