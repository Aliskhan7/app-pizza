import { axiosInstance } from "@/shared/services/instance";
import { ApiRoutes } from "@/shared/services/constants";
import { CartDTO } from "@/shared/services/dto/cart.dto";

export const getAll = async (): Promise<CartDTO[]> => {
  return (await axiosInstance.get<CartDTO[]>(ApiRoutes.CART)).data;
};
