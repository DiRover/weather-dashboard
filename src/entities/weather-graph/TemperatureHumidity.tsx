/**
 * Created by ROVENSKIY D.A. on 23.08.2025
 */
import type {AxiosResponse} from 'axios';

import {useQuery} from '@tanstack/react-query';
import {useAtomValue} from 'jotai/index';
import {memo, useMemo} from 'react';

import type {TemperatureAndHumidityDTO} from '@/entities/weather-graph/type.ts';

import {graphAtom} from '@/entities/atoms/graph.ts';
import BaseChart from '@/entities/weather-graph/BaseChart.tsx';
import DateField from '@/entities/weather-graph/controls/DateField.tsx';
import {GRAPH_URL} from '@/entities/weather-graph/helpers/constants.ts';
import {getParams} from '@/entities/weather-graph/helpers/getParams.ts';

const temperatureHumidityAdditionalParams = {
    hourly: ['relative_humidity_2m', 'temperature_2m'],
};

const graphName = 'temperature-humidity';

export const Component = memo(() => {
    const graphParams = useAtomValue(graphAtom(graphName));

    const currentParams = useMemo(() => {
        const commonParams = getParams(graphParams);
        const {daily, ...restCommonParams} = commonParams;

        return {...restCommonParams, ...temperatureHumidityAdditionalParams};
    }, [graphParams]);

    const {data} = useQuery<AxiosResponse<TemperatureAndHumidityDTO>>({
        queryKey: [GRAPH_URL, currentParams],
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

    return (
        <>
            <DateField graphName={graphName} />

            <BaseChart options={options} />
        </>
    );
});
