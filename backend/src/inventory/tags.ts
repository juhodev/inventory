import { TagResponse } from './types';
import * as fs from 'fs';

export default class Tags {
	private tags: string[];

	constructor() {
		this.tags = [];
	}

	load() {
		if (!fs.existsSync('data/tags.json')) {
			if (!fs.existsSync('data')) {
				fs.mkdirSync('data');
			}

			this.writeToDisk();
			return;
		}

		const fileString: string = fs.readFileSync('data/tags.json', 'utf-8');
		const fullData: string[] = JSON.parse(fileString);

		this.tags = fullData;
	}

	add(tag: string): TagResponse {
		if (tag === undefined) {
			return {
				error: true,
				message: `The tag can't be undefined!`,
			};
		}

		const upperCaseTag: string = tag.toUpperCase();

		if (this.tags.includes(upperCaseTag)) {
			return {
				error: true,
				message: `Tag ${upperCaseTag} already exists`,
			};
		}

		this.tags.push(upperCaseTag);
		this.writeToDisk();

		return {
			error: false,
			message: `Tag ${upperCaseTag} added`,
		};
	}

	getAll(): string[] {
		return this.tags.sort();
	}

	private writeToDisk() {
		fs.writeFileSync('data/tags.json', JSON.stringify(this.tags));
	}
}
