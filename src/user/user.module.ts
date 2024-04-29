import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  /*imports: подключаем таблицу что бы она была видна во всём модуле  */
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '30d',
        },
      }),
      inject: [
        ConfigService,
      ] /* таким образом будет доступ к this.jwtService */,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    UserService,
  ] /* потому что мы хотим UserService использовать в auth модуле */,
})
export class UserModule {}
