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
        <header className="flex h-12 w-full items-center border-b border-gray-200 pb-4">
            <BackButton />

            <div className="ml-auto">
                <Button onClick={handleLogout}>Выйти</Button>
            </div>
        </header>
    );
});

export default Header;
