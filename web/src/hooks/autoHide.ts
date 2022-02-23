import { useCallback, useRef, useState } from "react"

/**
 * Provides state that automatically changes to initial value after timeout
 */

const useAutoHide = <InitValue>(initValue: InitValue) => {
  const [value, setValue] = useState(initValue)

  const timeout = useRef<NodeJS.Timeout | null>(null)

  /** Set value for specific amount of ms */
  const show = useCallback(
    (value: InitValue, ms: number) => {
      setValue(value)
      timeout.current = setTimeout(() => setValue(initValue), ms)
    },
    [setValue]
  )

  const hide = useCallback(() => {
    timeout.current && clearTimeout(timeout.current)
    setValue(initValue)
  }, [])

  return { value, show, hide }
}

export { useAutoHide }
