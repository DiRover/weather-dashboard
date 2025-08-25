/**
 * Created by ROVENSKIY D.A. on 21.08.2025
 */

import {Button, Typography} from 'antd';
import {memo, useCallback, useMemo} from 'react';
import {useNavigate, useRouteError, isRouteErrorResponse} from 'react-router';

const {Title} = Typography;

//страница для отображения ошибок в роутах

const ErrorPage = memo(() => {
    const navigate = useNavigate();
    const error = useRouteError();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const isRouterError = isRouteErrorResponse(error);

    const goHome = useCallback(() => {
        if (isRouterError && error.status === 403) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, [error, isRouterError, navigate]);

    // Определяем тип ошибки
    const errorObject = useMemo(() => {
        const unknownError = {
            errorMessage: 'Неизвестная ошибка',
            errorStatus: 'unknown',
        };

        if (isRouterError) {
            const errorStatus = error.status;

            switch (errorStatus) {
                case 403:
                    return {
                        errorMessage: 'У вас нет прав доступа к этой странице',
                        errorStatus,
                    };
                case 404:
                    return {
                        errorMessage: 'Такой страницы не существует',
                        errorStatus,
                    };
            }
        }

        return unknownError;
    }, [error, isRouterError]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
            <Title level={2} className="text-center">
                {errorObject.errorMessage}
            </Title>

            <div className="flex gap-2">
                <Button onClick={goBack}>Вернуться назад</Button>
                <Button type="primary" onClick={goHome}>
                    На главную
                </Button>
            </div>
            <p>status: {errorObject.errorStatus}</p>
        </div>
    );
});

export default ErrorPage;
