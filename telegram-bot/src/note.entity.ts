import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Note' })
export class NoteEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	name: string

	@Column({ default: false })
	status: boolean
}
