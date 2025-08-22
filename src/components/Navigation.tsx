/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import {memo, useMemo} from 'react';
import {NavLink} from 'react-router';

import {routesSections} from '@/routes/routes.tsx';
import {getToken} from '@/services/auth.ts';

const Navigation = memo(() => {
    const token = getToken();

    const links = useMemo(
        () =>
            token
                ? routesSections.filter(({handle}) =>
                      handle.role.includes(token.role),
                  )
                : [],
        [token],
    );
    return (
        <div className="flex gap-x-4 self-start">
            {links.map(route => (
                <NavLink
                    key={route.path ?? '.'}
                    to={route.path ?? '.'}
                    className={({isActive}) =>
                        isActive
                            ? '!text-blue-400 !underline'
                            : '!text-blue-600'
                    }
                >
                    {route.handle.title}
                </NavLink>
            ))}
        </div>
    );
});

export default Navigation;
