/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */
import type {PropsWithChildren} from 'react';

import {memo} from 'react';

const PageWrapper = memo<PropsWithChildren>(({children}) => (
    <div className="flex items-center justify-center">{children}</div>
));

export default PageWrapper;
