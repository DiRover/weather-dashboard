/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import type {RouteFull} from '@/routes/types.ts';

import {adminAccess} from '@/routes/access.ts';

export const adminSection: RouteFull = {
    lazy: () => import('@/entities/users/UsersList.tsx'),
    index: true,
    handle: {
        title: 'Пользователи',
        role: adminAccess,
    },
};
