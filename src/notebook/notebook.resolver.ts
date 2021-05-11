import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNoteInput, Note } from 'src/graphql';
import { NotebookService } from './notebook.service';

@Resolver('Notebook')
export class NotebookResolver {
	constructor(private notebookService: NotebookService) {}

	@Query('notes')
	async getNotes(): Promise<Note[]> {
		return await this.notebookService.all();
	}

	@Mutation('createNote')
	async createNote(@Args('input') noteData: CreateNoteInput): Promise<Note> {
		const newNote = await this.notebookService.create(noteData);
		return newNote;
	}
}
