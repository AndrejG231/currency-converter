/**
 * All keys for enviromental variables
 */

export const ENV_KEYS = ["PORT", "CONVERSION_ACCESS_KEY", "MONGO_URI"] as const

export type EnvKey = typeof ENV_KEYS[number]
