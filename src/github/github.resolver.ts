import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Repository } from 'src/graphql';
import { GithubService } from './github.service';

@Resolver()
export class GithubResolver {
	constructor(private githubService: GithubService) {}

	@Query('repositories')
	@UseGuards(GqlAuthGuard)
	async getRepositories(): Promise<Repository[]> {
		const repositories = await this.githubService.getRepositories();

		const processedRepositories = repositories.map(async repository => ({
			name: repository.name,
			description: repository.description,
			owner: repository.owner.login,
			private: repository.private,
			pullRequests: (
				await this.githubService.getRepositoryPullRequests(
					repository.pulls_url.split('{')[0]
				)
			).map(async pullRequest => await this.processPullRequest(pullRequest))
		}));

		return processedRepositories as Repository[];
	}

	async processPullRequest(pullRequest) {
		return {
			title: pullRequest.title,
			author: pullRequest.user.login,
			body: pullRequest.body,
			serialNumber: pullRequest.number,
			state: pullRequest.state,
			isDraft: pullRequest.draft,
			createdAt: pullRequest.created_at,
			updatedAt: pullRequest.updated_at,
			mergedAt: pullRequest.merged_at,
			closedAt: pullRequest.closed_at,
			comments: (
				await this.githubService.getPullRequestComments(
					pullRequest.review_comments_url
				)
			).map(comment => this.processPullRequestComment(comment))
		};
	}

	processPullRequestComment(comment) {
		return {
			author: comment.user.login,
			body: comment.body,
			createdAt: comment.created_at
		};
	}
}
