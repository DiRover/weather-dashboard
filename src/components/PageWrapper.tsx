/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import type {PropsWithChildren} from 'react';

import {memo} from 'react';

const PageWrapper = memo<PropsWithChildren>(({children}) => (
    <div className="flex min-h-screen w-full flex-col items-center p-4">
        {children}
    </div>
));

export default PageWrapper;
