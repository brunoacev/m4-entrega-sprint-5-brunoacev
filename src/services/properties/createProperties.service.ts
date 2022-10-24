import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/Addresses.entity";
import { Categories } from "../../entities/Categories.entity";
import { Properties } from "../../entities/Properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertieService = async ({
  address,
  categoryId,
  size,
  value,
}: IPropertyRequest) => {
  if (address.state.length > 2) {
    throw new AppError(400, "Sorry! Invalid state.");
  }

  if (address.zipCode.length > 8) {
    throw new AppError(400, "Sorry! Invalid zip code.");
  }

  const propertiesRepository = AppDataSource.getRepository(Properties);

  const addressRepository = AppDataSource.getRepository(Addresses);

  const addressAlreadyExists = await addressRepository.findOneBy({
    number: address.number,
  });

  if (addressAlreadyExists) {
    throw new AppError(400, "This address already exists.");
  }

  const addresses = await addressRepository.save(address);

  const categoryRepository = AppDataSource.getRepository(Categories);

  const category = await categoryRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError(404, "Category not found!");
  }

  const propertie = await propertiesRepository.save({
    size,
    value,
    address: addresses,
    category: {
      id: category?.id,
      name: category?.name,
    },
  });

  return propertie;
};

export default createPropertieService;
