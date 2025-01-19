import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnType {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}
export const useFilterIngredients = (values: string[] = []): ReturnType => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, { toggle }] = useSet(new Set<string>(values));

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);
  return {
    ingredients,
    loading,
    onAddId: toggle,
    selectedIngredients: selectedIds,
  };
};
