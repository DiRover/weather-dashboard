/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import type {AxiosResponse} from 'axios';

import {useQuery} from '@tanstack/react-query';
import {bin} from 'd3-array';
import {useAtomValue} from 'jotai/index';
import {memo, useMemo} from 'react';

import type {TemperatureDTO} from '@/entities/weather-graph/type.ts';

import {graphAtom} from '@/entities/atoms/graph.ts';
import BaseChart from '@/entities/weather-graph/BaseChart.tsx';
import DateField from '@/entities/weather-graph/controls/DateField.tsx';
import {GRAPH_URL} from '@/entities/weather-graph/helpers/constants.ts';
import {getParams} from '@/entities/weather-graph/helpers/getParams.ts';

const graphName = 'histogram';

//Компонент для отображения Гистограммы

export const Component = memo(() => {
    //беру параметры из стора
    const graphParams = useAtomValue(graphAtom(graphName));

    //преобразую их для отправки в запросе
    const currentParams = useMemo(() => getParams(graphParams), [graphParams]);

    //сам запрос
    const {data} = useQuery<AxiosResponse<TemperatureDTO>>({
        queryKey: [GRAPH_URL, currentParams],
    });

    //обрабатываю ответ
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
        const y = bars.map(bin => bin.length); //достаю значения для баров

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

    return (
        <>
            <DateField graphName={graphName} />

            <BaseChart options={options} />
        </>
    );
});
