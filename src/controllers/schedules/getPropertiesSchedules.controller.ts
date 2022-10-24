import { Request, Response } from "express";
import { getPropertyScheduleService } from "../../services/schedules/getPropertySchedule.service";

const getPropertyScheduleController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const output = await getPropertyScheduleService(id);

  return response.status(200).json(output);
};

export default getPropertyScheduleController;
