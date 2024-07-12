import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import UsersSeeder from './users.seed';
import PostsSeeder from './posts.seed';


export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [UsersSeeder, PostsSeeder],
    });
  }
}