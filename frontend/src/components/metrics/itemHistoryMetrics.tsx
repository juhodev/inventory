import * as React from 'react';
import { Line, ChartData } from 'react-chartjs-2';
import { chartjs } from 'chart.js';
import { ItemCount } from './types';
import { getMetrics } from '../../ts/api';
import { dateFormat } from '../../utils/timeUtils';

const { useState, useEffect } = React;

const ItemHistoryMetricsComponent = () => {
	const [itemCounts, setItemCounts] = useState<ItemCount[]>([]);

	useEffect(() => {
		fetchMetrics();
	}, []);

	const fetchMetrics = async () => {
		const { itemCountHistory } = await getMetrics();
		setItemCounts(itemCountHistory);
	};

	const labels: string[] = [];
	const createDataset = (name: string) => {
		return {
			label: name,
			fill: false,
			lineTension: 0.1,
			backgroundColor: '#edf2f7',
			data: [],
		};
	};

	const uniqueItemsDataset = createDataset('Unique items');
	const totalItemsDataset = createDataset('Total items');

	for (const item of itemCounts) {
		const { time, uniqueItems, totalItems } = item;

		labels.push(dateFormat(new Date(time)));
		uniqueItemsDataset.data.push(uniqueItems);
		totalItemsDataset.data.push(totalItems);
	}

	const data: ChartData<chartjs.ChartData> = {
		datasets: [uniqueItemsDataset, totalItemsDataset],
		labels,
	};

	return (
		<div className="container p-6 font-body">
			<div className="flex flex-col">
				<span className="text-3xl text-blue-500">
					Item quantity history
				</span>
				<Line data={data} />
			</div>
		</div>
	);
};

export default ItemHistoryMetricsComponent;
