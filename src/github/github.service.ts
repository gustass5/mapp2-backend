import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRepository } from './helpers/GithubData';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');

@Injectable()
export class GithubService {
	constructor(private readonly configService: ConfigService) {}

	async getRepositories(): Promise<IRepository[]> {
		const response = await fetch(
			'https://api.github.com/user/repos?sort=updated&direction=desc',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${this.configService.get<string>(
						'GITHUB_TOKEN'
					)}`
				}
			}
		);

		const data = await response.json();

		return data;
	}

	async getRepositoryPullRequests(url: string) {
		const response = await fetch(`${url}?state=all&per_page=5`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${this.configService.get<string>(
					'GITHUB_TOKEN'
				)}`
			}
		});

		const data = await response.json();

		return data;
	}

	async getPullRequestComments(url: string) {
		const response = await fetch(`${url}?per_page=5`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${this.configService.get<string>(
					'GITHUB_TOKEN'
				)}`
			}
		});

		const data = await response.json();

		return data;
	}
}
