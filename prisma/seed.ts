import { PrismaClient } from "@prisma/client";
import {hashSync} from "bcrypt";


const prisma = new PrismaClient();



async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User',
                phone: '79992222222',
                password: hashSync('1111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin',
                phone: '79991111111',
                password: hashSync('2222', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    });


async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}
