import { Module } from '@nestjs/common';
import { GithubResolver } from './github.resolver';
import { GithubService } from './github.service';

@Module({
	imports: [],
	providers: [GithubService, GithubResolver]
})
export class GithubModule {}
