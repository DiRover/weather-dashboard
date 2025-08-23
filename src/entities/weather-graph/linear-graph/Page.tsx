/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import type {AxiosResponse} from 'axios';

import {useQuery} from '@tanstack/react-query';
import {memo, useMemo} from 'react';

import type {WeatherDTO} from '@/entities/weather-graph/type.ts';

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
    const {data} = useQuery<AxiosResponse<WeatherDTO>>({
        queryKey: [url, params],
    });

    const {dates, temps, tepUnit} = useMemo(
        () => ({
            dates: data?.data.daily.time ?? [],
            temps: data?.data.daily.temperature_2m_mean ?? [],
            tepUnit: data?.data.daily_units.temperature_2m_mean,
        }),
        [data],
    );

    const options = useMemo(
        () => ({
            tooltip: {trigger: 'axis'},
            grid: {left: 40, right: 16, top: 24, bottom: 40},
            xAxis: {
                type: 'category',
                data: dates,
                boundaryGap: false,
                axisLabel: {rotate: 45},
            },
            yAxis: {
                type: 'value',
                name: tepUnit,
                nameGap: 10,
                splitLine: {show: true},
            },
            series: [
                {
                    name: 'Средняя температура',
                    type: 'line',
                    data: temps,
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {width: 2},
                    areaStyle: {opacity: 0.1},
                },
            ],
        }),
        [dates, temps, tepUnit],
    );

    return <BaseChart options={options} />;
});
