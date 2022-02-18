/**
 * All keys for enviromental variables
 */

export const ENV_KEYS = ["PORT"] as const

export type EnvKey = typeof ENV_KEYS[number]
