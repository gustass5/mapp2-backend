import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateNoteInput, Note } from 'src/graphql';
import { NotebookService } from './notebook.service';

@Resolver('Notebook')
export class NotebookResolver {
	constructor(private notebookService: NotebookService) {}

	@Query('notes')
	@UseGuards(GqlAuthGuard)
	async getNotes(): Promise<Note[]> {
		return await this.notebookService.all();
	}

	@Mutation('createNote')
	@UseGuards(GqlAuthGuard)
	async createNote(@Args('input') input: CreateNoteInput): Promise<Note> {
		const newNote = await this.notebookService.create(input);
		return newNote;
	}
}
