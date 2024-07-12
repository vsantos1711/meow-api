import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { Post } from '@/modules/post/entities/post.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Comment } from '@/modules/post/entities/comment.entity';


export default class PostsSeeder implements Seeder {
  private readonly logger = new Logger(PostsSeeder.name);

  public async run(dataSource: DataSource): Promise<any> {
    this.logger.verbose('Running POST seeder');
    const postRepository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);
    const commentRepository = dataSource.getRepository(Comment);

    const cat = await userRepository.findOne({ where: { username: 'Cat' } });
    const dog = await userRepository.findOne({ where: { username: 'Dog' } });
    const wolf = await userRepository.findOne({ where: { username: 'Wolf' } });
    const posts = [
      {
        url: 'https://cdn2.thecatapi.com/images/dhn.jpg',
        views: 598822,
        catName: 'Viserion',
        catAge: '1',
        catBreed: 'Dragon cat',
        catWeight: '5',
        author: cat,
        comments: [
          { text: 'Paws and Claws.', author: cat },
          { text: 'Cats are coming.', author: wolf },
          { text: 'Every cat must choose its own path.', author: dog },
        ],
      },
      {
        url: 'https://cdn2.thecatapi.com/images/46k.jpg',
        views: 25982,
        catName: 'Ghost',
        catAge: '3',
        catBreed: 'Direcat',
        catWeight: '6',
        author: dog,
        comments: [
          { text: "I can sense Ghost's presence through this image.", author: wolf },
          { text: 'An impressive feline, indeed.', author: cat },
        ],
      },
      {
        url: 'https://cdn2.thecatapi.com/images/9pl.jpg',
        views: 25982,
        catName: 'Khalessi',
        catAge: '4',
        catBreed: 'Dothrakicat',
        catWeight: '8',
        author: cat,
        comments: [
          { text: 'Valar Dohaeris, even for cats.', author: dog },
          { text: 'Even the cats in Essos are fierce.', author: wolf },
        ],
      },
  
      {
        url: 'https://cdn2.thecatapi.com/images/dl2.jpg',
        views: 25982,
        catName: 'Undead cat',
        catAge: '1',
        catBreed: 'Dragon Cat',
        catWeight: '5',
        author: cat,
        comments: [
          { text: "Hold the door, there's a cat coming.", author: dog },
          { text: 'The king in the North! And his loyal cat.', author: wolf },
        ],
      },
      {
        url: 'https://cdn2.thecatapi.com/images/HxENheThN.jpg',
        views: 25982,
        catName: 'Needle',
        catAge: '2',
        catBreed: 'Facelesscat',
        catWeight: '4',
        author: wolf,
        comments: [
          { text: 'A cat with no name. I like it.', author: dog },
        ],
      },
      {
        url: 'https://cdn2.thecatapi.com/images/MTgzODA0OA.jpg',
        views: 25982,
        catName: 'Tyrion Lannister',
        catAge: '1',
        catBreed: 'Dragon Cat',
        catWeight: '5',
        author: cat,
        comments: [
          { text: 'Bend the knee... to the cat.', author: cat },
        ],
      },
      {
        url: 'https://cdn2.thecatapi.com/images/6um.jpg',
        views: 25982,
        catName: 'Lionheart',
        catAge: '5',
        catBreed: 'Lannistercat',
        catWeight: '7',
        author: cat,
        comments: [
          { text: 'A cat fit for a Lannister.', author: wolf },
        ],
      },
      {
        url: 'https://cdn2.thecatapi.com/images/s6l9xck-Q.jpg',
        views: 1236,
        catName: 'White Walker',
        catAge: '2',
        catBreed: 'Undeadcat',
        catWeight: '10',
        author: cat,
        comments: [
          { text: 'This cat looks like a dragon.', author: wolf },
          { text: 'Valar Morghulis, even for cats.', author: dog },
          { text: "I've never seen a cat like this beyond the Wall.", author: dog },
          { text: 'Lionheart indeed.', author: wolf },
          { text: 'Dracarys! Cat style.', author: cat },
          { text: 'A Lannister always pays his debts, even to cats.', author: dog },
          { text: "Winter is coming, and so are the cats.", author: wolf },
          { text: 'Fire and Blood... and Cats.', author: cat },
          { text: 'What do we say to the God of Death? Not today, cat.', author: dog },
          { text: 'The night is dark and full of terrors, especially for cats.', author: wolf },
          { text: "A cat has no name.", author: cat },
          { text: 'The North remembers, especially the cats.', author: wolf },
          { text: 'When you play the game of thrones, you win or you die. Cats know this.', author: dog }
        ],
      },
      {
        url: 'https://cdn2.thecatapi.com/images/ets_USqdE.jpg',
        views: 25982,
        catName: 'Arya Stark',
        catAge: '1',
        catBreed: 'Wolfcat',
        catWeight: '2',
        author: cat,
        comments: [],
      },
    ];

    for await (const post of posts) {
      await postRepository.upsert(post, ['url']);
      for await (const comment of post.comments) {
        const commentExists = await commentRepository.findOne({ where: { text: comment.text } });
        if (!commentExists) await commentRepository.save({
          ...comment,
          post: post,
        });
      }
    }
  }
}
