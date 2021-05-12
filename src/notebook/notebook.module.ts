import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './note.schema';
import { NotebookResolver } from './notebook.resolver';
import { NotebookService } from './notebook.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
	providers: [NotebookService, NotebookResolver]
})
export class NotebookModule {}
