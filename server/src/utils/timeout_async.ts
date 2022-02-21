/**
 * Awaitable timeout
 */

const timeoutAsync = (ms: number): Promise<true> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), ms)
  })

export { timeoutAsync }
