import React from "react";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/shared/product-image";
interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items: any[];
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
  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage imageUrl={imageUrl} size={30} />
    </div>
  );
};
