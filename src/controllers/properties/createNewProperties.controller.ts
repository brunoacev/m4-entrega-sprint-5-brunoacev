import { Request, Response } from "express";
import createPropertieService from "../../services/properties/createProperties.service";

const createPropertiesController = async (
  request: Request,
  response: Response
) => {
  //todas as propriedades que preciso na requisição:
  const { size, value, address, categoryId } = request.body;

  const output = await createPropertieService({
    size,
    value,
    address,
    categoryId,
  });

  return response.status(201).json(output);
};

export default createPropertiesController;
