import { Module } from '@nestjs/common';
import { NotebookResolver } from './notebook.resolver';
import { NotebookService } from './notebook.service';

@Module({
	providers: [NotebookService, NotebookResolver]
})
export class NotebookModule {}
