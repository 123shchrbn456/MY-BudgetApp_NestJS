import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // функция выполяется перед тем как выполнить запрос(например валидировать, трансформировать)
  @UsePipes(new ValidationPipe())
  // через Body говорим что будем принимать какой то обьект
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findOne() {
  //   return this.userService.findOne();
  // }
}
