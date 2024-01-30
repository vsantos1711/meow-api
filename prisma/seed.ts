import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const dog = await prisma.user.upsert({
    where: { email: 'dog@hub.io' },
    update: {},
    create: {
      email: 'dog@hub.io',
      username: 'dog',
      password: 'dog',
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
      username: 'cat',
      password: 'cat',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: randomUUID(),
    },
  });

  const wolf = await prisma.user.upsert({
    where: { email: 'wolf@hub.io' },
    update: {},
    create: {
      email: 'wolf@hub.io',
      username: 'wolf',
      password: 'wolf',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: randomUUID(),
    },
  });

  console.log(`DEFAULT USER CREATED 01 => : ${dog.username} `);
  console.log(`DEFAULT USER CREATED 02 => : ${cat.username} `);
  console.log(`DEFAULT USER CREATED 03 => : ${wolf.username} `);

  await prisma.post.upsert({
    where: { id: randomUUID() },
    update: {},
    create: {
      id: randomUUID(),
      url: 'https://cdn2.thecatapi.com/images/dhn.jpg',
      catName: 'Viserion',
      catAge: '2',
      catBreed: 'Persian',
      catWeight: '2',
      author: {
        connect: {
          id: cat.id,
        },
      },
      createdAt: new Date(),
      comments: {
        createMany: {
          data: [
            {
              text: 'Nice Cat, by dog',
              authorId: dog.id,
              createdAt: new Date(),
            },
            {
              text: 'Beautiful Cat, by wolf',
              authorId: wolf.id,
              createdAt: new Date(),
            },
            {
              text: 'Nice Cat two, by dog',
              authorId: dog.id,
              createdAt: new Date(),
            },
          ],
        },
      },
    },
  });

  console.log('DEFAULT POSTS CREATED');
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
