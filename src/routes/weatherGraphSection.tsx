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
};
