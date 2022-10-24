import { Express } from "express"

import createNewUsersController from "../controllers/user/createNewUser.controller"
import listAllUsersController from "../controllers/user/deleteAUser.controller"
import deleteAUsersController from "../controllers/user/listAllUsers.controller"

import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware"
import { isAdmMiddleware } from "../middlewares/isAdm.middleware"


const usersRoutes = (app: Express) => {

    app.post("/users", createNewUsersController)
    app.get("/users", verifyAuthMiddleware, isAdmMiddleware,listAllUsersController)
    app.delete("/users/:id", verifyAuthMiddleware, isAdmMiddleware,deleteAUsersController)
    
}


export { usersRoutes }