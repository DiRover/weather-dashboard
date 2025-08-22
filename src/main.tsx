import {QueryClientProvider} from '@tanstack/react-query';
import {ConfigProvider, App as AntdApp} from 'antd';
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';
import ruRU from 'antd/locale/ru_RU';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router';

import PageWrapper from '@/components/PageWrapper.tsx';
import {queryClient} from '@/libs/queryClientProject.ts';
import {routes} from '@/routes/routes.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

const router = createBrowserRouter(routes);

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                locale={ruRU}
                theme={{token: {colorPrimary: '#1677ff'}}}
            >
                <AntdApp>
                    <PageWrapper>
                        <RouterProvider router={router} />
                    </PageWrapper>
                </AntdApp>
            </ConfigProvider>
        </QueryClientProvider>
    </StrictMode>,
);
