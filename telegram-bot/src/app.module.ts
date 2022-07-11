import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate} from './app.update';
import { AppService } from './app.service';
import * as LocalSession from 'telegraf-session-local';
import { TG_TOKEN } from './apikey';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { database } from './database';

const session = new LocalSession({database: 'session_db.json'})
@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [session.middleware()],
      token: TG_TOKEN
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: database.DB,
      username: database.USER_DB,
      password: database.PASSWORD_DB,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
			migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
			synchronize: true
    })
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
