import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NotebookModule } from 'src/notebook/notebook.module';
// import { PluginsModule } from 'src/plugins/plugins.module';

@Module({
	imports: [
		NotebookModule,
		// PluginsModule,
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class'
			}
		})
	]
})
export class AppModule {}
