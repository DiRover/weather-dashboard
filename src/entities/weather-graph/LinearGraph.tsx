/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import type {AxiosResponse} from 'axios';

import {useQuery} from '@tanstack/react-query';
import {useAtomValue} from 'jotai';
import {memo, useMemo} from 'react';

import type {TemperatureDTO} from '@/entities/weather-graph/type.ts';

import {graphAtom} from '@/entities/atoms/graph.ts';
import BaseChart from '@/entities/weather-graph/BaseChart.tsx';
import DateField from '@/entities/weather-graph/controls/DateField.tsx';
import {GRAPH_URL} from '@/entities/weather-graph/helpers/constants.ts';
import {getParams} from '@/entities/weather-graph/helpers/getParams.ts';

const graphName = 'linear-graph';

export const Component = memo(() => {
    const graphParams = useAtomValue(graphAtom(graphName));

    const currentParams = useMemo(() => getParams(graphParams), [graphParams]);

    const {data} = useQuery<AxiosResponse<TemperatureDTO>>({
        queryKey: [GRAPH_URL, currentParams],
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

    return (
        <>
            <DateField graphName={graphName} />

            <BaseChart options={options} />
        </>
    );
});
