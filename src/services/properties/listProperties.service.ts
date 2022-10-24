import AppDataSource from "../../data-source";
import { Properties } from "../../entities/Properties.entity";

const listPropertiesService = async () => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const properties: Array<Properties> = await propertiesRepository.find({
    relations: { category: true },
  });

  return properties;
};

export { listPropertiesService };
