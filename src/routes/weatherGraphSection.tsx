/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import type {RouteFull} from '@/routes/types.ts';

import {commonAccess} from '@/routes/access.ts';

export const weatherGraphSection: RouteFull = {
    lazy: () => import('@/entities/weather-graph/Page.tsx'),
    path: '/graph',
    handle: {
        title: 'Погодные графики',
        role: commonAccess,
    },
    children: [
        {
            index: true,
            lazy: () => import('@/entities/weather-graph/LinearGraph.tsx'),
            handle: {
                title: 'Линейный график',
            },
        },
        {
            path: 'histogram',
            lazy: () => import('@/entities/weather-graph/Histogram.tsx'),
            handle: {
                title: 'Гистограмма',
            },
        },
        {
            path: 'moving-average',
            lazy: () => import('@/entities/weather-graph/MovingAverage'),
            handle: {
                title: 'График со скользящей средней',
            },
        },
        {
            path: 'temperature-humidity',
            lazy: () =>
                import('@/entities/weather-graph/TemperatureHumidity.tsx'),
            handle: {
                title: 'Температура и Влажность',
            },
        },
    ],
};
