/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Outlet} from 'react-router';

import Header from '@/components/Header';
import {getToken} from '@/helpers/auth';

export function loader() {
    if (!getToken()) {
        throw new Response('Forbidden Error', {status: 403});
    }
    return null;
}

export function Component() {
    return (
        <>
            <Header />

            <Outlet />
        </>
    );
}
