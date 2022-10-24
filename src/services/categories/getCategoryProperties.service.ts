import AppDataSource from "../../data-source";
import { Categories } from "../../entities/Categories.entity";
import { AppError } from "../../errors/appError";

const getCategoryPropertiesService = async (id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const category = await categoriesRepository.findOne({
    where: { id: id },
    relations: { properties: true },
  });

  if (!category) throw new AppError(404, "category not found");

  return category;
};

export { getCategoryPropertiesService };
