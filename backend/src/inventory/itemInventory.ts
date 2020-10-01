import { Item, ItemInventoryFullData, ItemInventoryResponse } from './types';
import * as fs from 'fs';
import { itemManager } from '..';

export default class ItemInventory {
	private items: Map<string, Item>;
	private itemIdCounter: number;

	constructor() {
		this.items = new Map();
		this.itemIdCounter = 0;
	}

	load() {
		if (!fs.existsSync('data/inventory.json')) {
			if (!fs.existsSync('data')) {
				fs.mkdirSync('data');
			}

			this.writeToDisk();
			return;
		}

		const fileString: string = fs.readFileSync(
			'data/inventory.json',
			'utf8',
		);
		const fullData: ItemInventoryFullData = JSON.parse(fileString);

		for (const item of fullData.items) {
			this.items.set(item.name, item);
		}

		this.itemIdCounter = fullData.itemIdCounter;

		// I should also update the history here because the inventory file
		// might have been edited before starting the server
		itemManager.getItemHistory().update(this);
	}

	add(
		name: string,
		info: string,
		location: string,
		img: string,
		count: number = 1,
		link: string,
		tags: string[],
	): ItemInventoryResponse {
		if (this.items.has(name)) {
			return {
				error: true,
				message: `Item ${name} already exists in the database!`,
			};
		}

		this.items.set(name, {
			id: this.itemIdCounter++,
			lastUpdate: new Date().getTime(),
			name,
			count,
			info,
			location,
			img,
			link,
			tags,
		});

		this.writeToDisk();
		itemManager.getItemHistory().update(this);

		return {
			error: false,
			message: `Item ${name} added to the database`,
		};
	}

	updateItem(
		id: number,
		name: string,
		info: string,
		location: string,
		img: string,
		count: number = 1,
		link: string,
		tags: string[],
	): ItemInventoryResponse {
		this.items.set(name, {
			lastUpdate: new Date().getTime(),
			id,
			name,
			count,
			info,
			location,
			img,
			link,
			tags,
		});

		this.writeToDisk();
		itemManager.getItemHistory().update(this);

		return {
			error: false,
			message: `Item ${name} updated`,
		};
	}

	getAll() {
		const itemsArray: Item[] = [];
		for (const item of this.items.values()) {
			itemsArray.push(item);
		}

		return itemsArray;
	}

	private writeToDisk() {
		const items: Item[] = [];

		for (const item of this.items.values()) {
			items.push(item);
		}

		const diskFormat: ItemInventoryFullData = {
			itemIdCounter: this.itemIdCounter,
			items,
		};

		fs.writeFileSync('data/inventory.json', JSON.stringify(diskFormat));
	}
}
