/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Outlet, redirect} from 'react-router';

import Header from '@/components/Header';
import {getToken} from '@/services/auth';

export function loader() {
    if (!getToken()) {
        throw redirect('/login');
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
