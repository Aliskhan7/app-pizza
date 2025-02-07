"use client"; // Добавляем client-компонент

import React from "react";
import { useRouter } from "next/navigation"; // Используем useRouter
import { Title } from "@/components/shared/title";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  className,
  imageUrl,
  price,
}) => {
  const router = useRouter(); // Подключаем роутер

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем стандартный переход по ссылке
    router.push(`/product/${id}`); // Открываем модальное окно
  };

  return (
    <div
      className={className}
      onClick={handleOpenModal}
      style={{ cursor: "pointer" }}
    >
      <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
        <img
          src={imageUrl}
          width={215}
          height={215}
          className="h-[215px] w-[215px]"
          alt={name}
        />
      </div>

      <Title text={name} size="sm" className="mb1 mt-3 font-bold" />

      <p className="text-sm text-gray-400">
        Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
        альфредо, чеснок
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>

        <Button variant="secondary">
          <Plus size={16} className="mr-1" />
          Добавить
        </Button>
      </div>
    </div>
  );
};
