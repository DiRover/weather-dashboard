import {redirect} from 'react-router';

import {getToken} from '@/services/auth';

export function loader() {
    if (!getToken()) {
        throw redirect('/login');
    }
    return null;
}

export function Component() {
    return <>Hello</>;
}
