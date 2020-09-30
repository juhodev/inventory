export interface Item {
	id: number;
	name: string;
	count: number;
	info: string;
	location: string;
	img: string;
	lastUpdate: number;
	link: string;
}

export interface ItemInventoryResponse {
	error: boolean;
	message: string;
}

export interface ItemInventoryFullData {
	itemIdCounter: number;
	items: Item[];
}

export interface TagResponse {
	error: boolean;
	message: string;
}
