import { genSalt, hash } from 'bcrypt';

export class HashPassword {
  static async hash(password: string): Promise<string> {
    const saltOrRounds = 8;
    const salt = await genSalt(saltOrRounds);
    return await hash(password, salt);
  }
}
