import ItemInventory from './inventory/itemInventory';
import Tags from './inventory/tags';

export default class ItemManager {
	private inventory: ItemInventory;
	private tags: Tags;

	constructor() {
		this.inventory = new ItemInventory();
		this.tags = new Tags();
	}

	load() {
		this.inventory.load();
	}

	getInventory(): ItemInventory {
		return this.inventory;
	}

	getTags(): Tags {
		return this.tags;
	}
}
