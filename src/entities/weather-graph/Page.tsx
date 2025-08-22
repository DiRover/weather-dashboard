/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import {Typography} from 'antd';
import {memo} from 'react';
import {Outlet} from 'react-router';

import Navigation from '@/components/Navigation.tsx';
import {weatherGraphSection} from '@/routes/weatherGraphSection.tsx';

const {Title} = Typography;

export const Component = memo(() => {
    return (
        <>
            <Title level={3} className="self-start">
                Графики погоды
            </Title>

            {weatherGraphSection.children && (
                <Navigation routes={weatherGraphSection.children} />
            )}

            <Outlet />
        </>
    );
});
