import { Express } from "express"

import createPropertiesController from "../controllers/properties/createNewProperties.controller"
import listPropertiesController from "../controllers/properties/listAllProperties.controller"

import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware"
import { isAdmMiddleware } from "../middlewares/isAdm.middleware"


const propertiesRoutes = (app: Express) => {

    app.post("/properties", verifyAuthMiddleware, isAdmMiddleware, createPropertiesController)
    app.get("/properties", listPropertiesController)
    
}

export { propertiesRoutes }