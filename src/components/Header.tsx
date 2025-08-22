/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import {Button} from 'antd';
import {memo, useCallback} from 'react';
import {useNavigate} from 'react-router';

import BackButton from '@/components/BackButton.tsx';
import {deleteToken} from '@/helpers/auth';

const Header = memo(() => {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        deleteToken();
        navigate('/login');
    }, [navigate]);

    return (
        <header className="flex w-full justify-between border-b border-gray-200 pb-4">
            <BackButton />
            <Button onClick={handleLogout}>Выйти</Button>
        </header>
    );
});

export default Header;
