"use server";

import { CheckoutFormValues } from "@/shared/constants";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";

export async function createOrder(data: CheckoutFormValues) {
  const token: "123";
  await prisma.order.create({
    data: {
      token: cartToken,
      fullName: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
      totalAmount: userCart.totalAmount,
      status: OrderStatus.PENDING,
      items: JSON.stringify(userCart.items),
    },
  });
}
