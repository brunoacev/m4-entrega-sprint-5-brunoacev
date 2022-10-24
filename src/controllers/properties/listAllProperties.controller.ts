import { Request, Response } from "express";
import { listPropertiesService } from "../../services/properties/listProperties.service";

const listPropertiesController = async (
  request: Request,
  response: Response
) => {
  const output = await listPropertiesService();

  return response.json(output);
};

export default listPropertiesController;
