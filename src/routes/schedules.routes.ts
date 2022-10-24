import { Express } from "express"

import createScheduleController from "../controllers/schedules/createNewSchedule.controller"
import getPropertyScheduleController from "../controllers/schedules/getPropertiesSchedules.controller"

import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware"
import { isAdmMiddleware } from "../middlewares/isAdm.middleware"


const schedulesRoutes = (app: Express) => {

    app.post("/schedules", verifyAuthMiddleware,createScheduleController)
    app.get("/schedules/properties/:id",verifyAuthMiddleware, isAdmMiddleware ,getPropertyScheduleController)

}

export { schedulesRoutes }