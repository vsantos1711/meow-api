import { User } from '@/modules/user/entities/user.entity';
import { randomUUID } from 'crypto';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { HashPassword } from '@/modules/user/utils/hash-password';


export default class UsersSeeder implements Seeder {
  private readonly logger = new Logger(UsersSeeder.name);
  private readonly hashPassword = HashPassword;
  public async run(dataSource: DataSource): Promise<any> {
    this.logger.verbose('Running USER seeder');
    const userRepository = dataSource.getRepository(User);
    const users = [{
      id: randomUUID(),
      username: 'Dog',
      email: 'dog@hub.io',
      password: await this.hashPassword.hash('Dog123@'),
    },
    {
      id: randomUUID(),
      username: 'Cat',
      email: 'cat@hub.io',
      password: await this.hashPassword.hash('Cat123@'),
    },
    {
      id: randomUUID(),
      username: 'Wolf',
      email: 'wolf@hub.io',
      password: await this.hashPassword.hash('Wolf123@'),
    }]
    for await (const user of users) {
      const userExists = await userRepository.findOne({ where: { username: user.username } });
      if (!userExists) {
        this.logger.verbose(`🍃 Default user ${user.username} created!`);
        await userRepository.save(user);
      }
    }
  }
}
