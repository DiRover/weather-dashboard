/**
 * Created by ROVENSKIY D.A. on 20.08.2025
 */
import {Button, Form, Input, Typography, notification} from 'antd';
import {useCallback} from 'react';
import {useNavigate} from 'react-router';
import {redirect} from 'react-router';

import type {UserDTO} from '@/services/types.ts';

import {getToken, setToken} from '@/services/auth';
import {getUsers} from '@/services/users.ts';

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

            // устанавливаем админа
            if (username === 'admin' && password === '123456') {
                setToken({username, role: 'admin'});
                navigate('/');
                return;
            }

            // если введённые данные не как у админа, то выполняем валидацию
            const users: UserDTO[] = getUsers();
            //находим юзера в общем списке
            const match = users.find(
                user =>
                    user.username === username && user.password === password,
            );

            //если юзер с такими логин/пароль существует
            if (match) {
                setToken({username, role: 'user'});
                navigate('/');
            } else {
                //если не существует
                notification.error({
                    message: 'Ошибка входа',
                    description: 'Неверный логин или пароль',
                    placement: 'bottomRight',
                });
            }
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
