import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    // урок 5_ 14:40 заинджектили репозиторий(таблицу?) Юзера, записали в переменную userRepository
    // теперь в userRepository будут все доступные методы из typeorm для того что бы мы работали с базой данных
    // userRepository по сути создана для поиска в базе данных
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existUser) throw new BadRequestException('This email already exists');

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });
    return { user };
  }

  // async findOne(email: string) {
  //   // return await this.userRepository.findOne({ where: { email: email } });
  // }
}
