import {ConfigProvider, App as AntdApp} from 'antd';
import ruRU from 'antd/locale/ru_RU';
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router';

import {routes} from '@/routes/routes.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

const router = createBrowserRouter(routes);

root.render(
    <StrictMode>
        <ConfigProvider
            locale={ruRU}
            theme={{token: {colorPrimary: '#1677ff'}}}
        >
            <AntdApp>
                <RouterProvider router={router} />
            </AntdApp>
        </ConfigProvider>
    </StrictMode>,
);
