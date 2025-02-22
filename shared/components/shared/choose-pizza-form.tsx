"use client";

import React, { useEffect, useState } from "react";
import { Ingredient, ProductItem } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { Title } from "@/shared/components/shared/title";
import { GroupVariants } from "@/shared/components/shared/group-varients";
import { PizzaImage } from "@/shared/components/shared/pizza-image";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { Button } from "@/shared/components/ui";
import { IngredientItem } from "@/shared/components/shared/Ingredient-item";
import { useSet } from "react-use";
import calcTotalPizzaPrice from "@/shared/lib/calc-total-pizza-price";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  // const {
  //   size,
  //   type,
  //   selectedIngredients,
  //   availableSizes,
  //   currentItemId,
  //   setSize,
  //   setType,
  //   addIngredient,
  // } = usePizzaOptions(items);
  //
  // const { totalPrice, textDetaills } = getPizzaDetails(
  //   type,
  //   size,
  //   items,
  //   ingredients,
  //   selectedIngredients,
  // );

  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  );

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  const handleClickAdd = () => {
    onSubmit?.();
  };

  const filteredPizzaByType = items.filter((item) => item.pizzaType === type);
  const availabelPizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzaByType.some(
      (pizza) => Number(pizza.size) === Number(item.value),
    ),
  }));

  useEffect(() => {
    const isAvaibleSize = availabelPizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const avaibleSize = availabelPizzaSizes?.find((item) => !item.disabled);

    if (!isAvaibleSize && avaibleSize) {
      setSize(Number(avaibleSize.value) as PizzaSize);
    }
  }, [type]);

  // const handleClickAdd = () => {
  //   if (currentItemId) {
  //     onSubmit(currentItemId, Array.from(selectedIngredients));
  //   }
  // };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availabelPizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          // loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
