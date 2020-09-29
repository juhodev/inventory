export interface Item {
	id: number;
	name: string;
	count: number;
	info: string;
	location: string;
	img: string;
	lastUpdate: number;
	link?: string;
}

export interface ItemComponentProps {
	item: Item;
	onClick: () => void;
}

export interface ItemInfoComponentProps {
	item: Item;
}

export interface SortComponentProps {
	onChange: (sortType: SortType) => void;
}

export enum SortType {
	LAST_UPDATED = 'Last updated',
}

export interface SearchComponentProps {
	onChange: (search: string) => void;
}
