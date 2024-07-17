import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { LoggedInUser } from '../auth/decorators/logged-in-user.decorator';
import { LoggedUser } from '../auth/interfaces/logged-user';

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

  @Public()
  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put('update')
  async updateUser(
    @Body() dto: UpdateUserDto,
    @LoggedInUser() loggedUser: LoggedUser,
  ) {
    return this.userService.update(dto, loggedUser);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
