import { Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { allList } from './app.allList';
import { actionButtons } from './app.buttons';
import { AppService } from './app.service';

const todos = [
  {
    id: 1,
    name: 'text1',
    status: true
  },
  {
    id: 2,
    name: 'text2',
    status: false
  },
  {
    id: 3,
    name: 'text3',
    status: false
  }
]

@Update()
export class AppController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly appService: AppService) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Hi! Friend!');
    await ctx.reply('Что ты хочешь сделать?', actionButtons());
  }

  @Hears('📋 Список заметок')
  async listNotes(ctx: Context){
    await ctx.reply(allList(todos)) 
  }

}
