/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import {Typography} from 'antd';
import {memo, useMemo} from 'react';
import {NavLink} from 'react-router';

import {getToken} from '@/helpers/auth.ts';
import {routesSections} from '@/routes/routes.tsx';

const {Title} = Typography;

export const Component = memo(() => {
    const token = getToken();

    const links = useMemo(
        () =>
            token
                ? routesSections.filter(({handle}) =>
                      handle?.role?.includes(token.role),
                  )
                : [],
        [token],
    );
    return (
        <div className="flex w-full flex-auto flex-col">
            <Title level={3} className="place-self-start">
                Доступные сервисы:
            </Title>

            <div className="grid w-full flex-auto auto-cols-[300px] grid-flow-col place-content-center gap-4">
                {links.map(route => (
                    <NavLink
                        key={route.path ?? '.'}
                        to={route.path ?? '.'}
                        className={({isActive}) =>
                            [
                                'inline-flex h-24 items-center justify-center rounded-xl border text-lg font-medium transition',
                                'px-6 py-4',
                                isActive
                                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50',
                            ].join(' ')
                        }
                    >
                        {route.handle?.title}
                    </NavLink>
                ))}
            </div>
        </div>
    );
});
