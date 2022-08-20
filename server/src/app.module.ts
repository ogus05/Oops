import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {join} from 'path';
import { KeyWord } from './entities/keyword';
import { Oop } from './entities/oop';
import { Box } from './entities/box';
import { Font } from './entities/font';
import { Template } from './entities/template';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'oops',
        password: configService.get('DB_PASSWORD'),
        database: 'oops',
        entities: [join(__dirname, 'entities', '**')],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot(({
      isGlobal: true,
    })),
    TypeOrmModule.forFeature([KeyWord, Oop, Box, Font, Template])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
