import { Express } from "express"

import { usersRoutes } from "./users.routes"
import { loginRoutes } from "./login.routes"
import { categoriesRoutes } from "./categories.routes"
import { propertiesRoutes } from "./properties.routes"
import { schedulesRoutes } from "./schedules.routes"


const routes = (app: Express) => {

    usersRoutes(app)
    loginRoutes(app)
    categoriesRoutes(app)
    propertiesRoutes(app)
    schedulesRoutes(app)

}

export { routes }