import type {RouteObject} from 'react-router';

import ErrorPage from '@/entities/error/ErrorPage.tsx';
import {adminSection} from '@/routes/adminSection.tsx';
import {weatherGraphSection} from '@/routes/weatherGraphSection.tsx';

export const routesSections = [adminSection, weatherGraphSection];

export const routes: RouteObject[] = [
    {
        path: '/',
        lazy: () => import('../App.tsx'),
        children: [
            {
                index: true,
                lazy: () => import('@/entities/services/Page.tsx'),
            },
            ...routesSections,
        ],

        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        lazy: () => import('@/entities/login/Login.tsx'),
        errorElement: <ErrorPage />,
    },
];
