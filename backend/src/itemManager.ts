import ItemInventory from './inventory/itemInventory';
import Tags from './inventory/tags';
import ItemHistory from './metrics/itemHistory';

export default class ItemManager {
	private inventory: ItemInventory;
	private tags: Tags;
	private itemHistory: ItemHistory;

	constructor() {
		this.inventory = new ItemInventory();
		this.tags = new Tags();
		this.itemHistory = new ItemHistory();
	}

	load() {
		this.inventory.load();
		this.tags.load();
		this.itemHistory.load();
	}

	getInventory(): ItemInventory {
		return this.inventory;
	}

	getTags(): Tags {
		return this.tags;
	}

	getItemHistory(): ItemHistory {
		return this.itemHistory;
	}
}
