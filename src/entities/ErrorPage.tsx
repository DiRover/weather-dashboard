/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */

import {Button, Typography} from 'antd';
import {memo, useCallback} from 'react';
import {useNavigate} from 'react-router';

const {Title} = Typography;

const ErrorPage = memo(() => {
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="flex min-h-screen flex-col place-content-center">
            <Title level={3}>Такой страницы не существует</Title>

            <Button type="primary" onClick={goBack}>
                Вернуться назад
            </Button>
        </div>
    );
});

export default ErrorPage;
