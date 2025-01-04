import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
import { category, ingredients, products } from "./constants";

const prisma = new PrismaClient();

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
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
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
