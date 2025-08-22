/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import type {RouteFull} from '@/routes/types.ts';

import {RoleName} from '@/services/types.ts';

export const adminSection: RouteFull = {
    lazy: () => import('@/entities/users/UsersList.tsx'),
    index: true,
    handle: {
        title: 'Пользователи',
        role: [RoleName.ADMIN],
    },
};
