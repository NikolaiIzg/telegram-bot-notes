import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from './note.entity';


@Injectable()
export class AppService {
 
  constructor(
		@InjectRepository(NoteEntity)
		private readonly notesRepository: Repository<NoteEntity>
	) {}
  
  async getAll() {
    return this.notesRepository.find()
  }

  async getById(id: number) {
    return this.notesRepository.findOneBy({id})
  }

  async newNote(name: string) {
    const note = await this.notesRepository.create({name})
    await this.notesRepository.save(note)
    return this.getAll()
  }

  async doneNote(id: number) {
    const note = await this.getById(id)
    if(!note) return null
    note.status = !note.status
    await this.notesRepository.save(note)
    return this.getAll()
  }

  async editNote(id: number, name: string) {
    const note = await this.getById(id)
    if(!note) return null
    note.name = name
    await this.notesRepository.save(note)
    return this.getAll()
  }

  async deleteNote(id: number) {
    const note = await this.getById(id)
    if(!note) return null
    await this.notesRepository.delete({id})
    return this.getAll()
  }
}
