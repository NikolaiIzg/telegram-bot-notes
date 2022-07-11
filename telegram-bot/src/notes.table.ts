import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Notes'})
export class NotesTable {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'text'})
  name: string

  @Column()
  status: boolean
}
