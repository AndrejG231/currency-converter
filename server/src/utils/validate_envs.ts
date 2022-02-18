const requiredEnvKeys = ["PORT"]

const validateEnvs = () => {
  requiredEnvKeys.forEach((key) => {
    const env = process.env[key]
    if (!env) {
      throw new TypeError(`Missing enviromental variable ${key}`)
    }
  })
}

export { validateEnvs }
