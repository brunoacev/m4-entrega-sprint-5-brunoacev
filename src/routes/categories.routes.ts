import { Express } from "express";
import createNewCategoriesController from "../controllers/categories/createCategories.controller";
import listAllCategoriesController from "../controllers/categories/listCategories.controller";
import getCategoryByPropertiesController from "../controllers/categories/getCategoriesByProperties.controller";
import { verifyAuthMiddleware } from "../middlewares/verifyAuth.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const categoriesRoutes = (app: Express) => {
  app.post(
    "/categories",
    verifyAuthMiddleware,
    isAdmMiddleware,
    createNewCategoriesController
  );
  app.get("/categories", listAllCategoriesController);
  app.get("/categories/:id/properties", getCategoryByPropertiesController);
};

export { categoriesRoutes };
