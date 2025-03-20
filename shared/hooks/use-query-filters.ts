import { useEffect } from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "@/shared/hooks/use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  console.log("Current filters:", filters);
  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });
    if (window.location.search === `?${query}`) {
      return; // ⛔ Если URL уже такой же, выходим из useEffect
    }
    console.log("Updating query string:", query);

    router.push(`?${query}`, {
      scroll: false,
    });
  }, [filters]);
};
