import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const dog = await prisma.user.create({
    data: {
      id: randomUUID(),
      email: 'dog@hub.io',
      username: 'dog',
      password: 'dog',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const cat = await prisma.user.create({
    data: {
      id: randomUUID(),
      email: 'cat@hub.io',
      username: 'cat',
      password: 'cat',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const wolf = await prisma.user.create({
    data: {
      id: randomUUID(),
      email: 'wolf@hub.io',
      username: 'wolf',
      password: 'wolf',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(`🍃 DEFAULT USER CREATED 01 => : ${dog.username} `);
  console.log(`🍃 DEFAULT USER CREATED 02 => : ${cat.username} `);
  console.log(`🍃 DEFAULT USER CREATED 03 => : ${wolf.username} `);

  const postData = [
    {
      url: 'https://cdn2.thecatapi.com/images/dhn.jpg',
      views: 598822,
      catName: 'Viserion',
      catAge: '1',
      catBreed: 'Dragon cat',
      catWeight: '5',
      author: cat.id,
      comments: [
        {
          text: 'This cat looks like a dragon.',
          authorId: dog.id,
        },
        {
          text: 'Valar Morghulis, even for cats.',
          authorId: dog.id,
        },
        {
          text: "I've never seen a cat like this beyond the Wall.",
          authorId: dog.id,
        },
        {
          authorId: wolf.id,
          text: 'Lionheart indeed.',
        },
      ],
      variant: 'top-right',
    },

    {
      url: 'https://cdn2.thecatapi.com/images/46k.jpg',
      views: 25982,
      catName: 'Ghost',
      catAge: '3',
      catBreed: 'Direcat',
      catWeight: '6',
      author: dog.id,
      comments: [
        {
          text: "I can sense Ghost's presence through this image.",
          authorId: cat.id,
        },
        {
          text: 'An impressive feline, indeed.',
          authorId: cat.id,
        },
      ],
    },

    {
      url: 'https://cdn2.thecatapi.com/images/9pl.jpg',
      views: 25982,
      catName: 'Khalessi',
      catAge: '4',
      catBreed: 'Dothrakicat',
      catWeight: '8',
      author: cat.id,
      comments: [
        {
          text: 'Valar Dohaeris, even for cats.',
          authorId: dog.id,
        },
        {
          text: 'Even the cats in Essos are fierce.',
          authorId: wolf.id,
        },
      ],
    },

    {
      url: 'https://cdn2.thecatapi.com/images/dl2.jpg',
      views: 25982,
      catName: 'Undead cat',
      catAge: '1',
      catBreed: 'Dragon Cat',
      catWeight: '5',
      author: cat.id,
      comments: [
        {
          text: 'This cat looks like a dragon.',
          authorId: dog.id,
        },
        {
          text: 'Valar Morghulis, even for cats.',
          authorId: dog.id,
        },
        {
          text: "I've never seen a cat like this beyond the Wall.",
          authorId: dog.id,
        },
        {
          authorId: wolf.id,
          text: 'Lionheart indeed.',
        },
      ],
    },

    {
      url: 'https://cdn2.thecatapi.com/images/HxENheThN.jpg',
      views: 25982,
      catName: 'Needle',
      catAge: '2',
      catBreed: 'Facelesscat',
      catWeight: '4',
      author: wolf.id,
      comments: [
        {
          text: 'A cat with no name. I like it.',
          authorId: dog.id,
        },
      ],
    },

    {
      url: 'https://cdn2.thecatapi.com/images/MTgzODA0OA.jpg',
      views: 25982,
      catName: 'Tyrion Lannister',
      catAge: '1',
      catBreed: 'Dragon Cat',
      catWeight: '5',
      author: cat.id,
      comments: [
        {
          text: 'This cat looks like a dragon.',
          authorId: dog.id,
        },
        {
          text: 'Valar Morghulis, even for cats.',
          authorId: dog.id,
        },
        {
          text: "I've never seen a cat like this beyond the Wall.",
          authorId: dog.id,
        },
        {
          authorId: wolf.id,
          text: 'Lionheart indeed.',
        },
      ],
    },

    {
      url: 'https://cdn2.thecatapi.com/images/6um.jpg',
      views: 25982,
      catName: 'Lionheart',
      catAge: '5',
      catBreed: 'Lannistercat',
      catWeight: '7',
      author: cat.id,
      comments: [
        {
          text: 'Lionheart indeed.',
          authorId: dog.id,
        },
        {
          authorId: wolf.id,
          text: 'A cat fit for a Lannister.',
        },
      ],
    },

    {
      url: 'https://cdn2.thecatapi.com/images/s6l9xck-Q.jpg',
      views: 1236,
      catName: 'White Walker',
      catAge: '2',
      catBreed: 'Undeadcat',
      catWeight: '10',
      author: cat.id,
      comments: [
        {
          text: 'This cat looks like a dragon.',
          authorId: dog.id,
        },
        {
          text: 'Valar Morghulis, even for cats.',
          authorId: dog.id,
        },
        {
          text: "I've never seen a cat like this beyond the Wall.",
          authorId: dog.id,
        },
        {
          authorId: wolf.id,
          text: 'Lionheart indeed.',
        },
        {
          text: 'Valar Morghulis, even for cats.',
          authorId: dog.id,
        },
        {
          text: "I've never seen a cat like this beyond the Wall.",
          authorId: dog.id,
        },
        {
          authorId: wolf.id,
          text: 'Lionheart indeed.',
        },
        {
          text: 'Valar Morghulis, even for cats.',
          authorId: wolf.id,
        },
        {
          text: "I've never seen a cat like this beyond the Wall.",
          authorId: dog.id,
        },
        {
          authorId: wolf.id,
          text: 'Lionheart indeed.',
        },
        {
          text: 'Valar Morghulis, even for cats.',
          authorId: wolf.id,
        },
        {
          text: "I've never seen a cat like this beyond the Wall.",
          authorId: dog.id,
        },
        {
          authorId: wolf.id,
          text: 'Lionheart indeed.',
        },
      ],
      variant: 'top-left',
    },
    {
      url: 'https://cdn2.thecatapi.com/images/ets_USqdE.jpg',
      views: 25982,
      catName: 'Arya Stark',
      catAge: '1',
      catBreed: 'Wolfcat',
      catWeight: '2',
      author: cat.id,
      comments: [],
    },
  ];

  for (let i = 0; i < postData.length; i++) {
    await prisma.post.create({
      data: {
        id: randomUUID(),
        url: postData[i].url,
        views: postData[i].views,
        catName: postData[i].catName,
        catAge: postData[i].catAge,
        catBreed: postData[i].catBreed,
        catWeight: postData[i].catWeight,
        author: {
          connect: {
            id: postData[i].author,
          },
        },
        createdAt: new Date(),
        comments: {
          createMany: {
            data: postData[i].comments.map((comment) => {
              return {
                text: comment.text,
                authorId: comment.authorId,
                createdAt: new Date(),
              };
            }),
          },
        },
      },
    });
  }

  console.log('🌳 STANDARD POSTS CREATED');
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
