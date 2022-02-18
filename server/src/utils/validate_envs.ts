import { ENV_KEYS } from "src/constants/env_keys"

const validateEnvs = () => {
  ENV_KEYS.forEach((key) => {
    const env = process.env[key]
    if (!env) {
      throw new TypeError(`Missing enviromental variable ${key}`)
    }
  })
}

export { validateEnvs }
