import { Ingredient } from "@prisma/client";
import { useEffect } from "react";
import { Api } from "@/services/api-client";

interface ReturnType {
  items: Ingredient[];
}
export const useFilterIngredients = (): ReturnType => {
  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getAll();
        return ingredients;
      } catch (error) {
        console.log(error);
      }
    }
    fetchIngredients();
  }, []);
};
