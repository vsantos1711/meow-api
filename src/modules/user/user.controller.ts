import { Body, Controller, Get, Param, Post, Delete, Put, Req } from '@nestjs/common';
import { LoggedUser, UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { isPublic } from '../auth/decorators/public.decorator';
import { LoggedInUser } from '../auth/decorators/logged-in-user.decorator';

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
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put('update')
  async updateUser(@Body() dto: UpdateUserDto, @LoggedInUser() loggedUser: LoggedUser) {
    const user = loggedUser;
    return this.userService.update(dto, user);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
