import ItemInventory from '../inventory/itemInventory';
import { Item } from '../inventory/types';
import { ItemCount } from './types';
import * as fs from 'fs';

export default class ItemHistory {
	private itemCountHistory: ItemCount[];

	constructor() {
		this.itemCountHistory = [];
	}

	load() {
		if (!fs.existsSync('data/itemHistory.json')) {
			if (!fs.existsSync('data')) {
				fs.mkdirSync('data');
			}

			this.writeToDisk();
			return;
		}

		const fileString: string = fs.readFileSync(
			'data/itemHistory.json',
			'utf-8',
		);
		const fullData: ItemCount[] = JSON.parse(fileString);

		this.itemCountHistory = fullData;
	}

	update(inventory: ItemInventory) {
		const items: Item[] = inventory.getAll();

		// The user can't add duplicate items (two items with the SAME NAME)
		// so we can assume the items array length is the amount of unique items.
		const uniqueItems: number = items.length;

		// The totalItems sum is of ALL the item count's. Some small items
		// will inflate this but who cares still a neat metric I guess.
		let totalItems: number = 0;

        debugger;
		for (const item of items) {
			totalItems += item.count;
		}

		const lastItemCount: ItemCount = this.itemCountHistory[
			this.itemCountHistory.length - 1
		];

		// Check if no item counts have been updated. If the values are the same we can just ignore the update.
		if (
			lastItemCount !== undefined &&
			lastItemCount.uniqueItems === uniqueItems &&
			lastItemCount.totalItems === totalItems
		) {
			return;
		}

		const itemCount: ItemCount = {
			time: new Date().getTime(),
			uniqueItems,
			totalItems,
		};

		this.itemCountHistory.push(itemCount);
		this.writeToDisk();
	}

	private writeToDisk() {
		fs.writeFileSync(
			'data/itemHistory.json',
			JSON.stringify(this.itemCountHistory),
		);
	}
}
