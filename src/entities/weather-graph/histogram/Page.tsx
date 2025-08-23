/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import type {AxiosResponse} from 'axios';

import {useQuery} from '@tanstack/react-query';
import {bin} from 'd3-array';
import {memo, useMemo} from 'react';

import type {TemperatureDTO} from '@/entities/weather-graph/type.ts';

import BaseChart from '@/entities/weather-graph/base-chart/BaseChart.tsx';

const params = {
    latitude: 55.7522,
    longitude: 37.6156,
    start_date: '2025-07-01',
    end_date: '2025-07-31',
    daily: 'temperature_2m_mean',
    timezone: 'auto',
};

const url = 'https://archive-api.open-meteo.com/v1/archive';

export const Component = memo(() => {
    const {data} = useQuery<AxiosResponse<TemperatureDTO>>({
        queryKey: [url, params],
    });

    const {temps, tepUnit} = useMemo(
        () => ({
            temps: data?.data.daily.temperature_2m_mean ?? [],
            tepUnit: data?.data.daily_units.temperature_2m_mean,
        }),
        [data],
    );

    const {x, y} = useMemo(() => {
        if (!temps.length) {
            return {x: [], y: []};
        }

        // Создаём гистограмму с интервалами, библиотека сама там всё делает, считает и тд
        const histogram = bin()
            .domain([Math.min(...temps), Math.max(...temps)]) // диапазон температур
            .thresholds(10); // количество столбов (будет -1)

        const bars = histogram(temps);

        // Преобразуем для echarts
        const x = bars.map(
            bin => `${bin.x0?.toFixed(0)}–${bin.x1?.toFixed(0)}`, //просто округляю значения температуры для лэйбла
        );
        const y = bars.map(bin => bin.length);

        return {x, y};
    }, [temps]);

    const options = useMemo(
        () => ({
            tooltip: {trigger: 'axis'},
            grid: {left: 40, right: 16, top: 24, bottom: 40},
            xAxis: {
                type: 'category',
                data: x,
                axisLabel: {rotate: 45},
            },
            yAxis: {
                type: 'value',
                name: `Кол-во дней`,
                splitLine: {show: true},
            },
            series: [
                {
                    name: `Температура (${tepUnit})`,
                    type: 'bar',
                    data: y,
                    itemStyle: {opacity: 0.8},
                },
            ],
        }),
        [tepUnit, x, y],
    );

    return <BaseChart options={options} />;
});
