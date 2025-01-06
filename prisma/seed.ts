import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
import { category, ingredients, products } from "./constants";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: "user@email.com",
        phone: "79992222222",
        password: hashSync("1111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin",
        email: "admin@email.com",
        phone: "79991111111",
        password: hashSync("2222", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: category,
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Сырный бортик",
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сливочная моцарелла",
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
      }),

      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 20,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 40,
      }),

      generateProductItem({
        productId: 1,
      }),
      generateProductItem({
        productId: 2,
      }),
      generateProductItem({
        productId: 3,
      }),
      generateProductItem({
        productId: 4,
      }),
      generateProductItem({
        productId: 5,
      }),
      generateProductItem({
        productId: 6,
      }),
      generateProductItem({
        productId: 7,
      }),
      generateProductItem({
        productId: 8,
      }),
      generateProductItem({
        productId: 9,
      }),
      generateProductItem({
        productId: 10,
      }),
      generateProductItem({
        productId: 11,
      }),
      generateProductItem({
        productId: 12,
      }),
      generateProductItem({
        productId: 13,
      }),
      generateProductItem({
        productId: 14,
      }),
      generateProductItem({
        productId: 15,
      }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
