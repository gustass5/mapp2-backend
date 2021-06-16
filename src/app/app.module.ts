import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NotebookModule } from 'src/notebook/notebook.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { GithubModule } from 'src/github/github.module';
// import { PluginsModule } from 'src/plugins/plugins.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGODB_URI')
			}),
			inject: [ConfigService]
		}),
		NotebookModule,
		GithubModule,
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
