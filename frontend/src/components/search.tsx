import * as React from 'react';
import { SearchComponentProps } from './types';

const { useState } = React;

const SearchComponent = (props: SearchComponentProps) => {
	const [search, setSearch] = useState('');
	const { onChange } = props;

	return (
        <div className="flex flex-grow justify-center">
            <input
                className="border border-grey-200 h-10 p-2 font-body rounded w-80"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    const { value } = e.target;
    
                    setSearch(value);
                    onChange(value);
                }}
            />
        </div>
	);
};

export default SearchComponent;
