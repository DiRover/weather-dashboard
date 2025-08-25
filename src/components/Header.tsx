/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import {Button} from 'antd';
import {memo, useCallback} from 'react';
import {useNavigate} from 'react-router';

import BackButton from '@/components/BackButton.tsx';
import DarkModeButton from '@/components/DarkModeButton.tsx';
import {deleteToken} from '@/helpers/auth';

const Header = memo(() => {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        deleteToken();
        navigate('/login');
    }, [navigate]);

    return (
        <header className="flex h-12 w-full items-center justify-between border-b border-gray-200 px-4 pb-4">
            <div className="flex-1">
                <BackButton />
            </div>

            <div className="flex items-center gap-2">
                <DarkModeButton />
                <Button onClick={handleLogout}>Выйти</Button>
            </div>
        </header>
    );
});

export default Header;
