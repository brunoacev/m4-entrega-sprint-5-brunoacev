import AppDataSource from "../../data-source";
import { Properties } from "../../entities/Properties.entity";
import { AppError } from "../../errors/appError";

const getPropertyScheduleService = async (propertyId: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const property = await propertiesRepository.findOne({
    where: { id: propertyId },
  });

  if (!property) throw new AppError(404, "Property does not exist!");

  if (property.schedules.length === 0)
    throw new AppError(404, "Property has no schedules!");

  return property;
};

export { getPropertyScheduleService };
