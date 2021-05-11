import { Injectable } from '@nestjs/common';
import { Note, CreateNoteInput } from 'src/graphql';

@Injectable()
export class NotebookService {
	private notes: Note[] = [
		{
			id: 0,
			headline: 'Test0',
			content: 'content0',
			creationDate: '2021-05-11T20:22:16Z'
		},
		{
			id: 1,
			headline: 'Test1',
			content: 'conten1',
			creationDate: '2021-05-11T20:22:16Z'
		}
	];

	all() {
		return this.notes;
	}

	create(note: CreateNoteInput): Note {
		const newNote = { id: this.notes.length, ...note };
		this.notes = [...this.notes, newNote];

		return newNote;
	}
}
