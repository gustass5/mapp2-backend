import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NotebookModule } from 'src/notebook/notebook.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
// import { PluginsModule } from 'src/plugins/plugins.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot('mongodb://localhost/mapp2'),
		NotebookModule,
		AuthModule,
		UsersModule,
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
