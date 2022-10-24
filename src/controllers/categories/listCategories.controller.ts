import { Request, Response } from "express";
import { listCategoriesService } from "../../services/categories/listCategories.service";

const listAllCategoriesController = async (
  request: Request,
  response: Response
) => {
  const output = await listCategoriesService();

  return response.status(200).json(output);
};

export default listAllCategoriesController;
