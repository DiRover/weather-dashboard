/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import {useQuery} from '@tanstack/react-query';
import {memo, useMemo} from 'react';

import type {TemperatureDTO} from '@/entities/weather-graph/type.ts';

import BaseChart from '@/entities/weather-graph/base-chart/BaseChart.tsx';

const params = {
    latitude: 55.7522,
    longitude: 37.6156,
    start_date: '2025-07-01',
    end_date: '2025-07-08',
    daily: 'temperature_2m_mean',
    timezone: 'auto',
};

const url = 'https://archive-api.open-meteo.com/v1/archive';

// утилита для скользящей средней
function movingAverage(data: number[], windowSize: number) {
    return data.map((_, i, arr) => {
        const start = Math.max(0, i - windowSize + 1);
        const subset = arr.slice(start, i + 1);
        return subset.reduce((a, b) => a + b, 0) / subset.length;
    });
}

export const Component = memo(() => {
    const {data} = useQuery<{data: TemperatureDTO}>({
        queryKey: [url, params],
    });

    const {dates, temps, tempUnit} = useMemo(
        () => ({
            dates: data?.data.daily.time ?? [],
            temps: data?.data.daily.temperature_2m_mean ?? [],
            tempUnit: data?.data.daily_units.temperature_2m_mean ?? '°C',
        }),
        [data],
    );

    // вычисляем скользящую среднюю с окном 3 дня
    const maTemps = useMemo(() => movingAverage(temps, 3), [temps]);

    const options = useMemo(
        () => ({
            tooltip: {
                trigger: 'axis',
                formatter: (
                    params: {
                        axisValue: string;
                        seriesName: string;
                        value: number;
                    }[],
                ) =>
                    params
                        .map(
                            p =>
                                `<div><strong>${p.seriesName}</strong>: ${p.value.toFixed(1)}${tempUnit}</div>`,
                        )
                        .join(''),
            },
            legend: {
                data: ['Температура за 7 дней', 'Скользящая средняя (3 дня)'],
                top: 10,
            },
            grid: {left: 40, right: 16, top: 50, bottom: 40},
            xAxis: {
                type: 'category',
                data: dates,
                boundaryGap: false,
                axisLabel: {rotate: 45},
            },
            yAxis: {
                type: 'value',
                name: tempUnit,
                nameGap: 10,
                splitLine: {show: true},
            },
            series: [
                {
                    name: 'Температура за 7 дней',
                    type: 'line',
                    data: temps,
                    smooth: true,
                    showSymbol: true,
                    symbolSize: 6,
                    lineStyle: {width: 2, color: '#5470c6'},
                    itemStyle: {color: '#5470c6'},
                },
                {
                    name: 'Скользящая средняя (3 дня)',
                    type: 'line',
                    data: maTemps,
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {width: 2, color: '#91cc75'},
                    itemStyle: {color: '#91cc75'},
                },
            ],
        }),
        [dates, temps, maTemps, tempUnit],
    );

    return <BaseChart options={options} />;
});
