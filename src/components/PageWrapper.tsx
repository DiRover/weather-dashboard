/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import type {PropsWithChildren} from 'react';

import {memo} from 'react';

import DarkModeButton from '@/components/DarkModeButton.tsx';

//общий компонент для всех страниц

const PageWrapper = memo<PropsWithChildren>(({children}) => (
    <div className="relative flex min-h-screen w-full flex-col items-center p-4">
        {children}

        <div className="fixed bottom-4 left-4 z-50">
            <DarkModeButton />
        </div>
    </div>
));

export default PageWrapper;
