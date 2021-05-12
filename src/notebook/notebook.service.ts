import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, CreateNoteInput } from 'src/graphql';
import { NoteDocument } from './note.schema';

@Injectable()
export class NotebookService {
	constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

	async all(): Promise<Note[]> {
		return this.noteModel.find().exec();
	}

	async create(input: CreateNoteInput): Promise<Note> {
		const newNoteId = await this.noteModel.find().count();
		const newNote = { id: newNoteId.toString(), ...input };
		const createdNote = new this.noteModel(newNote);

		return createdNote.save();
	}
}
