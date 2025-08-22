/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import type {RouteFull} from '@/routes/types.ts';

import {RoleName} from '@/services/types.ts';

export const weatherGraphSection: RouteFull = {
    lazy: () => import('@/entities/linear-graph/Page.tsx'),
    path: '/graph',
    handle: {
        title: 'Линейный график',
        role: [RoleName.ADMIN, RoleName.USER],
    },
};
