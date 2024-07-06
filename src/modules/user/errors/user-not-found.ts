import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor(id?: string) {
    const message = id ?`User with ${id} not found` : 'User not found';
    super(
      {
        errorCode: 'USER_NOT_FOUND',
        message
      },
      HttpStatus.NOT_FOUND,
    );
  }
}