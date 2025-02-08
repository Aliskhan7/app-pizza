import { useEffect } from "react";
import qs from "qs";
import { Filters } from "@/app/hooks/use-filters";
import { useRouter } from "next/navigation";

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
  }, [filters, router]);
};
