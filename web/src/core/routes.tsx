import { Convert } from "../pages/Convert"
import { Statistics } from "../pages/Statistics"
import { Route } from "../types/route"

const routes: Route[] = [
  { display: "Statistics", path: "/stats", component: <Statistics /> },
  { display: "Convert", path: "/", component: <Convert /> },
]

export { routes }
