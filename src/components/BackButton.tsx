/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {memo, useCallback, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router';

const BackButton = memo(() => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleGoBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const canGoBack = useMemo(() => pathname !== '/', [pathname]);

    if (!canGoBack) return null;

    return (
        <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            type="text"
            size="large"
        />
    );
});

export default BackButton;
