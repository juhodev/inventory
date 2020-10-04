export interface Item {
	id: number;
	name: string;
	count: number;
	info: string;
	location: string;
	img: string;
	lastUpdate: number;
	link: string;
	tags: string[];
}

export interface ItemComponentProps {
	item: Item;
	onClick: () => void;
	onTagClick: (tag: string) => void;
}

export interface ItemInfoComponentProps {
	item: Item;
}

export interface SortComponentProps {
	onChange: (sortType: SortType) => void;
}

export enum SortType {
	LAST_UPDATED = 'Last updated',
	NAME = 'Name',
	LOCATION = 'Location',
}

export interface SearchComponentProps {
	value: string;
	onChange: (search: string) => void;
}

export interface ManageSidebarComponentProps {
	onChange: (tab: string) => void;
}

export interface TextInputComponentProps {
	title: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
}

export interface TextAreaComponentProps {
	title: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
}

export interface TagSelectorComponentProps {
	onChange: (tags: string[]) => void;
	tags: string[];
}

export interface SmallItemComponentProps {
	item: Item;
	onClick: () => void;
}

export interface NewItem {
	name: string;
	location: string;
	count: number;
	link: string;
	info: string;
	tags: string[];
}

export interface ItemInventoryResponse {
	error: boolean;
	message: string;
}
