/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import type {RouteObject} from 'react-router';

export const adminSection: RouteObject = {
    lazy: () => import('@/entities/users/UsersList.tsx'),
    index: true,
};
