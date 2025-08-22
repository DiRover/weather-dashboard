/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import {memo} from 'react';
import {NavLink} from 'react-router';

import type {RouteFull} from '@/routes/types.ts';

interface NavigationProps {
    routes: RouteFull[];
}

const Navigation = memo<NavigationProps>(({routes}) => {
    return (
        <div className="flex gap-x-4 self-start">
            {routes.map(route => (
                <NavLink
                    key={route.path ?? 'first'}
                    to={route.path ?? ''}
                    end={!route.path}
                    className={({isActive}) =>
                        isActive
                            ? '!text-blue-400 !underline'
                            : '!text-blue-600'
                    }
                >
                    <p className="text-xl">{route.handle?.title}</p>
                </NavLink>
            ))}
        </div>
    );
});

export default Navigation;
