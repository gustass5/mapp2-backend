import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteInput } from 'src/graphql';
import { NoteDocument } from './note.schema';

@Injectable()
export class NotebookService {
	constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

	async all(): Promise<Note[]> {
		return this.noteModel.find({ deleted: false }).exec();
	}

	async getSingle(id: number): Promise<Note[]> {
		return this.noteModel.find({ id, deleted: false }).exec();
	}

	async create(input: NoteInput): Promise<Note> {
		const newNoteId = await this.noteModel.find().count();
		const newNote = { id: newNoteId, deleted: false, ...input };
		const createdNote = new this.noteModel(newNote);

		return createdNote.save();
	}

	async update(input: NoteInput): Promise<Note> {
		const { id, headline, content, updateDate } = input;

		const updateInfo = {
			headline,
			content,
			updateDate
		};

		const updatedNote = await this.noteModel.findOneAndUpdate({ id }, updateInfo, {
			new: true
		});

		if (updatedNote === null) {
			throw new Error('Note not found');
		}

		return updatedNote;
	}

	async delete(id: number): Promise<Note> {
		const deletedNote = await this.noteModel.findOneAndUpdate(
			{ id },
			{ deleted: true },
			{
				new: true
			}
		);

		if (deletedNote === null) {
			throw new Error('Note not found');
		}

		return deletedNote;
	}
}
