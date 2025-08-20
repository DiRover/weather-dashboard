/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Button, Typography} from 'antd';
import {useCallback} from 'react';
import {Link, redirect, useNavigate} from 'react-router';

import {deleteToken, getToken} from '@/services/auth';

export function loader() {
    if (!getToken()) {
        throw redirect('/login');
    }
    return null;
}

export function Component() {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        deleteToken();
        navigate('/login');
    }, [navigate]);

    return (
        <div style={{maxWidth: 640, margin: '72px auto', padding: 24}}>
            <Typography.Title level={3} style={{marginTop: 0}}>
                Главная
            </Typography.Title>
            <div style={{display: 'flex', gap: 12}}>
                <Link to="/admin/users" className="ant-btn ant-btn-primary">
                    Пользователи
                </Link>
                <Button onClick={handleLogout}>Выйти</Button>
            </div>
        </div>
    );
}
