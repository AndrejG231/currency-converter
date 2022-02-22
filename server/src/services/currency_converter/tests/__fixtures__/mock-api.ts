import listResponse from "./response-list.json"
import liveResponse from "./response-live.json"
import { timeoutAsync } from "../../../../utils/timeout_async"

class MockApi {
  instance: any

  live = jest.fn(async () => {
    await timeoutAsync(10)
    return liveResponse
  })

  list = jest.fn(async () => {
    await timeoutAsync(10)
    return listResponse
  })
}

export { MockApi }
