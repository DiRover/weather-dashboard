import type {RouteObject} from 'react-router';

import {adminSection} from '@/routes/adminSection.tsx';

export const routes: RouteObject[] = [
    {
        path: '/',
        lazy: () => import('../App.tsx'),
        children: [adminSection],
    },
    {
        path: '/login',
        lazy: () => import('@/entities/login/Login.tsx'),
    },
];
