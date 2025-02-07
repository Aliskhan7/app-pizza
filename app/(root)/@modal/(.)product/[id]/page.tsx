import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ChooseProductModal } from "@/components/shared";
export const dynamic = "force-dynamic";

export default async function ProductModalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
