import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { NoteInput, Note } from 'src/graphql';
import { NotebookService } from './notebook.service';

@Resolver('Notebook')
export class NotebookResolver {
	constructor(private notebookService: NotebookService) {}

	@Query('notes')
	@UseGuards(GqlAuthGuard)
	async getNotes(@Args('id') id: number): Promise<Note[]> {
		if (id !== undefined) {
			return await this.notebookService.getSingle(id);
		}
		return await this.notebookService.all();
	}

	@Mutation('createNote')
	@UseGuards(GqlAuthGuard)
	async createNote(@Args('input') input: NoteInput): Promise<Note> {
		const newNote = await this.notebookService.create(input);
		return newNote;
	}

	@Mutation('updateNote')
	@UseGuards(GqlAuthGuard)
	async updateNote(@Args('input') input: NoteInput): Promise<Note> {
		const updatedNote = await this.notebookService.update(input);
		return updatedNote;
	}

	@Mutation('deleteNote')
	@UseGuards(GqlAuthGuard)
	async deleteNote(@Args('id') id: number): Promise<Note> {
		const deletedNote = await this.notebookService.delete(id);
		return deletedNote;
	}
}
