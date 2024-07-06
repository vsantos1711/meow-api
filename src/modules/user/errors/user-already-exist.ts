import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistError extends HttpException {
  constructor() {
    super(
      {
        errorCode: 'USER_ALREADY_EXIST',
        message: `This username is already in use`,
      },
      HttpStatus.CONFLICT,
    );
  }
}