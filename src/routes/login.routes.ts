import { Express } from "express"

import loginController from "../controllers/login/login.controller"

const loginRoutes = (app: Express) => {

    app.post("/login", loginController)
    
}

export { loginRoutes } 