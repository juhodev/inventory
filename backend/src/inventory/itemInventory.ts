import { Item, ItemInventoryFullData, ItemInventoryResponse } from './types';
import * as fs from 'fs';

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
			name,
			count,
			info,
			location,
			img,
			link,
			lastUpdate: new Date().getTime(),
			tags: [],
		});

		this.writeToDisk();

		return {
			error: false,
			message: `Item ${name} added to the database`,
		};
	}

	setInfo(itemName: string, info: string): ItemInventoryResponse {
		return this.updateItem(itemName, 'info', info);
	}

	setLocation(itemName: string, location: string): ItemInventoryResponse {
		return this.updateItem(itemName, 'location', location);
	}

	setImg(itemName: string, img: string): ItemInventoryResponse {
		return this.updateItem(itemName, 'img', img);
	}

	setCount(itemName: string, count: number): ItemInventoryResponse {
		return this.updateItem(itemName, 'count', count);
	}

	getAll() {
		const itemsArray: Item[] = [];
		for (const item of this.items.values()) {
			itemsArray.push(item);
		}

		return itemsArray;
	}

	private updateItem(
		itemName: string,
		key: string,
		value: any,
	): ItemInventoryResponse {
		if (!this.items.has(itemName)) {
			return {
				error: true,
				message: `Item ${itemName} isn't in the database`,
			};
		}

		const item: Item = this.items.get(itemName);
		item[key] = value;

		this.items.set(item.name, item);
		this.writeToDisk();

		return {
			error: false,
			message: `Item ${itemName} updated`,
		};
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
