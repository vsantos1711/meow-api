import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get('findById/:id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Post('update')
  updateUser(@Body() user: UpdateUserDto) {
    return this.userService.update(user);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
