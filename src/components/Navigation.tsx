/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import {useAtomValue} from 'jotai/index';
import {memo} from 'react';
import {NavLink} from 'react-router';

import type {RouteFull} from '@/routes/types.ts';

import {atomDarkMode} from '@/entities/atoms/darkMode.ts';

interface NavigationProps {
    routes: RouteFull[];
}

const Navigation = memo<NavigationProps>(({routes}) => {
    const dark = useAtomValue(atomDarkMode);
    return (
        <div className="flex gap-x-4 self-start">
            {routes.map(route => (
                <NavLink
                    key={route.path ?? 'first'}
                    to={route.path ?? ''}
                    end={!route.path}
                    className={({isActive}) =>
                        isActive
                            ? `${dark ? '!text-white' : '!text-gray-400'} !underline`
                            : dark
                              ? '!text-white'
                              : '!text-gray-600'
                    }
                >
                    <p className="text-xl">{route.handle?.title}</p>
                </NavLink>
            ))}
        </div>
    );
});

export default Navigation;
