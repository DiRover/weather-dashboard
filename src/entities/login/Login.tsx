/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Button, Form, Input, Typography} from 'antd';
import {useCallback} from 'react';
import {useNavigate} from 'react-router';
import {redirect} from 'react-router';

import {getToken, setToken} from '@/services/auth';

export function loader() {
    if (getToken()) {
        throw redirect('/');
    }
    return null;
}

const {Item} = Form;
const {Title} = Typography;

export function Component() {
    const navigate = useNavigate();

    const handleLogin = useCallback(
        (values: {username: string; password: string}) => {
            const username = values.username.trim();
            const password = values.password;
            const isAdmin = username === 'admin' && password === '123456';

            setToken({username, role: isAdmin ? 'admin' : 'user'});

            navigate('/');
        },
        [navigate],
    );

    return (
        <div
            style={{
                maxWidth: 360,
                margin: '72px auto',
                padding: 24,
                border: '1px solid #e5e7eb',
                borderRadius: 8,
            }}
        >
            <Title level={3} style={{marginTop: 0}}>
                Вход
            </Title>

            <Form
                layout="vertical"
                onFinish={handleLogin}
                autoComplete="on"
                requiredMark={false}
                initialValues={{username: '', password: ''}}
                validateTrigger={['onBlur', 'onSubmit']}
            >
                <Item
                    label="Логин"
                    name="username"
                    rules={[{required: true, message: 'Введите логин'}]}
                >
                    <Input
                        placeholder="Введите логин"
                        autoComplete="username"
                        allowClear
                    />
                </Item>

                <Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Введите пароль'}]}
                >
                    <Input.Password
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                    />
                </Item>

                <Item style={{marginBottom: 0}}>
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Item>
            </Form>
        </div>
    );
}
