import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  // here put your seed data
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
