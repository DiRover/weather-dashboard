/**
 * Created by ROVENSKIY D.A. on 22.08.2025
 */
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {memo, useCallback} from 'react';
import {useNavigate} from 'react-router';

const BackButton = memo(() => {
    const navigate = useNavigate();

    const handleGoBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

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
