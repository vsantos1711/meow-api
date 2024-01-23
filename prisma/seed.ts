import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const dog = await prisma.user.upsert({
    where: { email: 'dog@hub.io' },
    update: {},
    create: {
      email: 'dog@hub.io',
      username: 'Dog',
      password: 'cat123',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: randomUUID(),
    },
  });
  const cat = await prisma.user.upsert({
    where: { email: 'cat@hub.io' },
    update: {},
    create: {
      email: 'cat@hub.io',
      username: 'Cat',
      password: 'cat123',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: randomUUID(),
    },
  });

  console.log(`DEFAULT USER CREATED 01 => : ${dog} `);
  console.log(`DEFAULT USER CREATED 02=> : ${cat} `);
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
