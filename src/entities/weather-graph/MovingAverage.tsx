/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import {useQuery} from '@tanstack/react-query';
import {useAtomValue} from 'jotai/index';
import {memo, useMemo} from 'react';

import type {GraphParams} from '@/entities/atoms/graph.ts';
import type {TemperatureDTO} from '@/entities/weather-graph/type.ts';

import {graphAtom} from '@/entities/atoms/graph.ts';
import BaseChart from '@/entities/weather-graph/BaseChart.tsx';
import DateField from '@/entities/weather-graph/controls/DateField.tsx';
import WindowField from '@/entities/weather-graph/controls/WindowField.tsx';
import {GRAPH_URL} from '@/entities/weather-graph/helpers/constants.ts';
import {getParams} from '@/entities/weather-graph/helpers/getParams.ts';

// утилита для скользящей средней
function movingAverage(data: number[], windowSize?: GraphParams['window']) {
    let window = windowSize;
    if (typeof window !== 'number') {
        //делаю всегда по умолчанию окно равным 3
        window = 3;
    }
    return data.map((_, i, arr) => {
        const start = Math.max(0, i - window + 1);
        const subset = arr.slice(start, i + 1);
        return subset.reduce((a, b) => a + b, 0) / subset.length;
    });
}

const graphName = 'moving-average';

export const Component = memo(() => {
    const graphParams = useAtomValue(graphAtom(graphName));

    // поле window в запрос не попадает
    const currentParams = useMemo(
        () => getParams(graphParams?.period?.[0], graphParams?.period?.[1]),
        [graphParams],
    );

    const {data} = useQuery<{data: TemperatureDTO}>({
        queryKey: [GRAPH_URL, currentParams],
    });

    const {dates, temps, tempUnit} = useMemo(
        () => ({
            dates: data?.data.daily.time ?? [],
            temps: data?.data.daily.temperature_2m_mean ?? [],
            tempUnit: data?.data.daily_units.temperature_2m_mean ?? '°C',
        }),
        [data],
    );

    // вычисляем скользящую среднюю с окном
    const maTemps = useMemo(
        () => movingAverage(temps, graphParams?.window),
        [graphParams, temps],
    );

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
                data: [
                    'Температура за период',
                    `Скользящая средняя (${graphParams?.window ?? 3} дня)`,
                ],
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
                    name: 'Температура за период',
                    type: 'line',
                    data: temps,
                    smooth: true,
                    showSymbol: true,
                    symbolSize: 6,
                    lineStyle: {width: 2, color: '#5470c6'},
                    itemStyle: {color: '#5470c6'},
                },
                {
                    name: `Скользящая средняя (${graphParams?.window ?? 3} дня)`,
                    type: 'line',
                    data: maTemps,
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {width: 2, color: '#91cc75'},
                    itemStyle: {color: '#91cc75'},
                },
            ],
        }),
        [graphParams, dates, tempUnit, temps, maTemps],
    );

    return (
        <>
            <DateField
                graphName={graphName}
                extra={<WindowField graphName={graphName} />}
            />

            <BaseChart options={options} />
        </>
    );
});
