import { TagResponse } from './types';

export default class Tags {
	private tags: string[];

	constructor() {
		this.tags = [];
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
	}

	getAll(): string[] {
		return this.tags.sort();
	}
}
