import type {RouteObject} from 'react-router';

import ErrorPage from '@/entities/ErrorPage.tsx';
import {adminSection} from '@/routes/adminSection.tsx';

export const routes: RouteObject[] = [
    {
        path: '/',
        lazy: () => import('../App.tsx'),
        children: [adminSection],
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        lazy: () => import('@/entities/login/Login.tsx'),
        errorElement: <ErrorPage />,
    },
];
