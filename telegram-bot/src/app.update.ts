import { Ctx, Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { allList } from './app.allList';
import { actionButtons } from './app.buttons';
import { AppService } from './app.service';
import { Context } from './context.interface';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>, 
    private readonly appService: AppService
    ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Hello! Friend 👋🏼');
    await ctx.reply('Меня зовут Notes Bot - я помогу тебе хранить заметки. Желаю приятного пользования ☺️');
    await ctx.reply('Что ты хочешь сделать?', actionButtons());
  }

  @Hears('⚡️ Создать задачу')
  async creatNote(ctx: Context) {
    ctx.session.type = 'create'
    await ctx.deleteMessage()
    await ctx.reply('Напиши заметку:')
  }

  @Hears('📋 Список заметок')
  async listNotes(ctx: Context){
    const notes = await this.appService.getAll()
    console.log(notes);
    await ctx.deleteMessage()
    await ctx.reply(allList(notes)) 
  }

  @Hears('✅ Завершить')
  async doneNote(ctx: Context) {
    ctx.session.type = 'done'
    await ctx.deleteMessage()
    await ctx.reply('Напиши № заметки:')
  }

  @Hears('✏️ Редактирование')
  async editNote(ctx: Context) {
    ctx.session.type = 'edit'
    await ctx.deleteMessage()
    await ctx.replyWithHTML(
			'Напиши № и новое название задачи: \n\n' +
				'В формате - <b>1: Новое название</b>'
		)
  }

  @Hears('❌ Удаление')
  async deleteNote(ctx: Context) {
    ctx.session.type = 'remove'
    await ctx.deleteMessage()
    await ctx.reply('Напиши № заметки:')
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
   if(!ctx.session.type) return

   if(ctx.session.type === 'create') {
    const note = await this.appService.newNote(message)
      await ctx.reply(allList(note))
   }

   if(ctx.session.type === 'done') {
    const note = await this.appService.doneNote(Number(message))


      if(!note) {
        console.log('зашёл');
        await ctx.deleteMessage()
        await ctx.reply('Задач с таким № не найдено')
        return
    }
    await ctx.reply(allList(note))
   }

   if(ctx.session.type === 'remove') {
    const note = await this.appService.deleteNote(Number(message))

      if(!note) {
      console.log('зашёл');
      await ctx.deleteMessage()
      await ctx.reply('Задач с таким № не найдено')
      return
     }   
    await ctx.reply(allList(note))
   }

   if(ctx.session.type === 'edit') {
    const [noteId, noteName] = message.split(': ')
    const note = await this.appService.editNote(Number(noteId), noteName)

     if(!note) {
       console.log('зашёл');
       await ctx.deleteMessage()
       await ctx.reply('Задач с таким № не найдено')
       return
     }
      await ctx.reply(allList(note))
   }
  }
}
