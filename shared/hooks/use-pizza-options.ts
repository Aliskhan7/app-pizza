import { Variant } from "@/shared/components/shared/group-varients";
import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "@/shared/lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  );
  const availableSizes = getAvailablePizzaSizes(type, items);

  useEffect(() => {
    const isAvaibleSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const avaibleSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvaibleSize && avaibleSize) {
      setSize(Number(avaibleSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  };
};
