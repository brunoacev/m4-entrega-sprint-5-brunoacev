import { Request, Response } from "express";
import { createScheduleService } from "../../services/schedules/createSchedule.service";
import { IScheduleRequest } from "../../interfaces/schedules";
import jwt from "jsonwebtoken";

const createScheduleController = async (
  request: Request,
  response: Response
) => {
  const { date, hour, propertyId }: IScheduleRequest = request.body;

  const { authorization } = request.headers;

  const token = authorization!.split(" ")[1];

  const { id } = jwt.decode(token) as { id: string };

  const userId = id;

  const output = await createScheduleService({
    date,
    hour,
    propertyId,
    userId,
  });

  return response.status(201).json({ message: "New schedule created!" });
};

export default createScheduleController;
