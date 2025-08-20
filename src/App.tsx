/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Typography} from 'antd';
import {Link, redirect} from 'react-router';

import {getToken} from '@/services/auth';

export function loader() {
    if (!getToken()) {
        throw redirect('/login');
    }
    return null;
}

export function Component() {
    return (
        <div style={{maxWidth: 640, margin: '72px auto', padding: 24}}>
            <Typography.Title level={3} style={{marginTop: 0}}>
                Главная
            </Typography.Title>
            <div>
                <Link to="/admin/users" className="ant-btn ant-btn-primary">
                    Пользователи
                </Link>
            </div>
        </div>
    );
}
