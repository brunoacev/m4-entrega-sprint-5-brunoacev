import AppDataSource from "../../data-source";
import { Properties } from "../../entities/Properties.entity";
import { Users } from "../../entities/Users.entity";
import { Schedules_users_properties } from "../../entities/Schedules_users_properties";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest) => {
  const schedulesRepository = AppDataSource.getRepository(
    Schedules_users_properties
  );

  const propertiesRepository = AppDataSource.getRepository(Properties);

  const usersRepository = AppDataSource.getRepository(Users);

  // Error Aqui
  if (!userId) throw new AppError(404, "User not found!");

  const user = await usersRepository.findOne({ where: { id: userId } });

  const scheduleHourString = new Date("" + hour).toTimeString().split(" ")[0];

  if (scheduleHourString.toLowerCase() === "invalid")
    throw new AppError(400, "Error!");

  const scheduleHour = new Date("" + hour).getHours();

  const scheduleMinutes = new Date("" + hour).getMinutes();

  if (scheduleHour < 8 || scheduleHour > 18) {
    throw new AppError(400, "Error");
  } else if (scheduleHour === 8 || scheduleHour === 18) {
    if (scheduleMinutes !== 0) throw new AppError(400, "Error");
  }

  const scheduleDateString = new Date(date).toLocaleDateString("zh-CN");

  if (scheduleDateString.toLowerCase() === "invalid date")
    throw new AppError(400, "Wrong date format!");

  const scheduleDateDay = new Date(date).toDateString().split(" ")[0];

  if (scheduleDateDay === "Sat" || scheduleDateDay === "Sun")
    throw new AppError(400, "Error");

  const property = await propertiesRepository.findOneBy({ id: propertyId });

  if (!property) throw new AppError(404, "Property not found! Sorry.");

  const isDateAndHourTaken = property.schedules.some((schedule) => {
    return (
      schedule.date === scheduleDateString &&
      schedule.hour === scheduleHourString
    );
  });

  if (isDateAndHourTaken) throw new AppError(400, "");

  const schedule = new Schedules_users_properties();
  schedule.date = scheduleDateString;
  schedule.hour = scheduleHourString;
  schedule.property = property;
  schedule.user = user!;

  let newSchedule;

  try {
    newSchedule = await schedulesRepository.save(schedule);
  } catch (error) {
    if (error instanceof Error) throw new AppError(400, error.message);
  }

  return newSchedule;
};

export { createScheduleService };
