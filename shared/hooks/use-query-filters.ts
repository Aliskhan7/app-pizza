import { useEffect, useRef } from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "@/shared/hooks/use-filters";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted) {
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

      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [filters]);
};
