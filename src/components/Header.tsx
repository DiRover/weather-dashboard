/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import {Button} from 'antd';
import {memo, useCallback} from 'react';
import {useNavigate} from 'react-router';

import {deleteToken} from '@/services/auth';

const Header = memo(() => {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        deleteToken();
        navigate('/login');
    }, [navigate]);

    return (
        <header className="flex w-full justify-end border-b border-gray-200 p-4">
            <Button onClick={handleLogout}>Выйти</Button>
        </header>
    );
});

export default Header;
