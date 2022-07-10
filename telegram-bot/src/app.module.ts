import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as LocalSession from 'telegraf-session-local';
import { TG_TOKEN } from './apikey';

const session = new LocalSession({database: 'session_db.json'})
@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [session.middleware()],
      token: TG_TOKEN
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
