import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(<StrictMode>Hello</StrictMode>);
