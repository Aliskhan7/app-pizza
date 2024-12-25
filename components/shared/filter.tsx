import React from "react";
import { Title } from "@/components/shared/title";

interface Props {
  className?: string;
}

export const Filter: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
    </div>
  );
};
