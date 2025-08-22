import type {RouteObject} from 'react-router';

import type {RouteFull} from '@/routes/types.ts';

import ErrorPage from '@/entities/ErrorPage.tsx';
import {adminSection} from '@/routes/adminSection.tsx';
import {weatherGraphSection} from '@/routes/weatherGraphSection.tsx';

export const routesSections: RouteFull[] = [adminSection, weatherGraphSection];

export const routes: RouteObject[] = [
    {
        path: '/',
        lazy: () => import('../App.tsx'),
        children: routesSections,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        lazy: () => import('@/entities/login/Login.tsx'),
        errorElement: <ErrorPage />,
    },
];
