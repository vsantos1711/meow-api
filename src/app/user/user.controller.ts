import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { isPublic } from '../decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('findAll')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('findById/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @isPublic()
  @Post('create')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Post('update')
  async updateUser(@Body() user: UpdateUserDto) {
    return this.userService.update(user);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
