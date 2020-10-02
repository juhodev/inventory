import * as React from 'react';
import { Line, ChartData } from 'react-chartjs-2';
import { chartjs } from 'chart.js';
import { ItemCount } from './types';

const { useState, useEffect } = React;

const ItemHistoryMetricsComponent = () => {
	const [itemCounts, setItemCounts] = useState<ItemCount[]>([]);

    const labels: string[] = [];
    const datasets = [];

	for (const item of itemCounts) {
		labels.push(new Date(item.time).toString());
    }

	const data: ChartData<chartjs.ChartData> = {
		labels: [],
		datasets: [],
	};

	return (
		<div>
			<Line data={data} />
		</div>
	);
};

export default ItemHistoryMetricsComponent;
