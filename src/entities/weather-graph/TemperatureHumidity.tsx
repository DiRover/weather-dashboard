/**
 * Created by ROVENSKIY D.A. on 23.08.2025
 */
import type {AxiosResponse} from 'axios';

import {useQuery} from '@tanstack/react-query';
import {memo, useMemo} from 'react';

import type {TemperatureAndHumidityDTO} from '@/entities/weather-graph/type.ts';

import BaseChart from '@/entities/weather-graph/BaseChart.tsx';

const params = {
    latitude: 55.7522,
    longitude: 37.6156,
    start_date: '2025-08-01',
    end_date: '2025-08-23',
    hourly: ['relative_humidity_2m', 'temperature_2m'],
    timezone: 'auto',
};

const url = 'https://archive-api.open-meteo.com/v1/archive';

export const Component = memo(() => {
    const {data} = useQuery<AxiosResponse<TemperatureAndHumidityDTO>>({
        queryKey: [url, params],
    });

    const {dates, temps, tepUnit, humidity, humidityUnit} = useMemo(
        () => ({
            dates: data?.data.hourly.time ?? [],
            temps: data?.data.hourly.temperature_2m ?? [],
            tepUnit: data?.data.hourly_units.temperature_2m ?? '°C',
            humidity: data?.data.hourly.relative_humidity_2m ?? [],
            humidityUnit: data?.data.hourly_units.relative_humidity_2m ?? '%',
        }),
        [data],
    );

    const options = useMemo(
        () => ({
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'cross'},
            },
            legend: {
                data: ['Температура', 'Влажность'],
                top: 10,
            },
            grid: {left: 40, right: 60, top: 50, bottom: 40},
            xAxis: {
                type: 'category',
                data: dates,
                boundaryGap: false,
                axisLabel: {
                    rotate: 45,
                    formatter: (value: string) => value.split('T')[0], // форматирую дату, только в этом запросе со временем приходит
                },
            },
            yAxis: [
                {
                    type: 'value',
                    name: tepUnit,
                    position: 'left',
                    nameGap: 10,
                    splitLine: {show: true},
                },
                {
                    type: 'value',
                    name: humidityUnit,
                    position: 'right',
                    nameGap: 10,
                    splitLine: {show: false},
                },
            ],
            series: [
                {
                    name: 'Температура',
                    type: 'line',
                    data: temps,
                    yAxisIndex: 0,
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {width: 2, color: '#5470c6'},
                    areaStyle: {opacity: 0.1, color: '#5470c6'},
                },
                {
                    name: 'Влажность',
                    type: 'line',
                    data: humidity,
                    yAxisIndex: 1,
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {width: 2, color: '#91cc75'},
                    areaStyle: {opacity: 0.05, color: '#91cc75'},
                },
            ],
        }),
        [dates, temps, tepUnit, humidity, humidityUnit],
    );

    return <BaseChart options={options} />;
});
