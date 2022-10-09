import { createApp } from "./create-app"
import { BaseRoute } from "./routes/base.route"
import { AuthRoute } from "./routes/auth.route"
import { RegisterRoute } from "./routes/register.route"
import { ProjectsRoute } from "./routes/projects.route"

const app = createApp({
  routes: [BaseRoute, AuthRoute, RegisterRoute, ProjectsRoute],
})

app.listen()
