/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import type {AxiosResponse} from 'axios';

import {useQuery} from '@tanstack/react-query';
import {LineChart} from 'echarts/charts';
import {
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    GridComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import {LabelLayout} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';
import {memo, useEffect, useMemo, useRef} from 'react';

import type {WeatherDTO} from '@/entities/weather-graph/type.ts';

const params = {
    latitude: 55.7522,
    longitude: 37.6156,
    start_date: '2025-07-01',
    end_date: '2025-07-31',
    daily: 'temperature_2m_mean',
    timezone: 'auto',
};

const url = 'https://archive-api.open-meteo.com/v1/archive';

echarts.use([
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    CanvasRenderer,
    LabelLayout,
]);

export const Component = memo(() => {
    const container = useRef<HTMLDivElement | null>(null);
    const chart = useRef<ReturnType<typeof echarts.init>>(null);

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

    useEffect(() => {
        if (container.current && !chart.current) {
            chart.current = echarts.init(container.current);
        }

        return () => {
            if (chart.current) {
                chart.current.dispose();
                chart.current = null;
                container.current = null;
            }
        };
    }, []);

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

    useEffect(() => {
        if (chart.current) {
            chart.current.setOption(options);
        }
    }, [options]);

    return <div ref={container} className="h-96 w-full" />;
});
