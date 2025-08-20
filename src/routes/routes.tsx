import type {RouteObject} from 'react-router';

export const routes: RouteObject[] = [
    {
        path: '/',
        lazy: () => import('../App.tsx'),
    },
    {
        path: '/login',
        lazy: () => import('@/entities/login/Login.tsx'),
    },
];
