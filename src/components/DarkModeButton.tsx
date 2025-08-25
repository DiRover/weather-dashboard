/**
 * Created by ROVENSKIY D.A. on 25.08.2025
 */
import Moon from '@assets/moon-svgrepo-com.svg?react';
import Sun from '@assets/sun-svgrepo-com.svg?react';
import {Button} from 'antd';
import {useAtom} from 'jotai';
import {memo, useCallback, useEffect} from 'react';

import {atomDarkMode} from '@/entities/atoms/darkMode';

const DarkModeButton = memo(() => {
    const [dark, setDark] = useAtom(atomDarkMode);

    useEffect(() => {
        const rootElem = document.getElementById('root');
        if (rootElem) {
            if (dark) {
                rootElem.classList.add('dark');
            } else {
                rootElem.classList.remove('dark');
            }
        }
    }, [dark]);

    const onModeChang = useCallback(() => {
        setDark(prev => !prev);
    }, [setDark]);

    return (
        <Button
            icon={
                dark ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )
            }
            type="text"
            onClick={onModeChang}
        />
    );
});

export default DarkModeButton;
