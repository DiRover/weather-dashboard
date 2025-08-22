import type {IndexRouteObject, NonIndexRouteObject} from 'react-router';

import type {Role} from '@/helpers/types.ts';

interface Handle {
    title: string;
    role?: Role[];
}

type IndexRoute = Omit<IndexRouteObject, 'handle'> & {
    handle?: Handle;
};

type NonIndexRoute = Omit<NonIndexRouteObject, 'handle'> & {
    handle?: Handle;
};

export type RouteFull = IndexRoute | NonIndexRoute;
